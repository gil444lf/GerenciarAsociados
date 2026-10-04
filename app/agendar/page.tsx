import AgendaForm from "@/components/AgendaForm";

export default function AgendarPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold text-slate-900">Agenda tu asesoría</h1>
      <p className="mb-8 text-slate-600">
        Elige el servicio, la fecha y hora que mejor te convenga, y te confirmaremos la cita.
      </p>
      <AgendaForm />
    </main>
  );
}