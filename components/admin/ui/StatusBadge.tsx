interface Props {
  estado: string;
}

export default function StatusBadge({ estado }: Props) {
  const styles = {
    Pendiente: "bg-yellow-100 text-yellow-800",
    Confirmada: "bg-green-100 text-green-700",
    Cancelada: "bg-red-100 text-red-700",
    Finalizada: "bg-blue-100 text-blue-700",
    Reprogramada: "bg-purple-100 text-purple-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold ${
        styles[estado as keyof typeof styles] ??
        "bg-slate-100 text-slate-700"
      }`}
    >
      {estado}
    </span>
  );
}