"use client";

import { useState } from "react";

const SALARIO_MINIMO_2026 = 1_750_905;

const EDAD_HOMBRE = 62;
const EDAD_MUJER = 57;

// Semanas mínimas por régimen
const SEMANAS_MIN_RPM = 1300;
const SEMANAS_MIN_RAIS = 1150;

// RPM: por cada 50 semanas adicionales a las mínimas, +1.5 puntos a la tasa
const BLOQUE_SEMANAS = 50;
const PUNTOS_POR_BLOQUE = 1.5;
const TASA_MAXIMA_RPM = 80;
const TOPE_PENSION_SMMLV = 25;

// RAIS: años de expectativa de pensión (retiro programado orientativo).
// Ajustables según lo que defina el cliente.
const ANIOS_EXPECTATIVA_HOMBRE = 20;
const ANIOS_EXPECTATIVA_MUJER = 27;

type Genero = "hombre" | "mujer";
type Regimen = "RPM" | "RAIS";

const formatoPesos = (valor: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);

const soloDigitos = (v: string) => v.replace(/\D/g, "");

const formatoInput = (v: string) =>
  v === "" ? "" : "$ " + new Intl.NumberFormat("es-CO").format(Number(v));

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-200";

export default function PensionCalculator() {
  const [genero, setGenero] = useState<Genero>("hombre");
  const [regimen, setRegimen] = useState<Regimen>("RPM");
  const [edadActual, setEdadActual] = useState("");
  const [semanas, setSemanas] = useState("");
  const [salario, setSalario] = useState(String(SALARIO_MINIMO_2026 * 2));
  const [ahorro, setAhorro] = useState("");

  const edad = Number(edadActual);
  const semanasCot = Number(semanas);
  const salarioBase = Number(salario);
  const ahorroAcumulado = Number(ahorro);

  const edadPension = genero === "hombre" ? EDAD_HOMBRE : EDAD_MUJER;
  const semanasMin = regimen === "RPM" ? SEMANAS_MIN_RPM : SEMANAS_MIN_RAIS;

  const edadValida = edad > 0 && edad <= 100;
  const semanasValidas = semanas !== "" && semanasCot >= 0;
  const salarioValido = salarioBase >= SALARIO_MINIMO_2026;
  const ahorroValido = regimen === "RAIS" ? ahorroAcumulado > 0 : true;

  const datosValidos =
    edadValida && semanasValidas && salarioValido && ahorroValido;

  const aniosFaltantes = edadValida ? Math.max(edadPension - edad, 0) : null;
  const cumpleSemanas = semanasCot >= semanasMin;
  const semanasFaltantes = Math.max(semanasMin - semanasCot, 0);

  // ---------- RPM ----------
  // Tasa base (Ley 797): 65.5 - 0.5 * s, con s = salario / SMMLV
  const s = salarioBase / SALARIO_MINIMO_2026;
  const tasaBaseRPM = 65.5 - 0.5 * s;
  const bloquesExtra = cumpleSemanas
    ? Math.floor((semanasCot - SEMANAS_MIN_RPM) / BLOQUE_SEMANAS)
    : 0;
  const puntosExtra = bloquesExtra * PUNTOS_POR_BLOQUE;
  const tasaRPM = Math.min(tasaBaseRPM + puntosExtra, TASA_MAXIMA_RPM);

  const pensionRPM = Math.min(
    Math.max((salarioBase * tasaRPM) / 100, SALARIO_MINIMO_2026),
    SALARIO_MINIMO_2026 * TOPE_PENSION_SMMLV
  );

  // ---------- RAIS ----------
  const aniosExpectativa =
    genero === "hombre" ? ANIOS_EXPECTATIVA_HOMBRE : ANIOS_EXPECTATIVA_MUJER;
  const mesadaRAIS = ahorroAcumulado / (aniosExpectativa * 12);
  // Con 1150 semanas aplica garantía de pensión mínima
  const pensionRAIS = Math.max(mesadaRAIS, SALARIO_MINIMO_2026);
  const aplicaGarantiaMinima = mesadaRAIS < SALARIO_MINIMO_2026;

  const pensionEstimada = regimen === "RPM" ? pensionRPM : pensionRAIS;

  return (
    <section
      className="relative left-1/2 w-screen -translate-x-1/2 min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat py-24"
      style={{
        backgroundImage: "url('/images/pension-bg.jpg')",
      }}
    >
      {/* Overlay sobre toda la imagen */}
      <div className="absolute inset-0 bg-blue-950/75" />

      {/* CONTENIDO */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* HERO */}
        <div className="mb-12 text-center text-white">
          <span className="mb-5 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold tracking-wide backdrop-blur-md">
            PLANEACIÓN PENSIONAL
          </span>

          <h2 className="text-4xl font-extrabold md:text-5xl">
            Calcula una estimación de tu pensión
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-blue-100">
            Compara de manera sencilla una referencia de pensión según tu
            género, tus semanas cotizadas y el régimen pensional en el que
            cotizas.
          </p>
        </div>

        {/* TARJETA DE CALCULADORA */}
        <div className="mx-auto max-w-4xl rounded-3xl bg-white/95 p-8 shadow-2xl backdrop-blur-md md:p-10">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-900">
              Calculadora de pensión
            </h3>

            <p className="mt-2 text-slate-600">
              Ingresa tus datos y tu salario base o promedio de cotización
              para obtener una estimación.
            </p>
          </div>

          {/* CAMPOS */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* GÉNERO */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Género
              </label>

              <select
                value={genero}
                onChange={(e) => setGenero(e.target.value as Genero)}
                className={inputClass}
              >
                <option value="hombre">Hombre</option>
                <option value="mujer">Mujer</option>
              </select>
            </div>

            {/* EDAD */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Edad actual
              </label>

              <input
                type="number"
                min="18"
                max="100"
                value={edadActual}
                onChange={(e) => setEdadActual(e.target.value)}
                placeholder="Ej: 40"
                className={inputClass}
              />
            </div>

            {/* SEMANAS */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Semanas cotizadas
              </label>

              <input
                type="number"
                min="0"
                value={semanas}
                onChange={(e) => setSemanas(e.target.value)}
                placeholder="Ej: 900"
                className={inputClass}
              />
            </div>

            {/* SALARIO */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Salario base o promedio (COP)
              </label>

              <input
                type="text"
                inputMode="numeric"
                value={formatoInput(salario)}
                onChange={(e) => setSalario(soloDigitos(e.target.value))}
                placeholder="$ 3.500.000"
                className={inputClass}
              />

              {salario !== "" && !salarioValido && (
                <p className="mt-1 text-xs text-red-600">
                  Debe ser mínimo 1 SMMLV ({formatoPesos(SALARIO_MINIMO_2026)}).
                </p>
              )}
            </div>

            {/* RÉGIMEN */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Régimen pensional
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                {/* RPM */}
                <button
                  type="button"
                  onClick={() => setRegimen("RPM")}
                  className={`rounded-2xl border-2 p-5 text-left transition ${
                    regimen === "RPM"
                      ? "border-blue-800 bg-blue-50"
                      : "border-slate-200 bg-white hover:border-blue-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-slate-900">RPM</p>

                      <p className="mt-1 text-sm text-slate-600">
                        Régimen de Prima Media · {SEMANAS_MIN_RPM} semanas
                      </p>
                    </div>

                    <div
                      className={`h-5 w-5 rounded-full border-4 ${
                        regimen === "RPM"
                          ? "border-blue-700"
                          : "border-slate-300"
                      }`}
                    />
                  </div>
                </button>

                {/* RAIS */}
                <button
                  type="button"
                  onClick={() => setRegimen("RAIS")}
                  className={`rounded-2xl border-2 p-5 text-left transition ${
                    regimen === "RAIS"
                      ? "border-blue-800 bg-blue-50"
                      : "border-slate-200 bg-white hover:border-blue-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-slate-900">RAIS</p>

                      <p className="mt-1 text-sm text-slate-600">
                        Régimen de Ahorro Individual · {SEMANAS_MIN_RAIS}{" "}
                        semanas
                      </p>
                    </div>

                    <div
                      className={`h-5 w-5 rounded-full border-4 ${
                        regimen === "RAIS"
                          ? "border-blue-700"
                          : "border-slate-300"
                      }`}
                    />
                  </div>
                </button>
              </div>
            </div>

            {/* AHORRO ACUMULADO (solo RAIS) */}
            {regimen === "RAIS" && (
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Ahorro acumulado en tu cuenta individual (COP)
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  value={formatoInput(ahorro)}
                  onChange={(e) => setAhorro(soloDigitos(e.target.value))}
                  placeholder="$ 250.000.000"
                  className={inputClass}
                />

                <p className="mt-1 text-xs text-slate-500">
                  En RAIS la pensión depende del capital que tengas ahorrado,
                  no de las semanas adicionales.
                </p>
              </div>
            )}
          </div>

          {/* RESULTADO */}
          {datosValidos && !cumpleSemanas && (
            <div className="mt-10 rounded-3xl bg-amber-50 p-8 text-amber-900 shadow-xl">
              <p className="text-lg font-bold">
                Aún no cumples las semanas mínimas en {regimen}
              </p>

              <p className="mt-2 text-sm leading-6">
                Necesitas {semanasMin} semanas y llevas {semanasCot}. Te
                faltan {semanasFaltantes} semanas (aprox.{" "}
                {(semanasFaltantes / 52).toFixed(1)} años de cotización).
              </p>
            </div>
          )}

          {datosValidos && cumpleSemanas && (
            <div className="mt-10 overflow-hidden rounded-3xl bg-blue-950 text-white shadow-xl">
              <div className="p-8">
                <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-300">
                      Estimación de pensión
                    </p>

                    <h4 className="mt-2 text-3xl font-extrabold md:text-4xl">
                      {formatoPesos(pensionEstimada)}
                    </h4>

                    <p className="mt-2 text-blue-200">Valor mensual estimado</p>
                  </div>

                  <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
                    <p className="text-sm text-blue-200">
                      Régimen seleccionado
                    </p>

                    <p className="mt-1 text-xl font-bold">{regimen}</p>
                  </div>
                </div>

                {/* DATOS */}
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl bg-white/10 p-5">
                    <p className="text-sm text-blue-200">Edad de referencia</p>

                    <p className="mt-1 text-lg font-bold">{edadPension} años</p>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-5">
                    <p className="text-sm text-blue-200">Semanas cotizadas</p>

                    <p className="mt-1 text-lg font-bold">
                      {semanasCot} / {semanasMin}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-5">
                    <p className="text-sm text-blue-200">
                      {regimen === "RPM"
                        ? "Salario base"
                        : "Ahorro acumulado"}
                    </p>

                    <p className="mt-1 text-lg font-bold">
                      {formatoPesos(
                        regimen === "RPM" ? salarioBase : ahorroAcumulado
                      )}
                    </p>
                  </div>
                </div>

                {/* DETALLE RPM */}
                {regimen === "RPM" && (
                  <div className="mt-6 space-y-3 rounded-2xl bg-white/10 p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">Tasa base</span>
                      <span className="font-bold">
                        {tasaBaseRPM.toFixed(1)}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">
                        Adicional por semanas ({bloquesExtra} bloques de{" "}
                        {BLOQUE_SEMANAS})
                      </span>
                      <span className="font-bold">
                        +{puntosExtra.toFixed(1)}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/20 pt-3">
                      <span className="text-blue-200">
                        Tasa de reemplazo aplicada
                      </span>
                      <span className="font-bold">{tasaRPM.toFixed(1)}%</span>
                    </div>
                  </div>
                )}

                {/* DETALLE RAIS */}
                {regimen === "RAIS" && (
                  <div className="mt-6 space-y-3 rounded-2xl bg-white/10 p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">
                        Mesada según ahorro ({aniosExpectativa} años de
                        referencia)
                      </span>
                      <span className="font-bold">
                        {formatoPesos(mesadaRAIS)}
                      </span>
                    </div>

                    {aplicaGarantiaMinima && (
                      <p className="text-sm text-blue-200">
                        Tu ahorro no alcanza para 1 SMMLV, así que se muestra
                        la pensión mínima, a la que podrías acceder con{" "}
                        {SEMANAS_MIN_RAIS} semanas (garantía de pensión
                        mínima).
                      </p>
                    )}
                  </div>
                )}

                {/* EDAD RESTANTE */}
                {aniosFaltantes !== null && (
                  <div className="mt-6 rounded-2xl bg-white/10 p-5">
                    <p className="text-blue-200">Edad estimada de pensión</p>

                    <p className="mt-1 text-xl font-bold">
                      {aniosFaltantes === 0
                        ? "Ya alcanzó la edad de referencia"
                        : `Aproximadamente ${aniosFaltantes.toFixed(
                            1
                          )} años restantes`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* EXPLICACIÓN */}
          <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <h4 className="font-bold text-blue-950">
              ¿Cómo interpretar este resultado?
            </h4>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              En el RPM se requieren {SEMANAS_MIN_RPM} semanas; la tasa de
              reemplazo parte de un valor base según tu salario y suma{" "}
              {PUNTOS_POR_BLOQUE}% por cada {BLOQUE_SEMANAS} semanas
              adicionales (máximo {TASA_MAXIMA_RPM}%). En el RAIS se requieren{" "}
              {SEMANAS_MIN_RAIS} semanas y la mesada depende del capital
              acumulado, la rentabilidad, el bono pensional cuando
              corresponda y la modalidad de pensión elegida. Las edades de
              referencia son {EDAD_MUJER} años para mujeres y {EDAD_HOMBRE}{" "}
              para hombres.
            </p>
          </div>

          {/* AVISO */}
          <p className="mt-6 text-xs leading-5 text-slate-400">
            * Esta herramienta proporciona una estimación orientativa y no
            constituye una liquidación pensional ni asesoría financiera o
            jurídica. Los valores reales pueden variar de acuerdo con la
            normativa vigente, historia laboral, capital acumulado,
            rentabilidad, semanas, beneficiarios y demás condiciones
            aplicables al afiliado.
          </p>
        </div>
      </div>
    </section>
  );
}