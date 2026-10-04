import Card from "../ui/Card";

interface Solicitud {
  id: number;
  nombre: string;
  servicio: string;
  createdAt: Date;
}

interface Props {
  solicitudes: Solicitud[];
}

export default function RecentRequests({ solicitudes }: Props) {

  return (
    <Card>

      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Últimas solicitudes
      </h2>

      <div className="space-y-4">

        {solicitudes.length === 0 && (
          <p className="text-slate-700">
            No hay solicitudes.
          </p>
        )}

        {solicitudes.map((s) => (

          <div
            key={s.id}
            className="border-b border-slate-200 pb-3 last:border-0"
          >

            <h3 className="font-semibold text-slate-900">
              {s.nombre}
            </h3>

            <p className="text-slate-700">
              {s.servicio}
            </p>

            <p className="text-sm text-slate-500">
              {new Date(s.createdAt).toLocaleString("es-CO", { timeZone: "America/Bogota" })}
            </p>

          </div>

        ))}

      </div>

    </Card>
  );
}