import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import WhyUs from "@/components/home/WhyUs";
import ContactForm from "@/components/home/ContactForm";
import Footer from "@/components/layout/Footer";
import UvtCalculator from "@/components/home/UvtCalculator";
import PensionCalculator from "@/components/home/PensionCalculator";
import Chatbot from "@/components/home/Chatbot";
import ContactInfo from "@/components/home/ContactInfo";
import WhatsAppButton from "@/components/home/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <section className="bg-slate-50 py-24 px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-4xl font-bold text-slate-900">
              Calculadora tributaria
            </h2>
            <p className="mb-10 text-slate-600">
              Convierte fácilmente entre UVT y pesos colombianos
            </p>
            <UvtCalculator />
          </div>
        </section>

        <section className="bg-white py-24 px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-4xl font-bold text-slate-900">
              Calculadora de pensión
            </h2>
            <p className="mb-10 text-slate-600">
              Descubre qué te falta para pensionarte según el régimen de prima media
            </p>
            <PensionCalculator />
          </div>
        </section>

        <section id="contacto" className="bg-slate-50 py-24 px-6">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-10 text-center text-4xl font-bold text-slate-900">
              Contáctanos
            </h2>
            <ContactInfo />
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
      <WhatsAppButton />
    </>
  );
}