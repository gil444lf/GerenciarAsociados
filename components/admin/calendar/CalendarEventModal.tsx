"use client";

import { useRouter } from "next/navigation";

interface Cita {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  servicio: string;
  fecha: Date;
  mensaje: string | null;
  estado: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  cita: Cita | null;
}

export default function CalendarEventModal({
  open,
  onClose,
  cita,
}: Props) {
  const router = useRouter();

  if (!open || !cita) return null;

  const cambiarEstado = async (estado: string) => {
    try {
      const res = await fetch(`/api/citas/${cita.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          estado,
        }),
      });

      if (!res.ok) throw new Error();

      router.refresh();
      onClose();
    } catch (error) {
      console.error(error);
      alert("No se pudo actualizar la cita.");
    }
  };

  const eliminarCita = async () => {
    if (!confirm("¿Eliminar esta cita?")) return;

    try {
      const res = await fetch(`/api/citas/${cita.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      router.refresh();
      onClose();
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar la cita.");
    }
  };

  const estadoColor = {
    Pendiente: "bg-yellow-100 text-yellow-700",
    Confirmada: "bg-green-100 text-green-700",
    Cancelada: "bg-red-100 text-red-700",
    Finalizada: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b border-slate-200 p-6">

          <div>
            <h2 className="text-2xl font-bold text-blue-950">
              Detalle de la cita
            </h2>

            <p className="text-slate-600">
              Información del cliente
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100"
          >
            ✕
          </button>

        </div>

        <div className="space-y-5 p-6">

          <div>

            <h3 className="text-2xl font-bold text-slate-900">
              {cita.nombre}
            </h3>

            <span
              className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                estadoColor[cita.estado as keyof typeof estadoColor] ??
                "bg-slate-100 text-slate-700"
              }`}
            >
              {cita.estado}
            </span>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <p className="text-sm font-semibold text-slate-500">
                Correo
              </p>

              <p className="text-slate-900">
                {cita.email}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                Teléfono
              </p>

              <p className="text-slate-900">
                {cita.telefono}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                Servicio
              </p>

              <p className="text-slate-900">
                {cita.servicio}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                Fecha
              </p>

              <p className="text-slate-900">
                {new Date(cita.fecha).toLocaleString("es-CO", { timeZone: "America/Bogota" })}
              </p>
            </div>

          </div>

          <div>

            <p className="text-sm font-semibold text-slate-500">
              Mensaje
            </p>

            <div className="mt-2 rounded-xl bg-slate-100 p-4 text-slate-800">
              {cita.mensaje || "Sin mensaje"}
            </div>

          </div>

        </div>

        <div className="flex flex-wrap gap-3 border-t border-slate-200 p-6">

          <button
            onClick={() => cambiarEstado("Confirmada")}
            className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            Confirmar
          </button>

          <button
            onClick={() => cambiarEstado("Finalizada")}
            className="rounded-xl bg-blue-950 px-5 py-3 font-semibold text-white transition hover:bg-blue-900"
          >
            Finalizar
          </button>

          <button
            onClick={() => cambiarEstado("Cancelada")}
            className="rounded-xl bg-amber-500 px-5 py-3 font-semibold text-white transition hover:bg-amber-600"
          >
            Cancelar
          </button>

          <button
            onClick={eliminarCita}
            className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Eliminar
          </button>

        </div>

      </div>

    </div>
  );
}