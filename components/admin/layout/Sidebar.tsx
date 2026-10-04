"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/app/admin/LogoutButton";

import {
  LayoutDashboard,
  CalendarDays,
  CalendarRange,
  FileText,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

const links = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/solicitudes",
    label: "Solicitudes",
    icon: FileText,
  },
  {
    href: "/admin/citas",
    label: "Citas",
    icon: CalendarDays,
  },
  {
    href: "/admin/calendario",
    label: "Calendario",
    icon: CalendarRange,
  },
  {
    href: "/admin/clientes",
    label: "Clientes",
    icon: Users,
  },
  {
    href: "/admin/reportes",
    label: "Reportes",
    icon: BarChart3,
  },
  {
    href: "/admin/configuracion",
    label: "Configuración",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col bg-blue-950 text-white shadow-2xl">

      {/* Logo */}
      <div className="border-b border-blue-900 px-8 py-8">

        <h1 className="text-3xl font-extrabold tracking-wide">
          GERENCIAR
        </h1>

        <p className="mt-2 text-sm text-blue-300">
          Panel Administrativo
        </p>

      </div>

      {/* Menú */}
      <nav className="mt-6 flex flex-1 flex-col gap-2 px-5">

        {links.map((link) => {

          const Icon = link.icon;

          const active =
            pathname === link.href ||
            pathname.startsWith(link.href + "/");

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-4 rounded-xl px-5 py-4 text-lg font-medium transition-all duration-300 ${
                active
                  ? "bg-blue-700 shadow-lg"
                  : "hover:bg-blue-900"
              }`}
            >
              <Icon size={22} />
              {link.label}
            </Link>
          );
        })}

      </nav>

      {/* Footer */}
      <div className="border-t border-blue-900 p-5">

        <LogoutButton />

      </div>

    </aside>
  );
}