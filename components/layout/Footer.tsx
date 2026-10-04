import { Mail, Phone, MapPin, Lock } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { EMAIL_CONTACTO, SLOGAN, TELEFONOS } from "@/lib/contacto";

const enlaces = [
  { texto: "Inicio", href: "#inicio" },
  { texto: "Servicios", href: "#servicios" },
  { texto: "¿Por qué elegirnos?", href: "#why-us" },
  { texto: "Contacto", href: "#contacto" },
];

const servicios = [
  "Gestión Financiera",
  "Contabilidad",
  "Asesoría Tributaria",
  "Auditoría",
  "Revisoría Fiscal",
];

export default function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 px-6 py-16 text-slate-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-4">

        {/* Empresa */}
        <div>
          <h3 className="text-xl font-bold text-white">
            GERENCIAR ASOCIADOS
          </h3>

          <p className="mb-4 mt-0.5 text-xs font-medium tracking-wide text-blue-300">
            {SLOGAN}
          </p>

          <p className="mb-5 text-sm leading-6">
            Soluciones integrales en gestión financiera, contabilidad,
            tributaria, auditoría y revisoría fiscal para empresas y personas.
          </p>

          <div className="flex gap-4">
            <a href="#" className="transition hover:text-blue-300">
              <FaFacebook size={20} />
            </a>

            <a href="#" className="transition hover:text-blue-300">
              <FaInstagram size={20} />
            </a>

            <a href="#" className="transition hover:text-blue-300">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Enlaces */}
        <div>
          <h4 className="mb-4 font-semibold text-white">
            Enlaces rápidos
          </h4>

          <ul className="space-y-3 text-sm">
            {enlaces.map((enlace) => (
              <li key={enlace.texto}>
                <a
                  href={enlace.href}
                  className="transition hover:text-blue-300"
                >
                  {enlace.texto}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Servicios */}
        <div>
          <h4 className="mb-4 font-semibold text-white">
            Servicios
          </h4>

          <ul className="space-y-3 text-sm">
            {servicios.map((servicio) => (
              <li key={servicio}>{servicio}</li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="mb-4 font-semibold text-white">
            Contacto
          </h4>

          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={18} className="mt-0.5 shrink-0" />
              <span>Manizales, Caldas, Colombia</span>
            </li>

            <li className="flex items-start gap-2">
              <Phone size={18} className="mt-0.5 shrink-0" />
              <span className="flex flex-col gap-1">
                {TELEFONOS.map((telefono) => (
                  <a
                    key={telefono.tel}
                    href={`tel:${telefono.tel}`}
                    className="transition hover:text-white"
                  >
                    {telefono.texto}
                  </a>
                ))}
              </span>
            </li>

            <li className="flex items-center gap-2">
              <Mail size={18} className="shrink-0" />
              <a
                href={`mailto:${EMAIL_CONTACTO}`}
                className="transition hover:text-white"
              >
                {EMAIL_CONTACTO}
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Línea inferior */}
      <div className="mx-auto mt-12 max-w-7xl border-t border-slate-800 pt-6">

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

          <p className="text-sm text-slate-500">
            © {anioActual} Gerenciar Asociados. Todos los derechos reservados.
            
          </p>
          
          <p className="text-sm text-slate-500">
            © {anioActual} SOFTWARE DESARROLLADO POR JUAN JOSÉ GIL - <a href="https://www.linkedin.com/in/juan-josé-gil-007027396" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
              LinkedIn
            </a>
          </p>
          <a
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <Lock size={15} />
            Administración
          </a>

        </div>

      </div>

    </footer>
  );
}