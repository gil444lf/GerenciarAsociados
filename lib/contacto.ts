// Datos de contacto del cliente. Se usan en el sitio (Navbar, Contacto, Footer, WhatsApp).
// Para cambiarlos, edita solo este archivo.

export const NOMBRE_EMPRESA = "GERENCIAR ASOCIADOS";
export const SLOGAN = "Contadores y especializados";

export const TELEFONOS = [
  { texto: "+57 302 706 5067", tel: "+573027065067" },
  { texto: "+57 314 842 6169", tel: "+573148426169" },
];

export const EMAIL_CONTACTO = "gerenciaras2014@gmail.com";

// Número de WhatsApp en formato internacional, sin "+" ni espacios.
// Se puede cambiar con NEXT_PUBLIC_WHATSAPP_NUMBER en el .env
export const WHATSAPP_NUMERO =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573027065067";

export const WHATSAPP_MENSAJE =
  "Hola, quisiera más información sobre los servicios de Gerenciar Asociados.";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
  WHATSAPP_MENSAJE
)}`;
