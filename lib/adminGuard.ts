import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verificarToken } from "@/lib/session";

// Uso en una ruta protegida:
//   const noAutorizado = await requireAdmin();
//   if (noAutorizado) return noAutorizado;
export async function requireAdmin() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;

  if (!(await verificarToken(token))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  return null;
}
