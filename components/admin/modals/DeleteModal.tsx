"use client";

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  nombre: string;
  tipo?: string;
}

export default function DeleteModal({
  open,
  onClose,
  onConfirm,
  nombre,
  tipo = "cita",
}: DeleteModalProps) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

        <div className="text-center">

          <div className="mb-4 text-6xl">
            ⚠️
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Eliminar {tipo}
          </h2>

          <p className="mt-3 text-slate-700">
            ¿Deseas eliminar {tipo === "cita" ? "la" : "el"} {tipo} de
          </p>

          <p className="font-bold text-blue-950">
            {nombre}
          </p>

          <p className="mt-2 text-sm text-red-600">
            Esta acción no se puede deshacer.
          </p>

        </div>

        <div className="mt-8 flex gap-4">

          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-slate-300 py-3 font-semibold text-slate-700 hover:bg-slate-100"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-600 py-3 font-semibold text-white hover:bg-red-700"
          >
            Eliminar
          </button>

        </div>

      </div>

    </div>
  );
}