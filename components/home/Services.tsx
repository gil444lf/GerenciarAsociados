"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Calculator,
  FileText,
  ShieldCheck,
  ClipboardCheck,
  Landmark,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";

const servicios = [
  {
    icono: LineChart,
    titulo: "Gestión Financiera",
    descripcion:
      "Planeación, flujo de caja, presupuestos y proyecciones para decisiones financieras sólidas.",
    items: [
      "Planeación financiera",
      "Flujo de caja",
      "Indicadores financieros",
      "Valoración empresarial",
    ],
    consejo:
      "Una buena planeación financiera permite anticipar necesidades de efectivo, controlar gastos y tomar mejores decisiones para el crecimiento de la empresa.",
  },
  {
    icono: Calculator,
    titulo: "Contabilidad",
    descripcion:
      "Contabilidad general bajo NIIF, nómina, facturación electrónica y cierre contable.",
    items: [
      "Estados financieros",
      "Nómina",
      "Facturación electrónica",
      "Conciliaciones",
    ],
    consejo:
      "Mantener la contabilidad actualizada facilita conocer la situación real del negocio y evita problemas al momento de presentar información financiera.",
  },
  {
    icono: FileText,
    titulo: "Asesoría Tributaria",
    descripcion:
      "Declaración de renta, IVA, retención en la fuente y planeación fiscal ante la DIAN.",
    items: [
      "Declaración de renta",
      "IVA y retenciones",
      "Planeación tributaria",
      "Régimen simple",
    ],
    consejo:
      "Una correcta planeación tributaria ayuda a cumplir las obligaciones fiscales y aprovechar las alternativas permitidas por la normativa vigente.",
  },
  {
    icono: ShieldCheck,
    titulo: "Auditoría",
    descripcion:
      "Auditoría financiera, interna, externa y de cumplimiento normativo.",
    items: [
      "Auditoría financiera",
      "Auditoría interna",
      "Auditoría de riesgos",
      "Auditoría de cumplimiento",
    ],
    consejo:
      "Las auditorías permiten detectar riesgos, inconsistencias y oportunidades de mejora antes de que se conviertan en problemas mayores.",
  },
  {
    icono: ClipboardCheck,
    titulo: "Revisoría Fiscal",
    descripcion:
      "Cumplimiento de funciones legales de revisoría fiscal con informes periódicos.",
    items: [
      "Informes de revisoría",
      "Cumplimiento normativo",
      "Dictamen de estados financieros",
      "Control interno",
    ],
    consejo:
      "La revisoría fiscal contribuye al cumplimiento de las obligaciones legales y al fortalecimiento de los controles de la organización.",
  },
  {
    icono: Landmark,
    titulo: "Asesoría en Pensiones",
    descripcion:
      "Orientación para comprender las alternativas de pensión y tomar decisiones informadas sobre el futuro pensional.",
    items: [
      "Orientación pensional",
      "Análisis del régimen",
      "Planeación para el retiro",
      "Proyección pensional",
    ],
    consejo:
      "Planear la pensión con anticipación permite conocer las diferentes alternativas y tomar decisiones con mayor información sobre el futuro financiero.",
  },
];

export default function Services() {
  const [abierto, setAbierto] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      {/* Decoración de fondo */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-900">
            GERENCIAR ASOCIADOS
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
            Nuestros{" "}
            <span className="text-blue-900">servicios</span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Soluciones profesionales para empresas y personas,
            acompañadas de asesoría especializada para tomar mejores
            decisiones financieras.
          </p>
        </motion.div>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {servicios.map((servicio, index) => {
            const Icono = servicio.icono;
            const estaAbierto = abierto === index;

            return (
              <motion.div
                key={servicio.titulo}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Parte principal */}
                <div className="p-8">

                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-950 shadow-lg">
                      <Icono className="h-8 w-8 text-white" />
                    </div>

                    <span className="text-sm font-bold text-blue-200">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mb-3 text-2xl font-bold text-slate-950">
                    {servicio.titulo}
                  </h3>

                  <p className="mb-6 leading-7 text-slate-600">
                    {servicio.descripcion}
                  </p>

                  <ul className="space-y-3">
                    {servicio.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-sm text-slate-700"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-700" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Botón */}
                  <button
                    onClick={() =>
                      setAbierto(estaAbierto ? null : index)
                    }
                    className="mt-7 flex w-full items-center justify-between rounded-xl bg-slate-100 px-4 py-3 font-semibold text-blue-950 transition hover:bg-blue-100"
                  >
                    <span>
                      {estaAbierto
                        ? "Ocultar información"
                        : "Ver consejos"}
                    </span>

                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${
                        estaAbierto ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Información desplegable */}
                <AnimatePresence>
                  {estaAbierto && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-blue-100 bg-blue-50 px-8 py-7">
                        <p className="mb-2 text-sm font-bold uppercase tracking-wide text-blue-900">
                          Consejo GERENCIAR
                        </p>

                        <p className="leading-7 text-slate-700">
                          {servicio.consejo}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}