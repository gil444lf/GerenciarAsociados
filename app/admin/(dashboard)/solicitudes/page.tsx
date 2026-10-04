import { prisma } from "@/lib/prisma";
import SolicitudActions from "@/components/admin/solicitudes/SolicitudActions";

export default async function SolicitudesPage() {
  const solicitudes = await prisma.solicitud.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">

      {/* Encabezado */}
      <div>

        <h1 className="text-4xl font-extrabold text-slate-950">
          Solicitudes
        </h1>

        <p className="mt-2 text-lg font-medium text-slate-800">
          Gestiona todas las solicitudes enviadas por los clientes.
        </p>

      </div>

      {/* Tabla */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

        <div className="border-b border-slate-200 px-6 py-5">

          <h2 className="text-2xl font-bold text-slate-900">
            Solicitudes recibidas
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-blue-950">

              <tr className="text-left text-sm font-semibold text-white">

                <th className="px-6 py-4">Nombre</th>
                <th className="px-6 py-4">Correo</th>
                <th className="px-6 py-4">Teléfono</th>
                <th className="px-6 py-4">Servicio</th>
                <th className="px-6 py-4">Mensaje</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Acciones</th>

              </tr>

            </thead>

            <tbody>

              {solicitudes.map((s) => (

                <tr
                  key={s.id}
                  className="border-b border-slate-200 transition hover:bg-slate-50"
                >

                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {s.nombre}
                  </td>

                  <td className="px-6 py-4 text-slate-900">
                    {s.email}
                  </td>

                  <td className="px-6 py-4 text-slate-900">
                    {s.telefono}
                  </td>

                  <td className="px-6 py-4 text-slate-900">
                    {s.servicio}
                  </td>

                  <td className="max-w-sm truncate px-6 py-4 text-slate-900">
                    {s.mensaje}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        s.estado === "Pendiente"
                          ? "bg-yellow-100 text-yellow-800"
                          : s.estado === "Confirmada"
                          ? "bg-green-100 text-green-800"
                          : s.estado === "Cancelada"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {s.estado}
                    </span>

                  </td>

                  <td className="px-6 py-4 text-slate-900">
                    {new Date(s.createdAt).toLocaleDateString("es-CO", { timeZone: "America/Bogota" })}
                  </td>

                  <td className="px-6 py-4">
                    <SolicitudActions
                      id={s.id}
                      nombre={s.nombre}
                      estado={s.estado}
                    />
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {solicitudes.length === 0 && (

            <div className="py-12 text-center text-lg font-medium text-slate-700">

              No hay solicitudes registradas.

            </div>

          )}

        </div>

      </div>

    </div>
  );
}