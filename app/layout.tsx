import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gerenciar Asociados | Contadores y especializados en Manizales",
    template: "%s | Gerenciar Asociados",
  },
  description:
    "Gestión financiera, contabilidad, asesoría tributaria, auditoría y revisoría fiscal para empresas y personas en Manizales, Caldas y toda Colombia.",
  keywords: [
    "contadores Manizales",
    "contabilidad",
    "asesoría tributaria",
    "auditoría",
    "revisoría fiscal",
    "gestión financiera",
    "Gerenciar Asociados",
  ],
  openGraph: {
    title: "Gerenciar Asociados",
    description:
      "Contadores y especializados: gestión financiera, contabilidad, tributaria, auditoría y revisoría fiscal.",
    url: "/",
    siteName: "Gerenciar Asociados",
    locale: "es_CO",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
