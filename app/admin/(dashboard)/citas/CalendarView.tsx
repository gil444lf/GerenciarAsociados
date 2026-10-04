"use client";

import { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { es } from "date-fns/locale";

type Cita = {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  servicio: string;
  fecha: string;
  mensaje: string | null;
  estado: string;
};

export default function CalendarView({ citas }: { citas: Cita[] }) {
  const [mesActual, setMesActual] = useState(new Date());
  const [diaSeleccionado, setDiaSeleccionado] = useState<Date | null>(null);

  const inicio = startOfWeek(startOfMonth(mesActual), { weekStartsOn: 1 });
  const fin = endOfWeek(endOfMonth(mesActual), { weekStartsOn: 1 });
  const dias = eachDayOfInterval({ start: inicio, end: fin });

  const citasDelDia = (dia: Date) =>
    citas.filter((c) => isSameDay(new Date(c.fecha), dia));

  const citasSeleccionadas = diaSeleccionado ? citasDelDia(diaSeleccionado) : [];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Calendario */}
      <div className="lg:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => setMesActual(subMonths(mesActual, 1))}
            className="rounded-lg bg-slate-200 px-3 py-1 hover:bg-slate-300"
          >
            ←
          </button>
          <h2 className="text-lg font-semibold capitalize">
            {format(mesActual, "MMMM yyyy", { locale: es })}
          </h2>
          <button
            onClick={() => setMesActual(addMonths(mesActual, 1))}
            className="rounded-lg bg-slate-200 px-3 py-1 hover:bg-slate-300"
          >
            →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-500">
          {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d) => (
            <div key={d} className="py-2">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {dias.map((dia) => {
            const citasDia = citasDelDia(dia);
            const enMes = isSameMonth(dia, mesActual);
            const seleccionado = diaSeleccionado && isSameDay(dia, diaSeleccionado);

            return (
              <button
                key={dia.toISOString()}
                onClick={() => setDiaSeleccionado(dia)}
                className={`aspect-square rounded-lg border p-2 text-left text-sm transition
                  ${enMes ? "bg-white" : "bg-slate-50 text-slate-400"}
                  ${seleccionado ? "border-blue-600 ring-2 ring-blue-200" : "border-slate-200"}
                  hover:border-blue-400`}
              >
                <span className="font-medium">{format(dia, "d")}</span>
                {citasDia.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {citasDia.slice(0, 3).map((c) => (
                      <span key={c.id} className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    ))}
                    {citasDia.length > 3 && (
                      <span className="text-[10px] text-blue-600">+{citasDia.length - 3}</span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Panel lateral con detalle del día */}
      <div>
        <h3 className="mb-4 font-semibold">
          {diaSeleccionado
            ? format(diaSeleccionado, "d 'de' MMMM", { locale: es })
            : "Selecciona un día"}
        </h3>

        {diaSeleccionado && citasSeleccionadas.length === 0 && (
          <p className="text-sm text-slate-500">No hay citas ese día.</p>
        )}

        <div className="space-y-3">
          {citasSeleccionadas.map((c) => (
            <div key={c.id} className="rounded-lg border border-slate-200 p-4 text-sm">
              <p className="font-semibold">{format(new Date(c.fecha), "hh:mm a")}</p>
              <p>{c.nombre}</p>
              <p className="text-slate-500">{c.email} · {c.telefono}</p>
              <p className="mt-1 inline-block rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
                {c.servicio}
              </p>
              {c.mensaje && <p className="mt-2 text-slate-600">{c.mensaje}</p>}
              <p className="mt-2 text-xs text-slate-400">Estado: {c.estado}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}