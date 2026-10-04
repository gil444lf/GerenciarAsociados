// Sesión de administrador firmada con HMAC-SHA256.
// Usa Web Crypto, así funciona igual en proxy y en las rutas de la API.

export const SESSION_COOKIE = "admin_session";
export const SESSION_DURACION_SEGUNDOS = 60 * 60 * 8; // 8 horas

const encoder = new TextEncoder();

function obtenerSecreto() {
  const secreto = process.env.SESSION_SECRET;

  if (!secreto || secreto.length < 32) {
    throw new Error(
      "SESSION_SECRET no está definida o tiene menos de 32 caracteres."
    );
  }

  return secreto;
}

async function firmar(payload: string) {
  const llave = await crypto.subtle.importKey(
    "raw",
    encoder.encode(obtenerSecreto()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const firma = await crypto.subtle.sign(
    "HMAC",
    llave,
    encoder.encode(payload)
  );

  return Array.from(new Uint8Array(firma))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Comparación en tiempo constante
function iguales(a: string, b: string) {
  if (a.length !== b.length) return false;

  let diferencia = 0;
  for (let i = 0; i < a.length; i++) {
    diferencia |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return diferencia === 0;
}

export async function crearToken() {
  const expira = Math.floor(Date.now() / 1000) + SESSION_DURACION_SEGUNDOS;
  const payload = `admin.${expira}`;

  return `${payload}.${await firmar(payload)}`;
}

export async function verificarToken(token?: string | null) {
  if (!token) return false;

  try {
    const partes = token.split(".");
    if (partes.length !== 3) return false;

    const [rol, expira, firma] = partes;

    if (rol !== "admin") return false;
    if (Number(expira) < Math.floor(Date.now() / 1000)) return false;

    return iguales(firma, await firmar(`${rol}.${expira}`));
  } catch {
    // Si falta el secreto o el token está dañado, se niega el acceso
    return false;
  }
}
