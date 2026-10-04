"use client";

import { useState } from "react";

const VALOR_UVT_2026 = 52374;

const soloDigitos = (v: string) => v.replace(/\D/g, "");

const formatoInput = (v: string) =>
  v === "" ? "" : "$ " + new Intl.NumberFormat("es-CO").format(Number(v));

export default function UvtCalculator() {
  const [uvt, setUvt] = useState("");
  const [pesos, setPesos] = useState(""); // solo dígitos

  const handleUvtChange = (valor: string) => {
    setUvt(valor);

    const numero = parseFloat(valor);
    if (!isNaN(numero)) {
      setPesos((numero * VALOR_UVT_2026).toFixed(0));
    } else {
      setPesos("");
    }
  };

  const handlePesosChange = (valor: string) => {
    const digitos = soloDigitos(valor);
    setPesos(digitos);

    const numero = Number(digitos);
    if (digitos !== "" && !isNaN(numero)) {
      setUvt((numero / VALOR_UVT_2026).toFixed(2));
    } else {
      setUvt("");
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h3 className="mb-2 text-2xl font-bold text-slate-900">
        Conversor UVT ↔ Pesos
      </h3>
      <p className="mb-6 text-sm text-slate-500">
        Valor UVT 2026: ${VALOR_UVT_2026.toLocaleString("es-CO")} COP
      </p>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          UVT
        </label>
        <input
          type="number"
          step="any"
          value={uvt}
          onChange={(e) => handleUvtChange(e.target.value)}
          placeholder="Ej: 10"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900"
        />
      </div>

      <div className="mb-2 text-center text-sm font-semibold text-blue-700">
        ↕
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Pesos colombianos (COP)
        </label>
        <input
          type="text"
          inputMode="numeric"
          value={formatoInput(pesos)}
          onChange={(e) => handlePesosChange(e.target.value)}
          placeholder="$ 523.740"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900"
        />
      </div>
    </div>
  );
}