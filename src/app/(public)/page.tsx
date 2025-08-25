"use client";

import HeroSection from "@/components/hero-section";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useSession } from "@/context/SessionContext";
import ListingCard from "@/components/listing_card";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Accordion } from "@/components/accordion";
import { FaHeadset } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { FaShieldAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";


export default function Home() {
  const router = useRouter();
  const { loading } = useSession();

  const homeTypes = useMemo(
    () => [
      "Mais visto",
      "Piscinas",
      "Casas de praia",
      "Apartamentos",
      "Em frente à praia",
      "Vistas incriveis",
    ],
    []
  );

  const topDestinations = useMemo(
    () => [
      { city: "Luanda", image: "/images/luanda_night.jpg" },
      { city: "Benguela", image: "/images/benguela.jpg" },
      { city: "Namibe", image: "/images/namibe.jpg" },
    ],
    []
  );

  const [homeType, setHomeType] = useState(homeTypes[0]);

  const goToSearch = () => router.push("/search");
  const handleHomeTypeChange = (type: string) => setHomeType(type);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      <HeroSection />

      {/* Top destination banners */}
      <div className="mx-4 md:mx-12 lg:mx-36 mt-16 space-y-1 lg:w-[500px] md:w-[400px] w-full text-wrap">
        <h1 className="font-heading text-black lg:text-4xl md:text-2xl text-xl font-semibold text-pretty">
          Um mundo cheio de escolhas
        </h1>
        <p className="font-sans text-black line-clamp-5">
          De um apartamento para passar a noite para uma vivenda para passar o
          fim de semana, tem sempre uma Beeva para toda ocasião.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row md:flex-row justify-center mx-4 md:mx-12 lg:mx-36 gap-4 items-center mt-12">
        {topDestinations.map(({ city, image }) => (
          <div
            key={city}
            onClick={goToSearch}
            role="button"
            tabIndex={0}
            className="relative h-[550px] w-full rounded-md cursor-pointer overflow-hidden group"
          >
            {/* Destination image */}
            <Image
              src={image}
              alt={city}
              fill
              className="object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/50 group-hover:via-black/20"></div>

            {/* City name */}
            <div className="absolute bottom-8 left-6 text-white text-4xl font-semibold opacity-90 translate-y-4 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
              {city}
            </div>
          </div>
        ))}
      </div>

      {/* Home types */}
      <div className="mx-4 md:mx-12 lg:mx-36 mt-16 text-pretty">
        <div className="lg:w-[600px] md:w-[500px] w-full text-wrap">
          <h1 className="lg:text-4xl md:text-2xl text-xl font-semibold text-pretty">
            Encontre os melhores aluguéis de casas para uma estadia incrível
          </h1>
          <p className="line-clamp-3">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora
            quod impedit dolorem esse ratione tempore voluptatum provident
            ducimus accusantium adipisci.
          </p>
        </div>

        <div className="mt-10">
          <ul className="flex flex-row gap-4 overflow-x-auto no-scrollbar">
            {homeTypes.map((type) => {
              const isActive = homeType === type;
              return (
                <li key={type}>
                  <button
                    onClick={() => handleHomeTypeChange(type)}
                    className={`${
                      isActive ? "bg-black text-white" : "border-slate-400"
                    } text-nowrap text-sm items-center justify-center border px-4 py-2 rounded-full cursor-pointer`}
                  >
                    {type}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 justify-center items-center w-full">
          {[0, 1, 2, 4, 5].map((number) => (
            <ListingCard listing={null} key={number} />
          ))}
        </div>

        {/* More listings button */}
        <div className="flex justify-center font-semibold items-center mt-12">
          <Link
            href="/search"
            className="rounded-full bg-gray-700 hover:bg-orange-300 text-white px-4 py-3"
          >
            Ver mais casas
          </Link>
        </div>
      </div>

      {/* Why Choose Beeva Section */}
      <div className="px-4 md:px-12 lg:px-36 py-16 bg-gray-100 text-gray-900 flex flex-col justify-center items-center rounded-lg mt-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Por que escolher Beeva?
        </h2>
        <p className="text-lg md:text-xl text-center max-w-4xl mb-10">
          Nossa missão é tornar sua estadia inesquecível. Com a Beeva, você
          desfruta de segurança, conforto e experiências únicas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {[
            {
              title: "Segurança Garantida",
              description:
                "Todos os anfitriões e hóspedes são verificados para garantir experiências confiáveis e seguras.",
              icon: <FaShieldAlt size={28} />,
            },
            {
              title: "Variedade de Opções",
              description:
                "Oferecemos desde casas na praia até apartamentos no centro, adaptando-se a todos os gostos e orçamentos.",
              icon: <FaHome size={28} />,
            },
            {
              title: "Suporte 24/7",
              icon: (
                <div className="flex items-center gap-1">
                  <FaHeadset size={26} />
                  <BiTimeFive size={20} />
                </div>
              ),
              description:
                "Nossa equipe de atendimento está disponível a qualquer hora para resolver dúvidas ou problemas.",
            },
          ].map((card, idx) => (
            <motion.div
              key={card.title}
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md cursor-pointer relative"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "0px 15px 25px rgba(0,0,0,0.2)",
              }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <div className="relative w-16 h-16 mb-4">
                {card.icon}
              </div>
              <h3 className="font-semibold text-xl mb-2">{card.title}</h3>
              <p>{card.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/search"
            className="rounded-full bg-orange-600 font-semibold hover:bg-orange-500 hover:scale-105 transition-transform transition-colors duration-300 text-white px-6 py-3"
          >
            Explore Agora
          </Link>
        </div>
      </div>

      {/* Accordion section */}
      <div className="px-[100px] my-16">
        <Accordion
          allowMultiple
          items={[
            {
              title: "Destinos principais",
              content: (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm underline">
                  {[
                    "Luanda",
                    "Mussulo",
                    "Ingombotas",
                    "Ilha de Luanda",
                    "Maculusso",
                    "Kinaxixi",
                  ].map((dest) => (
                    <a
                      key={dest}
                      href="#"
                      className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                    >
                      {dest}
                    </a>
                  ))}
                </div>
              ),
            },
            {
              title: "Destinos",
              content: (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm underline">
                  <a
                    href="#"
                    className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  >
                    Luanda
                  </a>
                  <a
                    href="#"
                    className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  >
                    Benguela
                  </a>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
