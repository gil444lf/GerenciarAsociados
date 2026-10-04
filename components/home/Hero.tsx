import Button from "@/components/ui/Button";
import Counter from "@/components/ui/Counter";

const estadisticas = [
  {
    numero: 30,
    prefijo: "+",
    sufijo: "",
    texto: "Años de experiencia",
  },
  {
    numero: 500,
    prefijo: "+",
    sufijo: "",
    texto: "Clientes asesorados",
  },
  {
    numero: 98,
    prefijo: "",
    sufijo: "%",
    texto: "Satisfacción",
  },
  {
    numero: 1200,
    prefijo: "+",
    sufijo: "",
    texto: "Declaraciones realizadas",
  },
];

export default function Hero() {
  return (
    <section
      id="inicio"
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900 px-6 pt-32 pb-20 md:pt-24"
    >
      <div className="mx-auto max-w-5xl text-center text-white">

        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-blue-300 sm:text-base md:text-lg">
          Bienvenido a
        </p>

        <h1 className="mb-6 text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
          GERENCIAR <br className="sm:hidden" />
          ASOCIADOS </h1>
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-blue-300 sm:text-base md:text-lg">
          CONTADORES ESPECIALIZADOS EN EMPRESAS Y PERSONAS
        </p>
        <p className="mx-auto mb-10 max-w-3xl text-lg leading-8 text-gray-300 sm:text-xl sm:leading-9">
          Asesoría en pensiones,
          Asesoria laboral,
          Soluciones integrales en Gestión Financiera,
          Contabilidad, Asesoría Tributaria,
          Auditoría y Revisoría Fiscal para
          empresas y personas.
        </p>

        {/* Servicios principales */}
        <div className="mb-12 flex flex-wrap justify-center gap-3 sm:gap-4">

          <span className="rounded-full bg-white/10 px-5 py-2 backdrop-blur-sm">
            ✔ Gestión Financiera
          </span>

          <span className="rounded-full bg-white/10 px-5 py-2 backdrop-blur-sm">
            ✔ Contabilidad
          </span>

          <span className="rounded-full bg-white/10 px-5 py-2 backdrop-blur-sm">
            ✔ Auditoría
          </span>

        </div>

        {/* Botones */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">

          <Button
            texto="Solicitar Asesoría"
            href="#contacto"
          />

          <Button
            texto="Ver Servicios"
            variant="secondary"
            href="#servicios"
          />

        </div>

        {/* Estadísticas */}
        <div className="mt-20 grid grid-cols-2 gap-8 text-center md:grid-cols-4">

          {estadisticas.map((item) => (
            <div key={item.texto}>

              <h2 className="text-3xl font-bold text-blue-300 sm:text-4xl">
                <Counter
                  end={item.numero}
                  prefix={item.prefijo}
                  suffix={item.sufijo}
                />
              </h2>

              <p className="mt-2 text-sm text-gray-300 sm:text-base">
                {item.texto}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}