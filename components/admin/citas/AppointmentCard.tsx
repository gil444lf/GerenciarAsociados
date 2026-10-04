"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DeleteModal from "../modals/DeleteModal";

interface AppointmentCardProps {
  cita: {
    id: number;
    nombre: string;
    email: string;
    telefono: string;
    servicio: string;
    fecha: Date;
    mensaje: string | null;
    estado: string;
  };
}

export default function AppointmentCard({
  cita,
}: AppointmentCardProps) {
  const router = useRouter();
  const [openDelete, setOpenDelete] = useState(false);

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

      if (!res.ok) {
        throw new Error("No se pudo actualizar la cita.");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Error al actualizar la cita.");
    }
  };

  const eliminarCita = async () => {
    try {
      const res = await fetch(`/api/citas/${cita.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("No se pudo eliminar la cita.");
      }

      setOpenDelete(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("No fue posible eliminar la cita.");
    }
  };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">

        <div className="flex items-start justify-between">

          <div>

            <h2 className="text-2xl font-bold text-blue-950">
              {cita.nombre}
            </h2>

            <p className="mt-2 text-slate-700">
              📧 {cita.email}
            </p>

            <p className="text-slate-700">
              📞 {cita.telefono}
            </p>

          </div>

          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold
            ${
              cita.estado === "Pendiente"
                ? "bg-yellow-100 text-yellow-700"
                : cita.estado === "Confirmada"
                ? "bg-green-100 text-green-700"
                : cita.estado === "Cancelada"
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {cita.estado}
          </span>

        </div>

        <div className="mt-6 space-y-3">

          <p className="text-slate-800">
            <strong>Servicio:</strong> {cita.servicio}
          </p>

          <p className="text-slate-800">
            <strong>Fecha:</strong>{" "}
            {new Date(cita.fecha).toLocaleString("es-CO", { timeZone: "America/Bogota" })}
          </p>

          {cita.mensaje && (
            <p className="text-slate-700">
              <strong>Mensaje:</strong> {cita.mensaje}
            </p>
          )}

        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">

          <button
            onClick={() => cambiarEstado("Confirmada")}
            className="rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            ✔ Confirmar
          </button>

          <button
            className="rounded-lg bg-blue-950 px-4 py-3 font-semibold text-white transition hover:bg-blue-900"
          >
            📅 Reprogramar
          </button>

          <button
            onClick={() => cambiarEstado("Cancelada")}
            className="rounded-lg bg-yellow-500 px-4 py-3 font-semibold text-white transition hover:bg-yellow-600"
          >
            ❌ Cancelar
          </button>

          <button
            onClick={() => cambiarEstado("Finalizada")}
            className="rounded-lg bg-slate-700 px-4 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            ✅ Finalizar
          </button>

        </div>

        <button
          onClick={() => setOpenDelete(true)}
          className="mt-4 w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          🗑 Eliminar cita
        </button>

      </div>

      <DeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={eliminarCita}
        nombre={cita.nombre}
      />
    </>
  );
}