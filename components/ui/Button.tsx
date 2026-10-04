type ButtonProps = {
  texto: string;
  variant?: "primary" | "secondary";
  href?: string;
};

export default function Button({
  texto,
  variant = "primary",
  href,
}: ButtonProps) {
  const estilos =
    variant === "primary"
      ? "bg-white text-blue-900 hover:bg-gray-200"
      : "border-2 border-white text-white hover:bg-white hover:text-blue-900";

  const clasesBase = `rounded-xl px-8 py-4 text-lg font-bold transition duration-300 hover:scale-105 ${estilos}`;

  if (href) {
    return (
      <a href={href} className={`inline-block ${clasesBase}`}>
        {texto}
      </a>
    );
  }

  return (
    <button className={clasesBase}>
      {texto}
    </button>
  );
}