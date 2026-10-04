import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_URL } from "@/lib/contacto";

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      title="Escríbenos por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105 hover:bg-[#1ebe5b]"
    >
      <FaWhatsapp size={30} aria-hidden="true" />
    </a>
  );
}
