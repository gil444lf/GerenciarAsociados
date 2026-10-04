import { prisma } from "@/lib/prisma";

export default async function ReportesPage() {
  const [
    totalSolicitudes,
    totalCitas,
    pendientes,
    confirmadas,
    clientes,
  ] = await Promise.all([
    prisma.solicitud.count(),
    prisma.cita.count(),
    prisma.cita.count({
      where: { estado: "Pendiente" },
    }),
    prisma.cita.count({
      where: { estado: "Confirmada" },
    }),
    prisma.cliente.count(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold text-slate-900">
          Reportes
        </h1>

        <p className="mt-2 text-slate-600">
          Estadísticas generales del sistema.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        <Card titulo="Clientes" valor={clientes} color="blue" />
        <Card titulo="Solicitudes" valor={totalSolicitudes} color="green" />
        <Card titulo="Citas" valor={totalCitas} color="purple" />
        <Card titulo="Pendientes" valor={pendientes} color="yellow" />
        <Card titulo="Confirmadas" valor={confirmadas} color="emerald" />
      </div>

      <div className="rounded-2xl bg-white p-8 shadow">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">
          Resumen
        </h2>

        <ul className="space-y-3 text-lg text-slate-700">
          <li>• Clientes registrados: {clientes}</li>
          <li>• Solicitudes recibidas: {totalSolicitudes}</li>
          <li>• Citas agendadas: {totalCitas}</li>
          <li>• Citas pendientes: {pendientes}</li>
          <li>• Citas confirmadas: {confirmadas}</li>
        </ul>
      </div>
    </div>
  );
}

function Card({
  titulo,
  valor,
  color,
}: {
  titulo: string;
  valor: number;
  color: string;
}) {
  const colores = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    purple: "bg-purple-100 text-purple-700",
    yellow: "bg-yellow-100 text-yellow-700",
    emerald: "bg-emerald-100 text-emerald-700",
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <p className="text-slate-500">{titulo}</p>

      <div
        className={`mt-4 inline-flex rounded-xl px-4 py-2 text-3xl font-bold ${
          colores[color as keyof typeof colores]
        }`}
      >
        {valor}
      </div>
    </div>
  );
}