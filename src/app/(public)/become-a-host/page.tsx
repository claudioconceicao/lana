"use client";

import HeroSection from "@/components/hero_section_host_setup";
import { useState } from "react";
import { Home, Users, Clock, ShieldCheck, Star } from "lucide-react";

export default function BecomeAHost() {
  const [location, setLocation] = useState("Luanda");
  const [propertyType, setPropertyType] = useState("Casa inteira");
  const [nights, setNights] = useState(15);
  const [pricePerNight, setPricePerNight] = useState(80000);

  const monthlyEarnings = nights * pricePerNight;

  return (
    <div className="w-full mx-auto space-y-8 bg-orange-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Why Hosting Section */}
      <section className=" py-8">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <h2 className="text-3xl font-bold text-center tracking-tight">
            Por que ser anfitrião?
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <Home className="w-10 h-10 text-orange-600 mb-3" />
              <h3 className="text-lg font-semibold mb-1">Ganhe Renda Extra</h3>
              <p className="text-gray-600">
                Transforme seu espaço em uma nova fonte de rendimento e alcance suas metas mais rápido.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <Users className="w-10 h-10 text-orange-600 mb-3" />
              <h3 className="text-lg font-semibold mb-1">Conheça Pessoas</h3>
              <p className="text-gray-600">
                Receba viajantes de diferentes culturas e crie conexões inesquecíveis.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <Clock className="w-10 h-10 text-orange-600 mb-3" />
              <h3 className="text-lg font-semibold mb-1">Flexibilidade Total</h3>
              <p className="text-gray-600">
                Você escolhe quando, quanto e como deseja hospedar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Earnings Estimator */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-center tracking-tight">
            Quanto você pode ganhar?
          </h2>
          <div className="grid md:grid-cols-2 gap-6 ">
            {/* Left side - inputs */}
            <div className=" bg-white border border-gray-200 p-6 rounded-2xl shadow space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Localização</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tipo de Propriedade</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full border rounded-lg p-3"
                >
                  <option>Casa inteira</option>
                  <option>Quarto privado</option>
                  <option>Quarto compartilhado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Noites por mês</label>
                <input
                  type="number"
                  min={1}
                  value={nights}
                  onChange={(e) => setNights(Number(e.target.value))}
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Preço por noite (AOA)</label>
                <input
                  type="number"
                  min={1}
                  value={pricePerNight}
                  onChange={(e) => setPricePerNight(Number(e.target.value))}
                  className="w-full border rounded-lg p-3"
                />
              </div>
            </div>

            {/* Right side - earnings box */}
            <div className="flex flex-col justify-center items-center bg-gradient-to-r from-orange-500 to-orange-600 p-8 rounded-2xl shadow text-white">
              <p className="mb-2 text-base">Ganhos Mensais Estimados</p>
              <p className="text-5xl font-extrabold">
                {monthlyEarnings.toLocaleString("pt-PT", {
                  style: "currency",
                  currency: "AOA",
                })}
              </p>
              <p className="mt-3 text-sm text-center max-w-sm">
                Baseado em hospedar <span className="font-semibold">{propertyType}</span> em <span className="font-semibold">{location}</span> como{" "}
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Hosting Works */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-6 tracking-tight">
            Como Funciona a Hospedagem
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[ 
              { title: "1. Anuncie seu espaço", desc: "Crie um anúncio gratuito em poucos minutos com fotos e detalhes da sua acomodação." },
              { title: "2. Receba hóspedes", desc: "Aproveite a flexibilidade de escolher quando deseja disponibilizar seu espaço." },
              { title: "3. Ganhe dinheiro", desc: "Receba pagamentos de forma rápida e segura diretamente em sua conta." },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow text-center hover:shadow-lg transition">
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 tracking-tight">Histórias de Anfitriões</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <p className="italic text-gray-600 mb-3">
                “Hospedar me ajudou a pagar minhas contas e conhecer pessoas incríveis de vários países.”
              </p>
              <div className="flex justify-center items-center gap-2">
                <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
                <p className="font-semibold">– Maria, Lisboa</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <p className="italic text-gray-600 mb-3">
                “Com a renda extra, consegui investir na minha casa e ainda trocar experiências culturais.”
              </p>
              <div className="flex justify-center items-center gap-2">
                <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
                <p className="font-semibold">– João, Rio de Janeiro</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Trust */}
      <section className="bg-neutral-200 py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <ShieldCheck className="w-12 h-12 text-orange-600 mx-auto mb-3" />
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Segurança e Confiança</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Garantimos a verificação de hóspedes, suporte 24h e cobertura contra danos. 
            Você hospeda com tranquilidade e nós cuidamos do resto.
          </p>
        </div>
      </section>

{/* FAQ */}
<section className="py-12">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-center mb-8 tracking-tight">
      Perguntas Frequentes
    </h2>

    <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white shadow-sm">
      {[
        {
          question: "Preciso hospedar o ano todo?",
          answer:
            "Não. Você controla a disponibilidade e escolhe quando abrir seu espaço para reservas.",
        },
        {
          question: "E se algo for danificado?",
          answer:
            "Você conta com proteção de anfitrião e suporte dedicado para resolver qualquer imprevisto.",
        },
        {
          question: "Como recebo os pagamentos?",
          answer:
            "Os pagamentos são transferidos de forma rápida e segura diretamente para sua conta bancária.",
        },
      ].map((faq, index) => (
        <details
          key={index}
          className="group px-6 py-6 cursor-pointer transition-all duration-300"
        >
          <summary className="flex justify-between items-center font-semibold text-base text-gray-800">
            {faq.question}
            <span className="ml-2 text-xl leading-none">
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:inline">−</span>
            </span>
          </summary>

          {/* Animated Answer */}
          <div
            className="overflow-hidden transition-all duration-300 ease-in-out max-h-0 opacity-0 group-open:max-h-40 group-open:opacity-100"
          >
            <p className="mt-2 text-gray-600">{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  </div>
</section>




      {/* Final Call to Action */}
      <section className="text-center py-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl shadow-lg text-white max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-3">Pronto para começar?</h2>
        <p className="text-base mb-5">Junte-se a milhares de anfitriões que já estão ganhando renda extra.</p>
        <button className="px-8 py-3 bg-white text-orange-600 rounded-2xl hover:scale-105 transition font-semibold">
          Começar Agora
        </button>
      </section>
      <div className={"p-8"}> </div>
    </div>
  );
}
