import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import { z } from "zod";
import { limitar, obtenerIp } from "@/lib/rateLimit";

const SYSTEM_PROMPT = `
Eres el asistente virtual de GERENCIAR ASOCIADOS.

Información:
- Gestión Financiera.
- Contabilidad.
- Asesoría Tributaria.
- Auditoría.
- Revisoría Fiscal.

Atiende empresas y personas naturales.

Si el usuario pregunta por precios específicos o casos legales complejos, indícale que debe solicitar una asesoría mediante el formulario de contacto.

Responde siempre en español, de forma profesional y breve.
`;

// Solo se aceptan mensajes de usuario o asistente (nunca "system")
const chatSchema = z.object({
  mensajes: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(1000),
      })
    )
    .min(1)
    .max(30),
});

export async function POST(request: Request) {
  // 20 mensajes cada 10 minutos por IP (cada mensaje consume cuota de la IA)
  const limite = limitar(`chat:${obtenerIp(request)}`, 20, 10 * 60 * 1000);

  if (!limite.ok) {
    return NextResponse.json(
      { error: "Has enviado muchos mensajes. Espera un momento." },
      { status: 429, headers: { "Retry-After": String(limite.esperar) } }
    );
  }

  if (!process.env.GROQ_API_KEY) {
    console.error("Falta la variable GROQ_API_KEY.");
    return NextResponse.json(
      { error: "El asistente no está disponible por ahora." },
      { status: 503 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const parsed = chatSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const respuesta = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      temperature: 0.4,
      max_tokens: 500,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        // Solo los últimos 10 mensajes, para controlar el costo
        ...parsed.data.mensajes.slice(-10),
      ],
    });

    return NextResponse.json({
      texto: respuesta.choices[0]?.message?.content ?? "",
    });
  } catch (error) {
    // El detalle se queda en el servidor, al navegador no se le expone
    console.error("ERROR CHATBOT:", error);

    return NextResponse.json(
      { error: "No fue posible responder en este momento." },
      { status: 500 }
    );
  }
}
