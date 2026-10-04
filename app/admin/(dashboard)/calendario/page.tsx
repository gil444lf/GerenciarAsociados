import { prisma } from "@/lib/prisma";
import Calendar from "@/components/admin/calendar/Calendar";

export default async function CalendarioPage() {

  const citas = await prisma.cita.findMany({
    orderBy: {
      fecha: "asc",
    },
  });

  return (
    <Calendar citas={citas}/>
  );
}