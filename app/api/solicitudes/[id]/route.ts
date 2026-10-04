import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminGuard";
import { solicitudUpdateSchema } from "@/lib/schemas/solicitudSchema";

type Contexto = { params: Promise<{ id: string }> };

async function obtenerId(context: Contexto) {
  const { id } = await context.params;
  const numero = Number(id);
  return Number.isInteger(numero) && numero > 0 ? numero : null;
}

// Cambiar el estado (Confirmada, Cancelada, Finalizada...)
export async function PATCH(request: Request, context: Contexto) {
  const noAutorizado = await requireAdmin();
  if (noAutorizado) return noAutorizado;

  const id = await obtenerId(context);

  if (!id) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const parsed = solicitudUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
  }

  const { estado, fecha: fechaTexto } = parsed.data;

  try {
    const solicitud = await prisma.solicitud.findUnique({ where: { id } });

    if (!solicitud) {
      return NextResponse.json(
        { error: "La solicitud no existe" },
        { status: 404 }
      );
    }

    // Al confirmar se crea la cita (aparece en Citas y en el Calendario)
    if (estado === "Confirmada") {
      const fecha = fechaTexto ? new Date(fechaTexto) : null;

      if (!fecha || isNaN(fecha.getTime())) {
        return NextResponse.json(
          { error: "Selecciona la fecha y hora de la cita" },
          { status: 400 }
        );
      }

      const [actualizada, cita] = await prisma.$transaction([
        prisma.solicitud.update({ where: { id }, data: { estado } }),
        prisma.cita.create({
          data: {
            nombre: solicitud.nombre,
            email: solicitud.email,
            telefono: solicitud.telefono,
            servicio: solicitud.servicio,
            mensaje: solicitud.mensaje,
            fecha,
            estado: "Confirmada",
          },
        }),
      ]);

      return NextResponse.json({ solicitud: actualizada, cita });
    }

    const actualizada = await prisma.solicitud.update({
      where: { id },
      data: { estado },
    });

    return NextResponse.json({ solicitud: actualizada });
  } catch (error) {
    console.error("ERROR PATCH SOLICITUD:", error);

    return NextResponse.json(
      { error: "No se pudo actualizar la solicitud" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, context: Contexto) {
  const noAutorizado = await requireAdmin();
  if (noAutorizado) return noAutorizado;

  const id = await obtenerId(context);

  if (!id) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    await prisma.solicitud.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ERROR DELETE SOLICITUD:", error);

    return NextResponse.json(
      { error: "No se pudo eliminar la solicitud" },
      { status: 500 }
    );
  }
}
