"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

import { EventClickArg, EventDropArg } from "@fullcalendar/core";

import CalendarEventModal from "./CalendarEventModal";

interface Cita {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  servicio: string;
  fecha: Date;
  mensaje: string | null;
  estado: string;
}

interface CalendarProps {
  citas: Cita[];
}

export default function Calendar({ citas }: CalendarProps) {
  const router = useRouter();

  const [selectedCita, setSelectedCita] = useState<Cita | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const actualizarFecha = async (info: EventDropArg) => {
    try {
      const res = await fetch(`/api/citas/${info.event.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fecha: info.event.start,
        }),
      });

      if (!res.ok) {
        throw new Error("No se pudo actualizar.");
      }

      router.refresh();
    } catch (error) {
      console.error(error);

      info.revert();

      alert("No fue posible mover la cita.");
    }
  };

  const abrirCita = (info: EventClickArg) => {
    const cita = citas.find(
      (c) => c.id === Number(info.event.id)
    );

    if (!cita) return;

    setSelectedCita(cita);
    setModalOpen(true);
  };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">

        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
          ]}

          locale={esLocale}

          initialView="dayGridMonth"

          height="auto"

          selectable

          editable

          weekends

          nowIndicator

          businessHours={{
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: "08:00",
            endTime: "18:00",
          }}

          slotMinTime="08:00:00"

          slotMaxTime="18:00:00"

          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}

          buttonText={{
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
          }}

          events={citas.map((cita) => ({
            id: cita.id.toString(),

            title: cita.nombre,

            start: cita.fecha,

            color:
              cita.estado === "Confirmada"
                ? "#16a34a"
                : cita.estado === "Pendiente"
                ? "#f59e0b"
                : cita.estado === "Cancelada"
                ? "#dc2626"
                : "#1e3a8a",
          }))}

          eventDrop={actualizarFecha}

          eventClick={abrirCita}
        />

      </div>

      <CalendarEventModal
        open={modalOpen}
        cita={selectedCita}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}