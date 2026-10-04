"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";

interface Mensaje {
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {

  const [abierto, setAbierto] = useState(false);

  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      role: "assistant",
      content:
        "¡Hola! Soy el asistente virtual de Gerenciar Asociados. ¿En qué puedo ayudarte?",
    },
  ]);

  const [textoInput, setTextoInput] = useState("");

  const [cargando, setCargando] = useState(false);

  async function enviarMensaje() {

    if (!textoInput.trim() || cargando) return;

    const mensajeUsuario: Mensaje = {
      role: "user",
      content: textoInput,
    };

    const historial = [...mensajes, mensajeUsuario];

    setMensajes(historial);
    setTextoInput("");
    setCargando(true);

    try {

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mensajes: historial,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error desconocido");
      }

      setMensajes((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.texto,
        },
      ]);

    } catch (error) {

      console.error(error);

      setMensajes((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Lo siento, no pude responder en este momento. Inténtalo de nuevo o escríbenos por WhatsApp.",
        },
      ]);

    } finally {

      setCargando(false);

    }

  }

  return (
    <div className="fixed bottom-24 right-6 z-50">

      <AnimatePresence>

        {abierto && (

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4 flex h-96 w-80 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >

            <div className="bg-blue-950 px-5 py-4 text-white">

              <h3 className="font-semibold">
                Gerenciar Asociados
              </h3>

            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">

              {mensajes.map((mensaje, index) => (

                <div
                  key={index}
                  className={`flex ${
                    mensaje.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                      mensaje.role === "user"
                        ? "bg-blue-950 text-white"
                        : "bg-slate-100 text-slate-900"
                    }`}
                  >
                    {mensaje.content}
                  </div>

                </div>

              ))}

              {cargando && (
                <p className="text-sm text-gray-500">
                  Escribiendo...
                </p>
              )}

            </div>

            <div className="flex gap-2 border-t p-3">

              <input
                value={textoInput}
                onChange={(e) => setTextoInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && enviarMensaje()
                }
                aria-label="Escribe tu mensaje"
                maxLength={1000}
                className="flex-1 rounded-lg border px-3 py-2 text-black"
                placeholder="Escribe un mensaje..."
              />

              <button
                onClick={enviarMensaje}
                aria-label="Enviar mensaje"
                className="rounded-lg bg-blue-950 p-2 text-white"
              >
                <Send size={18} />
              </button>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

      <button
        onClick={() => setAbierto(!abierto)}
        aria-label={abierto ? "Cerrar chat" : "Abrir chat"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-950 text-white shadow-xl"
      >
        {abierto ? <X size={26} /> : <MessageCircle size={26} />}
      </button>

    </div>
  );
}