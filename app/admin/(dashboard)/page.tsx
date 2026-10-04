import { prisma } from "@/lib/prisma";
import LogoutButton from "@/app/admin/LogoutButton";
import StatCard from "@/components/admin/dashboard/StatCard";

export default async function AdminPage() {
  const [solicitudes, citas] = await Promise.all([
    prisma.solicitud.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.cita.findMany({
      orderBy: {
        fecha: "asc",
      },
    }),
  ]);

  const pendientes = citas.filter(
    (c) => c.estado === "Pendiente"
  );

  const confirmadas = citas.filter(
    (c) => c.estado === "Confirmada"
  );

  // "Hoy" se calcula con la hora de Colombia (el servidor corre en UTC)
  const diaColombia = (fecha: Date) =>
    fecha.toLocaleDateString("es-CO", { timeZone: "America/Bogota" });

  const hoy = diaColombia(new Date());

  const citasHoy = citas.filter((c) => diaColombia(c.fecha) === hoy);

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-700">
            Bienvenido al panel administrativo de GERENCIAR ASOCIADOS.
          </p>

        </div>

        <LogoutButton />

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          titulo="Solicitudes"
          valor={solicitudes.length}
        />

        <StatCard
          titulo="Citas hoy"
          valor={citasHoy.length}
          color="green"
        />

        <StatCard
          titulo="Pendientes"
          valor={pendientes.length}
          color="yellow"
        />

        <StatCard
          titulo="Confirmadas"
          valor={confirmadas.length}
          color="blue"
        />

      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Últimas solicitudes
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-200 text-left">

                <th className="py-3 text-slate-900">Nombre</th>
                <th className="py-3 text-slate-900">Correo</th>
                <th className="py-3 text-slate-900">Servicio</th>
                <th className="py-3 text-slate-900">Estado</th>

              </tr>

            </thead>

            <tbody>

              {solicitudes.map((s) => (

                <tr
                  key={s.id}
                  className="border-b border-slate-100"
                >

                  <td className="py-4 text-slate-800">
                    {s.nombre}
                  </td>

                  <td className="py-4 text-slate-700">
                    {s.email}
                  </td>

                  <td className="py-4 text-slate-700">
                    {s.servicio}
                  </td>

                  <td className="py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        s.estado === "Pendiente"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {s.estado}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}