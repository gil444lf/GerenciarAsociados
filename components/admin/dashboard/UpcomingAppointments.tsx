import Card from "../ui/Card";
import StatusBadge from "../ui/StatusBadge";

interface Cita {
  id: number;
  nombre: string;
  servicio: string;
  fecha: Date;
  estado: string;
}

interface Props {
  citas: Cita[];
}

export default function UpcomingAppointments({ citas }: Props) {
  return (
    <Card>

      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Próximas citas
      </h2>

      <div className="space-y-4">

        {citas.length === 0 && (
          <p className="text-slate-700">
            No hay citas próximas.
          </p>
        )}

        {citas.map((cita) => (

          <div
            key={cita.id}
            className="rounded-xl border border-slate-200 p-4"
          >

            <div className="flex items-center justify-between">

              <div>

                <h3 className="font-semibold text-slate-900">
                  {cita.nombre}
                </h3>

                <p className="text-slate-700">
                  {cita.servicio}
                </p>

                <p className="text-sm text-slate-600">
                  {new Date(cita.fecha).toLocaleString("es-CO", { timeZone: "America/Bogota" })}
                </p>

              </div>

              <StatusBadge estado={cita.estado} />

            </div>

          </div>

        ))}

      </div>

    </Card>
  );
}