import Card from "../ui/Card";

interface Actividad {
  nombre: string;
  descripcion: string;
  fecha: string;
}

interface Props {
  actividades: Actividad[];
}

export default function RecentActivity({ actividades }: Props) {
  return (
    <Card>

      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Actividad reciente
      </h2>

      <div className="space-y-5">

        {actividades.length === 0 && (
          <p className="text-slate-700">
            No hay actividad reciente.
          </p>
        )}

        {actividades.map((actividad, index) => (

          <div
            key={index}
            className="border-b border-slate-200 pb-4 last:border-0"
          >

            <h3 className="font-semibold text-slate-900">
              {actividad.nombre}
            </h3>

            <p className="text-slate-700">
              {actividad.descripcion}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {actividad.fecha}
            </p>

          </div>

        ))}

      </div>

    </Card>
  );
}