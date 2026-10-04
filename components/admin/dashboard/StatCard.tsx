import Card from "@/components/admin/ui/Card";

console.log(Card);

interface Props {
  titulo: string;
  valor: number;
  color?: "blue" | "green" | "yellow" | "red";
}

export default function StatCard({
  titulo,
  valor,
  color = "blue",
}: Props) {
  const colores = {
    blue: "text-blue-950",
    green: "text-green-600",
    yellow: "text-amber-500",
    red: "text-red-600",
  };

  return (
    <Card>

      <p className="text-lg font-semibold text-slate-700">
        {titulo}
      </p>

      <h2 className={`mt-3 text-5xl font-extrabold ${colores[color]}`}>
        {valor}
      </h2>

    </Card>
  );
}