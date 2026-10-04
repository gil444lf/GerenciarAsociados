import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminGuard";
import { citaUpdateSchema } from "@/lib/schemas/citaSchema";

type Contexto = { params: Promise<{ id: string }> };

async function obtenerId(context: Contexto) {
  const { id } = await context.params;
  const numero = Number(id);
  return Number.isInteger(numero) && numero > 0 ? numero : null;
}

// Obtener una cita
export async function GET(_request: Request, context: Contexto) {
  const noAutorizado = await requireAdmin();
  if (noAutorizado) return noAutorizado;

  const id = await obtenerId(context);

  if (!id) {
    return NextResponse.json(
      { success: false, error: "ID inválido" },
      { status: 400 }
    );
  }

  try {
    const cita = await prisma.cita.findUnique({ where: { id } });

    if (!cita) {
      return NextResponse.json(
        { success: false, error: "La cita no existe" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, cita });
  } catch (error) {
    console.error("ERROR GET CITA:", error);

    return NextResponse.json(
      { success: false, error: "No se pudo obtener la cita" },
      { status: 500 }
    );
  }
}

// Actualizar estado y/o reprogramar fecha
export async function PATCH(request: Request, context: Contexto) {
  const noAutorizado = await requireAdmin();
  if (noAutorizado) return noAutorizado;

  const id = await obtenerId(context);

  if (!id) {
    return NextResponse.json(
      { success: false, error: "ID inválido" },
      { status: 400 }
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

  const parsed = citaUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Datos inválidos" },
      { status: 400 }
    );
  }

  const data: { estado?: string; fecha?: Date } = {};

  if (parsed.data.estado) {
    data.estado = parsed.data.estado;
  }

  if (parsed.data.fecha) {
    const fecha = new Date(parsed.data.fecha);

    if (isNaN(fecha.getTime())) {
      return NextResponse.json(
        { success: false, error: "Fecha inválida" },
        { status: 400 }
      );
    }

    data.fecha = fecha;
  }

  try {
    const cita = await prisma.cita.update({ where: { id }, data });
    return NextResponse.json({ success: true, cita });
  } catch (error) {
    console.error("ERROR PATCH CITA:", error);

    return NextResponse.json(
      { success: false, error: "No se pudo actualizar la cita" },
      { status: 500 }
    );
  }
}

// Eliminar cita
export async function DELETE(_request: Request, context: Contexto) {
  const noAutorizado = await requireAdmin();
  if (noAutorizado) return noAutorizado;

  const id = await obtenerId(context);

  if (!id) {
    return NextResponse.json(
      { success: false, error: "ID inválido" },
      { status: 400 }
    );
  }

  try {
    await prisma.cita.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "Cita eliminada correctamente",
    });
  } catch (error) {
    console.error("ERROR DELETE CITA:", error);

    return NextResponse.json(
      { success: false, error: "No se pudo eliminar la cita" },
      { status: 500 }
    );
  }
}
