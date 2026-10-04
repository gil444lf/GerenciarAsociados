import { z } from "zod";

export const citaSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre es demasiado largo"),
  email: z
    .string()
    .trim()
    .email("Correo electrónico inválido")
    .max(150, "El correo es demasiado largo"),
  telefono: z
    .string()
    .trim()
    .min(7, "Número de teléfono inválido")
    .max(20, "Número de teléfono inválido"),
  servicio: z.string().min(1, "Selecciona un servicio").max(50),
  fecha: z.string().min(1, "Selecciona una fecha y hora"),
  mensaje: z.string().trim().max(2000).optional(),
});

export type CitaFormData = z.infer<typeof citaSchema>;

export const ESTADOS_CITA = [
  "Pendiente",
  "Confirmada",
  "Cancelada",
  "Finalizada",
] as const;

// Para reprogramar o cambiar estado desde el panel (todo opcional)
export const citaUpdateSchema = z.object({
  estado: z.enum(ESTADOS_CITA).optional(),
  fecha: z.string().optional(),
});
