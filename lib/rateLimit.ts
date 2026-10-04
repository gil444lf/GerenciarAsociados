// Límite de peticiones en memoria, por IP.
// Frena el spam básico. En serverless cada instancia tiene su propia memoria,
// así que para algo más estricto conviene Upstash Redis o similar.

const registros = new Map<string, { cuenta: number; reinicio: number }>();

export function limitar(clave: string, maximo: number, ventanaMs: number) {
  const ahora = Date.now();

  // Limpieza para que el Map no crezca sin control
  if (registros.size > 5000) {
    for (const [k, v] of registros) {
      if (v.reinicio < ahora) registros.delete(k);
    }
  }

  const registro = registros.get(clave);

  if (!registro || registro.reinicio < ahora) {
    registros.set(clave, { cuenta: 1, reinicio: ahora + ventanaMs });
    return { ok: true, esperar: 0 };
  }

  registro.cuenta++;

  if (registro.cuenta > maximo) {
    return { ok: false, esperar: Math.ceil((registro.reinicio - ahora) / 1000) };
  }

  return { ok: true, esperar: 0 };
}

export function obtenerIp(request: Request) {
  const reenviado = request.headers.get("x-forwarded-for");
  return reenviado?.split(",")[0].trim() || "desconocida";
}
