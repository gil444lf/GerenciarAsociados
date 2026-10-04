"use client";

interface Props {
  filtro: string;
  setFiltro: (value: string) => void;
}

const botones = [
  "Todas",
  "Pendiente",
  "Confirmada",
  "Cancelada",
  "Finalizada",
];

export default function AppointmentFilters({
  filtro,
  setFiltro,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">

      {botones.map((estado) => (

        <button
          key={estado}
          onClick={() => setFiltro(estado)}
          className={`rounded-lg px-5 py-2 font-semibold transition

          ${
            filtro === estado
              ? "bg-blue-950 text-white"
              : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
          }

          `}
        >
          {estado}
        </button>

      ))}

    </div>
  );
}