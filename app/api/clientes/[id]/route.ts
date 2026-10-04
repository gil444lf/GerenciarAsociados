import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminGuard";
import { clienteUpdateSchema } from "@/lib/schemas/clienteSchema";

type Contexto = { params: Promise<{ id: string }> };

async function obtenerId(context: Contexto) {
  const { id } = await context.params;
  const numero = Number(id);
  return Number.isInteger(numero) && numero > 0 ? numero : null;
}

export async function GET(_request: Request, context: Contexto) {
  const noAutorizado = await requireAdmin();
  if (noAutorizado) return noAutorizado;

  const id = await obtenerId(context);

  if (!id) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    const cliente = await prisma.cliente.findUnique({ where: { id } });

    if (!cliente) {
      return NextResponse.json(
        { error: "El cliente no existe" },
        { status: 404 }
      );
    }

    return NextResponse.json(cliente);
  } catch (error) {
    console.error("ERROR GET CLIENTE:", error);

    return NextResponse.json(
      { error: "No se pudo obtener el cliente" },
      { status: 500 }
    );
  }
}

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

  // Solo se aceptan los campos permitidos por el schema
  const parsed = clienteUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  try {
    const cliente = await prisma.cliente.update({
      where: { id },
      data: parsed.data,
    });

    return NextResponse.json(cliente);
  } catch (error) {
    console.error("ERROR PATCH CLIENTE:", error);

    return NextResponse.json(
      { error: "No se pudo actualizar el cliente" },
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
    await prisma.cliente.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ERROR DELETE CLIENTE:", error);

    return NextResponse.json(
      { error: "No se pudo eliminar el cliente" },
      { status: 500 }
    );
  }
}
