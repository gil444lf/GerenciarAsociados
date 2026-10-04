interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "danger";
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
}: ButtonProps) {
  const styles = {
    primary:
      "bg-blue-950 hover:bg-blue-900 text-white",
    secondary:
      "bg-slate-200 hover:bg-slate-300 text-slate-900",
    danger:
      "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-xl px-5 py-3 font-semibold transition ${styles[variant]}`}
    >
      {children}
    </button>
  );
}