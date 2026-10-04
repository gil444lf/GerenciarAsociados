"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SLOGAN } from "@/lib/contacto";

export default function Navbar() {
  const [scroll, setScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigation = (id: string) => {
    setMenuOpen(false);

    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }, 250);
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scroll
          ? "bg-slate-950/95 backdrop-blur-md shadow-xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">

        {/* Logo */}
        <div className="leading-tight">
          <h1 className="font-extrabold text-white">
            <span className="block text-lg sm:inline sm:text-xl md:text-2xl">
              GERENCIAR
            </span>

            <span className="block sm:ml-2 sm:inline text-lg sm:text-xl md:text-2xl">
              ASOCIADOS
            </span>
          </h1>

          <p className="mt-0.5 text-[10px] font-medium tracking-wide text-blue-200 sm:text-xs">
            {SLOGAN}
          </p>
        </div>

        {/* Menú escritorio */}
        <ul className="hidden md:flex items-center gap-8 text-white">

          <li>
            <a
              href="#inicio"
              className="transition duration-300 hover:text-blue-300"
            >
              Inicio
            </a>
          </li>

          <li>
            <a
              href="#servicios"
              className="transition duration-300 hover:text-blue-300"
            >
              Servicios
            </a>
          </li>

          <li>
            <a
              href="#why-us"
              className="transition duration-300 hover:text-blue-300"
            >
              ¿Por qué elegirnos?
            </a>
          </li>

          <li>
            <a
              href="#contacto"
              className="transition duration-300 hover:text-blue-300"
            >
              Contacto
            </a>
          </li>

        </ul>

        {/* Botón hamburguesa */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden rounded-lg p-2 text-white transition hover:bg-white/10"
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

      </nav>

      {/* Menú móvil */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-slate-950/95 backdrop-blur-xl"
          >
            <div className="flex flex-col items-center gap-6 py-8 text-lg font-semibold text-white">

              <button
                onClick={() => handleNavigation("inicio")}
                className="transition hover:text-blue-300"
              >
                Inicio
              </button>

              <button
                onClick={() => handleNavigation("servicios")}
                className="transition hover:text-blue-300"
              >
                Servicios
              </button>

              <button
                onClick={() => handleNavigation("why-us")}
                className="transition hover:text-blue-300"
              >
                ¿Por qué elegirnos?
              </button>

              <button
                onClick={() => handleNavigation("contacto")}
                className="transition hover:text-blue-300"
              >
                Contacto
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}