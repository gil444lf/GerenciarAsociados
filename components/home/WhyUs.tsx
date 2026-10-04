import Image from "next/image";
import {
  ShieldCheck,
  Clock3,
  Users,
  BadgeCheck,
} from "lucide-react";

const ventajas = [
  {
    icono: ShieldCheck,
    titulo: "Confianza y Transparencia",
    descripcion:
      "Trabajamos con ética profesional y total transparencia en cada proceso.",
  },
  {
    icono: Clock3,
    titulo: "Respuesta Oportuna",
    descripcion:
      "Atendemos cada solicitud con rapidez para que tomes decisiones a tiempo.",
  },
  {
    icono: Users,
    titulo: "Atención Personalizada",
    descripcion:
      "Cada cliente recibe acompañamiento de acuerdo con sus necesidades.",
  },
  {
    icono: BadgeCheck,
    titulo: "Calidad Profesional",
    descripcion:
      "Nuestro compromiso es ofrecer soluciones confiables y de alta calidad.",
  },
];

export default function WhyUs() {
  return (
    <section
      id="why-us"
      className="bg-slate-50 py-24"
    >
      {/* HERO */}
      <div className="mx-auto mb-24 max-w-7xl px-6">
        <div className="grid min-h-[420px] overflow-hidden rounded-3xl bg-blue-950 shadow-2xl md:grid-cols-2">

          {/* Texto */}
          <div className="flex flex-col justify-center p-10 md:p-14">
            <span className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
              Nuestro compromiso
            </span>

            <h2 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
              ¿Por qué elegirnos?
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Más que un servicio contable, buscamos convertirnos en un aliado
              estratégico para el crecimiento y tranquilidad de tu empresa.
            </p>
          </div>

          {/* Imagen */}
          <div className="relative min-h-[300px]">
            <Image
              src="/images/why-us.jpg"
              alt="Equipo profesional de GERENCIAR"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-blue-950/20" />
          </div>

        </div>
      </div>

      {/* VENTAJAS */}
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">
          <h3 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Una forma diferente de trabajar
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Nos enfocamos en brindar acompañamiento profesional,
            cercano y confiable en cada proceso.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {ventajas.map((ventaja) => {
            const Icono = ventaja.icono;

            return (
              <div
                key={ventaja.titulo}
                className="rounded-2xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Icono className="h-8 w-8 text-blue-900" />
                </div>

                <h3 className="mb-4 text-2xl font-bold text-slate-900">
                  {ventaja.titulo}
                </h3>

                <p className="leading-8 text-gray-600">
                  {ventaja.descripcion}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}