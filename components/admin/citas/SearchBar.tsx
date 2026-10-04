"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Buscar por nombre, correo o teléfono..."
      className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:border-blue-950 focus:outline-none"
    />
  );
}