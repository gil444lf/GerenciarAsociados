import { z } from "zod";

export const clienteSchema = z.object({
  nombre: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(150),
  telefono: z.string().trim().min(7).max(20),
  empresa: z.string().trim().max(150).optional().nullable(),
});

// En PATCH todos los campos son opcionales, y estado se limita a estos valores
export const clienteUpdateSchema = clienteSchema.partial().extend({
  estado: z.enum(["Activo", "Inactivo"]).optional(),
});
