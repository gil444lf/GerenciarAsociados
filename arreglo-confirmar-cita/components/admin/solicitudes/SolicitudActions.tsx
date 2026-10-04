"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DeleteModal from "@/components/admin/modals/DeleteModal";

interface Props {
  id: number;
  nombre: string;
  estado: string;
}

// Fecha mínima para el selector (ahora, en hora local) en formato datetime-local
function ahoraLocal() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

export default function SolicitudActions({ id, nombre, estado }: Props) {
  const router = useRouter();
  const [openDelete, setOpenDelete] = useState(false);
  const [openCita, setOpenCita] = useState(false);
  const [fecha, setFecha] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const cambiarEstado = async (nuevo: string, fechaIso?: string) => {
    setCargando(true);

    try {
      const res = await fetch(`/api/solicitudes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevo, fecha: fechaIso }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "No se pudo actualizar la solicitud.");
      }

      router.refresh();
      return true;
    } catch (e) {
      console.error(e);
      const mensaje =
        e instanceof Error ? e.message : "Error al actualizar la solicitud.";

      if (nuevo === "Confirmada") {
        setError(mensaje);
      } else {
        alert(mensaje);
      }

      return false;
    } finally {
      setCargando(false);
    }
  };

  const confirmarCita = async () => {
    if (!fecha) {
      setError("Selecciona la fecha y hora de la cita.");
      return;
    }

    setError("");

    // El navegador interpreta la hora en la zona del usuario; se envía en ISO (UTC)
    const ok = await cambiarEstado("Confirmada", new Date(fecha).toISOString());

    if (ok) {
      setOpenCita(false);
      setFecha("");
    }
  };

  const eliminar = async () => {
    try {
      const res = await fetch(`/api/solicitudes/${id}`, { method: "DELETE" });

      if (!res.ok) throw new Error("No se pudo eliminar la solicitud.");

      setOpenDelete(false);
      router.refresh();
    } catch (e) {
      console.error(e);
      alert("No fue posible eliminar la solicitud.");
    }
  };

  const base =
    "rounded-lg px-3 py-2 text-sm font-semibold text-white transition disabled:opacity-50";

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {estado !== "Confirmada" && (
          <button
            disabled={cargando}
            onClick={() => {
              setError("");
              setOpenCita(true);
            }}
            className={`${base} bg-green-600 hover:bg-green-700`}
          >
            ✔ Confirmar
          </button>
        )}

        {estado !== "Cancelada" && (
          <button
            disabled={cargando}
            onClick={() => cambiarEstado("Cancelada")}
            className={`${base} bg-yellow-500 hover:bg-yellow-600`}
          >
            ❌ Cancelar
          </button>
        )}

        {estado !== "Finalizada" && (
          <button
            disabled={cargando}
            onClick={() => cambiarEstado("Finalizada")}
            className={`${base} bg-slate-700 hover:bg-slate-800`}
          >
            ✅ Finalizar
          </button>
        )}

        <button
          disabled={cargando}
          onClick={() => setOpenDelete(true)}
          className={`${base} bg-red-600 hover:bg-red-700`}
        >
          🗑
        </button>
      </div>

      {/* Modal: fecha y hora de la cita */}
      {openCita && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-slate-900">
              Confirmar cita
            </h2>

            <p className="mt-2 text-slate-700">
              Elige la fecha y hora de la cita con{" "}
              <span className="font-bold text-blue-950">{nombre}</span>. Se
              agregará a Citas y al Calendario.
            </p>

            <label
              htmlFor={`fecha-${id}`}
              className="mt-6 block text-sm font-semibold text-slate-700"
            >
              Fecha y hora
            </label>

            <input
              id={`fecha-${id}`}
              type="datetime-local"
              min={ahoraLocal()}
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900"
            />

            {error && (
              <p role="alert" className="mt-3 text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => setOpenCita(false)}
                className="flex-1 rounded-lg border border-slate-300 py-3 font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancelar
              </button>

              <button
                disabled={cargando}
                onClick={confirmarCita}
                className="flex-1 rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
              >
                {cargando ? "Guardando..." : "Confirmar cita"}
              </button>
            </div>
          </div>
        </div>
      )}

      <DeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={eliminar}
        nombre={nombre}
        tipo="solicitud"
      />
    </>
  );
}
