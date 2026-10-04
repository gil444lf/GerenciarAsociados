import { prisma } from "@/lib/prisma";
import ClientsPage from "@/components/admin/clientes/ClientesPage";

export default async function Page() {
  const clientes = await prisma.cliente.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return <ClientsPage clientes={clientes} />;
}