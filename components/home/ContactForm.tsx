"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormData } from "@/lib/schemas/contactSchema";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const [estado, setEstado] = useState<{
    tipo: "ok" | "error";
    texto: string;
  } | null>(null);

  const onSubmit = async (data: ContactFormData) => {
    setEstado(null);

    try {
      const res = await fetch("/api/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const respuesta = await res.json().catch(() => null);
        throw new Error(respuesta?.error || "Error al enviar");
      }

      reset();
      setEstado({
        tipo: "ok",
        texto: "¡Mensaje enviado con éxito! Te responderemos muy pronto.",
      });
    } catch (error) {
      console.error(error);
      setEstado({
        tipo: "error",
        texto:
          error instanceof Error && error.message !== "Error al enviar"
            ? error.message
            : "Hubo un problema al enviar el formulario. Inténtalo de nuevo.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <input
          {...register("nombre")}
          placeholder="Nombre completo"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
        />
        {errors.nombre && (
          <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("email")}
          placeholder="Correo electrónico"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("telefono")}
          placeholder="Teléfono"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
        />
        {errors.telefono && (
          <p className="mt-1 text-sm text-red-600">{errors.telefono.message}</p>
        )}
      </div>

      <div>
        <select
          {...register("servicio")}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
        >
          <option value="">¿Qué servicio necesitas?</option>
          <option value="gestion-financiera">Gestión Financiera</option>
          <option value="contabilidad">Contabilidad</option>
          <option value="tributaria">Asesoría Tributaria</option>
          <option value="auditoria">Auditoría</option>
          <option value="revisoria">Revisoría Fiscal</option>
        </select>
        {errors.servicio && (
          <p className="mt-1 text-sm text-red-600">{errors.servicio.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register("mensaje")}
          placeholder="Cuéntanos qué necesitas"
          rows={5}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
        />
        {errors.mensaje && (
          <p className="mt-1 text-sm text-red-600">{errors.mensaje.message}</p>
        )}
      </div>

      {estado && (
        <p
          role="status"
          className={`rounded-lg px-4 py-3 text-sm font-medium ${
            estado.tipo === "ok"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-700"
          }`}
        >
          {estado.texto}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-blue-950 py-4 font-semibold text-white transition hover:bg-blue-900 disabled:opacity-50"
      >
        {isSubmitting ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}