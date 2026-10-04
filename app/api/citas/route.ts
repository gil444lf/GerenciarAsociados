import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { citaSchema } from "@/lib/schemas/citaSchema";
import { enviarCorreoCita } from "@/lib/mailer";
import { limitar, obtenerIp } from "@/lib/rateLimit";

// Público: formulario para agendar
export async function POST(request: Request) {
  // 5 citas por hora por IP
  const limite = limitar(`cita:${obtenerIp(request)}`, 5, 60 * 60 * 1000);

  if (!limite.ok) {
    return NextResponse.json(
      {
        success: false,
        error: "Has enviado muchas solicitudes. Inténtalo más tarde.",
      },
      { status: 429, headers: { "Retry-After": String(limite.esperar) } }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Solicitud inválida" },
      { status: 400 }
    );
  }

  const parsed = citaSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Datos inválidos" },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const fecha = new Date(data.fecha);

  if (isNaN(fecha.getTime()) || fecha.getTime() < Date.now()) {
    return NextResponse.json(
      { success: false, error: "Selecciona una fecha y hora futuras" },
      { status: 400 }
    );
  }

  try {
    const cita = await prisma.cita.create({
      data: {
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono,
        servicio: data.servicio,
        fecha,
        mensaje: data.mensaje || "",
      },
    });

    try {
      await enviarCorreoCita({ ...data, fecha });
    } catch (error) {
      console.error("Error enviando correo de cita:", error);
    }

    return NextResponse.json({ success: true, id: cita.id }, { status: 201 });
  } catch (error) {
    console.error("ERROR API CITAS:", error);

    return NextResponse.json(
      { success: false, error: "No se pudo guardar la cita" },
      { status: 500 }
    );
  }
}
