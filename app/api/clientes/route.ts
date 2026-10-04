import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminGuard";
import { clienteSchema } from "@/lib/schemas/clienteSchema";

// Obtener todos los clientes
export async function GET() {
  const noAutorizado = await requireAdmin();
  if (noAutorizado) return noAutorizado;

  try {
    const clientes = await prisma.cliente.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(clientes);
  } catch (error) {
    console.error("ERROR GET CLIENTES:", error);

    return NextResponse.json(
      { error: "No se pudieron obtener los clientes." },
      { status: 500 }
    );
  }
}

// Crear cliente
export async function POST(request: Request) {
  const noAutorizado = await requireAdmin();
  if (noAutorizado) return noAutorizado;

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const parsed = clienteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  try {
    const cliente = await prisma.cliente.create({
      data: {
        nombre: parsed.data.nombre,
        email: parsed.data.email,
        telefono: parsed.data.telefono,
        empresa: parsed.data.empresa ?? null,
      },
    });

    return NextResponse.json(cliente, { status: 201 });
  } catch (error) {
    console.error("ERROR POST CLIENTE:", error);

    return NextResponse.json(
      { error: "No se pudo crear el cliente." },
      { status: 500 }
    );
  }
}
