"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ClientModal({
  open,
  onClose,
}: Props) {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [empresa, setEmpresa] = useState("");

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function guardarCliente() {
    setLoading(true);

    try {
      const res = await fetch("/api/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          email,
          telefono,
          empresa,
        }),
      });

      if (!res.ok) {
        throw new Error();
      }

      router.refresh();
      onClose();

      setNombre("");
      setEmail("");
      setTelefono("");
      setEmpresa("");
    } catch {
      alert("No se pudo crear el cliente.");
    }

    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b px-6 py-5">

          <h2 className="text-2xl font-bold text-slate-900">
            Nuevo Cliente
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <div className="space-y-5 p-6">

          <input
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full rounded-xl border p-3"
          />

          <input
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border p-3"
          />

          <input
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full rounded-xl border p-3"
          />

          <input
            placeholder="Empresa"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            className="w-full rounded-xl border p-3"
          />

        </div>

        <div className="flex justify-end gap-3 border-t p-6">

          <button
            onClick={onClose}
            className="rounded-xl border px-5 py-3"
          >
            Cancelar
          </button>

          <button
            onClick={guardarCliente}
            disabled={loading}
            className="rounded-xl bg-blue-950 px-6 py-3 font-semibold text-white hover:bg-blue-900 disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>

        </div>

      </div>

    </div>
  );
}