import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/schemas/contactSchema";
import { enviarCorreoSolicitud } from "@/lib/mailer";
import { requireAdmin } from "@/lib/adminGuard";
import { limitar, obtenerIp } from "@/lib/rateLimit";

// Público: formulario de contacto
export async function POST(request: Request) {
  // 5 envíos por hora por IP
  const limite = limitar(`solicitud:${obtenerIp(request)}`, 5, 60 * 60 * 1000);

  if (!limite.ok) {
    return NextResponse.json(
      { error: "Has enviado muchos mensajes. Inténtalo más tarde." },
      { status: 429, headers: { "Retry-After": String(limite.esperar) } }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  // Se valida también en el servidor (la del navegador se puede saltar)
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const data = parsed.data;

  try {
    await prisma.solicitud.create({ data });
  } catch (error) {
    console.error("ERROR API SOLICITUDES:", error);
    return NextResponse.json(
      { error: "No se pudo guardar la solicitud" },
      { status: 500 }
    );
  }

  // Si el correo falla, la solicitud igual queda guardada
  try {
    await enviarCorreoSolicitud(data);
  } catch (error) {
    console.error("Error enviando correo de solicitud:", error);
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

// Privado: solo el administrador
export async function GET() {
  const noAutorizado = await requireAdmin();
  if (noAutorizado) return noAutorizado;

  const solicitudes = await prisma.solicitud.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(solicitudes);
}
