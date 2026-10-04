import { prisma } from "@/lib/prisma";
import CitasContent from "@/components/admin/citas/CitasContent";

export default async function CitasPage() {

  const citas = await prisma.cita.findMany({
    orderBy: {
      fecha: "asc",
    },
  });

  return (
    <CitasContent citas={citas} />
  );
}