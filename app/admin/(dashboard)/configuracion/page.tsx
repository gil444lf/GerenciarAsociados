export default function ConfiguracionPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold text-slate-900">
          Configuración
        </h1>

        <p className="mt-2 text-slate-600">
          Configura la información general del sistema.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow">
        <form className="space-y-6">

          <div>
            <label className="mb-2 block font-semibold text-slate-800">
              Nombre de la empresa
            </label>

            <input
              defaultValue="GERENCIAR ASOCIADOS"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-slate-800">
              Correo
            </label>

            <input
              defaultValue="contacto@gerenciar.com"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-slate-800">
              Teléfono
            </label>

            <input
              defaultValue="+57 300 0000000"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-slate-800">
              Dirección
            </label>

            <input
              defaultValue="Manizales, Caldas"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-blue-950 px-6 py-3 font-semibold text-white hover:bg-blue-900"
          >
            Guardar cambios
          </button>

        </form>
      </div>
    </div>
  );
}