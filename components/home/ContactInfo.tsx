import { Mail, Phone } from "lucide-react";
import { EMAIL_CONTACTO, TELEFONOS } from "@/lib/contacto";

// Bloque visible con los datos del cliente, encima del formulario
export default function ContactInfo() {
  return (
    <div className="mb-10 grid gap-4 sm:grid-cols-3">
      {TELEFONOS.map((telefono) => (
        <a
          key={telefono.tel}
          href={`tel:${telefono.tel}`}
          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-950 text-white">
            <Phone size={18} />
          </span>
          <span>
            <span className="block text-xs text-slate-500">Llámanos</span>
            <span className="block text-sm font-bold text-slate-900">
              {telefono.texto}
            </span>
          </span>
        </a>
      ))}

      <a
        href={`mailto:${EMAIL_CONTACTO}`}
        className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-950 text-white">
          <Mail size={18} />
        </span>
        <span className="min-w-0">
          <span className="block text-xs text-slate-500">Escríbenos</span>
          <span className="block truncate text-sm font-bold text-slate-900">
            {EMAIL_CONTACTO}
          </span>
        </span>
      </a>
    </div>
  );
}
