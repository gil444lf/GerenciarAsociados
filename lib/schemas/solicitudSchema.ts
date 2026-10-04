import { z } from "zod";
import { ESTADOS_CITA } from "@/lib/schemas/citaSchema";

// Cambio de estado de una solicitud desde el panel.
// Al confirmar se envía también la fecha y hora de la cita.
export const solicitudUpdateSchema = z.object({
  estado: z.enum(ESTADOS_CITA),
  fecha: z.string().optional(),
});
