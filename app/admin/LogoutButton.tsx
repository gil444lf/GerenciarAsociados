"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-300"
    >
      Cerrar sesión
    </button>
  );
}