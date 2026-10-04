export default function Topbar() {
  return (
    <header className="flex h-24 items-center justify-between border-b border-slate-200 bg-white px-10 shadow-sm">

      <div>

        <h1 className="text-4xl font-extrabold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-base text-slate-600">
          Bienvenido al panel administrativo de GERENCIAR ASOCIADOS.
        </p>

      </div>

      <div className="rounded-full bg-blue-950 px-5 py-3 text-sm font-semibold text-white shadow-md">
        Administrador
      </div>

    </header>
  );
}