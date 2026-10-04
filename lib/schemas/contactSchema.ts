import { z } from "zod";

export const contactSchema = z.object({
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
  mensaje: z
    .string()
    .trim()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(2000, "El mensaje no puede superar los 2000 caracteres"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
