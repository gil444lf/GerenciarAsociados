# Gerenciar Asociados

Sitio web y panel de administración de **Gerenciar Asociados** (contadores, Manizales, Colombia).

Incluye: página pública con formulario de contacto, agenda de citas, calculadoras (UVT y pensión), chatbot con IA, botón de WhatsApp y un panel de administración (solicitudes, citas, calendario y clientes).

## Tecnologías

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Prisma 7 + PostgreSQL · Nodemailer · Groq (chatbot)

## Cómo correrlo en local

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Crea una base de datos PostgreSQL vacía (por ejemplo `gerenciar`, desde pgAdmin).
3. Copia `.env.example` a `.env` y completa los valores (base de datos, clave del admin, `SESSION_SECRET`, SMTP, etc.).
4. Crea las tablas:
   ```bash
   npx prisma migrate deploy
   ```
5. Arranca el proyecto:
   ```bash
   npm run dev
   ```
   Sitio: http://localhost:3000 · Panel: http://localhost:3000/login

## Variables de entorno

Están todas explicadas en `.env.example`. Las obligatorias son `DATABASE_URL`, `ADMIN_USER`, `ADMIN_PASSWORD` y `SESSION_SECRET` (mínimo 32 caracteres). Sin SMTP el sitio funciona, pero no llegan los correos. Sin `GROQ_API_KEY` el chatbot no responde.

## Datos de contacto del cliente

Teléfonos, correo, slogan y número de WhatsApp están en `lib/contacto.ts`.

## Despliegue en Vercel

1. Sube el repo a GitHub (privado) e impórtalo en Vercel.
2. Crea una base PostgreSQL (Neon o Supabase, desde el Marketplace de Vercel) y copia su cadena de conexión.
3. En Vercel, en *Settings → Environment Variables*, agrega **todas** las variables de `.env.example` con los valores de producción. `NEXT_PUBLIC_SITE_URL` debe ser el dominio final (`https://tudominio.com`).
4. Crea las tablas en la base de producción, una sola vez, desde tu computador:
   ```bash
   DATABASE_URL="cadena-de-produccion" npx prisma migrate deploy
   ```
5. Despliega y, en *Settings → Domains*, conecta el dominio.

## Antes de entregar (checklist)

- [ ] Cambiar `ADMIN_PASSWORD` y generar un `SESSION_SECRET` nuevo para producción.
- [ ] Contraseña de aplicación de Gmail (o SMTP del dominio) y `CONTACT_TO_EMAIL` del cliente.
- [ ] Confirmar el número de WhatsApp y el texto del slogan.
- [ ] Enlaces de redes sociales del Footer (hoy apuntan a `#`).
- [ ] Probar: formulario de contacto, agendar cita, chatbot y login del admin.
- [ ] Verificar que el correo llegue (revisar también spam).

## Seguridad

- Sesión de administrador firmada (HMAC) y cookie `httpOnly`.
- Todas las rutas de `/api` que leen o modifican datos exigen sesión de administrador.
- Los formularios públicos se validan en el servidor y tienen límite de envíos por IP.
- El límite de envíos es en memoria: frena el spam básico. Para algo más estricto, usar Upstash Redis.
