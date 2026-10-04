import nodemailer from "nodemailer";

const puerto = Number(process.env.SMTP_PORT ?? 465);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: puerto,
  secure: puerto === 465, // 465 = SSL, 587 = STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const SERVICIOS: Record<string, string> = {
  "gestion-financiera": "Gestión Financiera",
  contabilidad: "Contabilidad",
  tributaria: "Asesoría Tributaria",
  auditoria: "Auditoría",
  revisoria: "Revisoría Fiscal",
};

// Evita que alguien meta HTML en el formulario
const escapar = (texto: string) =>
  texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

type Solicitud = {
  nombre: string;
  email: string;
  telefono: string;
  servicio: string;
  mensaje: string;
};

export async function enviarCorreoSolicitud(data: Solicitud) {
  const servicio = SERVICIOS[data.servicio] ?? data.servicio;

  await transporter.sendMail({
    from: `"Web GERENCIAR ASOCIADOS" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO_EMAIL,
    // Al darle "Responder", le contesta directo al cliente que escribió
    replyTo: data.email,
    subject: `Nueva solicitud: ${servicio} - ${data.nombre}`,
    text: [
      `Nombre: ${data.nombre}`,
      `Correo: ${data.email}`,
      `Teléfono: ${data.telefono}`,
      `Servicio: ${servicio}`,
      "",
      data.mensaje,
    ].join("\n"),
    html: `
      <h2>Nueva solicitud desde la página web</h2>
      <p><strong>Nombre:</strong> ${escapar(data.nombre)}</p>
      <p><strong>Correo:</strong> ${escapar(data.email)}</p>
      <p><strong>Teléfono:</strong> ${escapar(data.telefono)}</p>
      <p><strong>Servicio:</strong> ${escapar(servicio)}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${escapar(data.mensaje).replace(/\n/g, "<br />")}</p>
    `,
  });
}
type Cita = Omit<Solicitud, "mensaje"> & { fecha: Date; mensaje?: string };

export async function enviarCorreoCita(data: Cita) {
  const servicio = SERVICIOS[data.servicio] ?? data.servicio;

  // La hora se muestra en horario de Colombia
  const fecha = data.fecha.toLocaleString("es-CO", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Bogota",
  });

  await transporter.sendMail({
    from: `"Web GERENCIAR ASOCIADOS" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO_EMAIL,
    replyTo: data.email,
    subject: `Nueva cita: ${servicio} - ${data.nombre}`,
    text: [
      `Nombre: ${data.nombre}`,
      `Correo: ${data.email}`,
      `Teléfono: ${data.telefono}`,
      `Servicio: ${servicio}`,
      `Fecha: ${fecha}`,
      "",
      data.mensaje ?? "",
    ].join("\n"),
    html: `
      <h2>Nueva cita agendada desde la página web</h2>
      <p><strong>Nombre:</strong> ${escapar(data.nombre)}</p>
      <p><strong>Correo:</strong> ${escapar(data.email)}</p>
      <p><strong>Teléfono:</strong> ${escapar(data.telefono)}</p>
      <p><strong>Servicio:</strong> ${escapar(servicio)}</p>
      <p><strong>Fecha:</strong> ${escapar(fecha)}</p>
      <p><strong>Mensaje:</strong> ${escapar(data.mensaje ?? "").replace(/\n/g, "<br />")}</p>
    `,
  });
}
