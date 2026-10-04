interface Props {
  titulo: string;
  descripcion: string;
  children?: React.ReactNode;
}

export default function PageHeader({
  titulo,
  descripcion,
  children,
}: Props) {
  return (
    <div className="mb-8 flex items-center justify-between">

      <div>

        <h1 className="text-4xl font-extrabold text-slate-900">
          {titulo}
        </h1>

        <p className="mt-2 text-lg text-slate-700">
          {descripcion}
        </p>

      </div>

      {children}

    </div>
  );
}