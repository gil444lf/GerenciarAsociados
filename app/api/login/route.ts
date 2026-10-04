import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_DURACION_SEGUNDOS,
  crearToken,
} from "@/lib/session";
import { limitar, obtenerIp } from "@/lib/rateLimit";

// Compara en tiempo constante (se hashea para que ambos tengan el mismo largo)
function iguales(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export async function POST(request: Request) {
  // 5 intentos cada 15 minutos por IP
  const limite = limitar(`login:${obtenerIp(request)}`, 5, 15 * 60 * 1000);

  if (!limite.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "Demasiados intentos. Inténtalo de nuevo más tarde.",
      },
      { status: 429, headers: { "Retry-After": String(limite.esperar) } }
    );
  }

  let usuario: unknown;
  let password: unknown;

  try {
    ({ usuario, password } = await request.json());
  } catch {
    return NextResponse.json(
      { ok: false, error: "Solicitud inválida" },
      { status: 400 }
    );
  }

  const adminUser = process.env.ADMIN_USER;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUser || !adminPassword) {
    console.error("Faltan ADMIN_USER o ADMIN_PASSWORD en las variables de entorno.");
    return NextResponse.json(
      { ok: false, error: "Error de configuración del servidor" },
      { status: 500 }
    );
  }

  const valido =
    typeof usuario === "string" &&
    typeof password === "string" &&
    iguales(usuario, adminUser) &&
    iguales(password, adminPassword);

  if (!valido) {
    return NextResponse.json(
      { ok: false, error: "Credenciales incorrectas" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set(SESSION_COOKIE, await crearToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURACION_SEGUNDOS,
    path: "/",
  });

  return response;
}
