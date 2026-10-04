"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ClientModal from "./ClientModal";

interface Cliente {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  empresa: string | null;
  estado: string;
}

interface Props {
  clientes: Cliente[];
}

export default function ClientsPage({ clientes }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function eliminarCliente(id: number) {
    const confirmar = confirm("¿Deseas eliminar este cliente?");

    if (!confirmar) return;

    try {
      const res = await fetch(`/api/clientes/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      router.refresh();
    } catch {
      alert("No se pudo eliminar el cliente.");
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">
            Clientes
          </h1>

          <p className="mt-2 text-slate-600">
            Gestiona todos los clientes registrados.
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="rounded-xl bg-blue-950 px-6 py-3 font-semibold text-white hover:bg-blue-900"
        >
          + Nuevo Cliente
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-blue-950 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Nombre</th>
              <th className="px-6 py-4 text-left">Correo</th>
              <th className="px-6 py-4 text-left">Teléfono</th>
              <th className="px-6 py-4 text-left">Empresa</th>
              <th className="px-6 py-4 text-left">Estado</th>
              <th className="px-6 py-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map((cliente) => (
              <tr
                key={cliente.id}
                className="border-b border-slate-200 hover:bg-slate-50"
              >
                <td className="px-6 py-4 font-semibold text-slate-900">
                  {cliente.nombre}
                </td>

                <td className="px-6 py-4">{cliente.email}</td>

                <td className="px-6 py-4">{cliente.telefono}</td>

                <td className="px-6 py-4">
                  {cliente.empresa ?? "-"}
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    {cliente.estado}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button className="rounded-lg bg-blue-100 px-3 py-2 text-blue-700 hover:bg-blue-200">
                      Ver
                    </button>

                    <button className="rounded-lg bg-yellow-100 px-3 py-2 text-yellow-700 hover:bg-yellow-200">
                      Editar
                    </button>

                    <button
                      onClick={() => eliminarCliente(cliente.id)}
                      className="rounded-lg bg-red-100 px-3 py-2 text-red-700 hover:bg-red-200"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {clientes.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-slate-500"
                >
                  No hay clientes registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ClientModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}