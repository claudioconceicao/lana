"use client";

import HeroSection from "@/components/hero-section";
import Link from "next/link";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useSession } from "@/context/SessionContext";
import ListingCard from "@/components/listing_card";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Accordion } from "@/components/accordion";
import { FaBolt, FaCheckCircle, FaHeadset, FaLock } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { FaShieldAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { Globe, Home, Wallet } from "lucide-react";
import EarningCalculator from "@/components/earning-calculator";
import Loader from "./loading";
import { createClient } from "../../lib/supabase/client";
import ListingCardSkeleton from "@/components/listing_card_skeleton";
import { BsHeadset } from "react-icons/bs";

export default function HomePage() {
  const router = useRouter();
  const supabase = createClient();
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const goToSearch = () => router.push("/search");

  const homeTypes = [
    "Piscinas",
    "Casas de praia",
    "Apartamentos",
    "Em frente à praia",
    "Vistas incriveis",
  ];
  const [homeType, setHomeType] = useState(homeTypes[0]);

  const topDestinations = useMemo(
    () => [
      { city: "Luanda", image: "/images/luanda_night.jpg" },
      { city: "Benguela", image: "/images/benguela.jpg" },
      { city: "Namibe", image: "/images/namibe.jpg" },
    ],
    []
  );

  const handleHomeTypeChange = (type: string) => {
    setHomeType(type);
    setLoading(true);
    setListings([]);
  };

  const fetchListings = useCallback(
    async (filter: string) => {
      setLoading(true);

      let query = supabase
        .from("listings")
        .select(
          `
    listing_id,
    title,
    base_price,
    no_of_beds,
    max_guests,
    property_types(name),
    province:provinces(name),
    accommodation_type:accommodation_types(name),
    listing_amenities (
      amenity_id,
      amenities(name)
    ),
    listing_ratings(average_rating, review_count)
    `
        )
        .limit(6);

      // amenity-based filters
      if (filter === "Piscinas") {
        query = query.eq("listing_amenities.amenities.name", "Piscina");
      }
      if (filter === "Vistas incriveis") {
        query = query.eq("listing_amenities.amenities.name", "Vista incrível");
      }

      // property type filters
      if (filter === "Apartamentos") {
        query = query.eq("property_types.name", "Apartamento");
      }
      if (filter === "Casas de praia") {
        query = query.eq("property_types.name", "Casa de Praia");
      }

      // location_tag filter
      if (filter === "Em frente à praia") {
        query = query.eq("location_tag", "Em frente à praia");
      }

      const { data, error } = await query;

      if (error) {
        console.error(
          "Error fetching listings:",
          JSON.stringify(error, null, 2)
        );
        setListings([]);
      } else {
        setListings(data || []);
      }

      setTimeout(() => setLoading(false), 1500);
    },
    [supabase]
  );

  useEffect(() => {
    fetchListings(homeType);
  }, [fetchListings, homeType]);

  return (
    <div className="overflow-x-hidden">
      <HeroSection />

      {/* Top destination banners */}
      <div>
        <div className="mt-16 space-y-4 w-full flex flex-col items-center justify-center text-center">
          <h1 className="font-heading text-black text-3xl md:text-4xl lg:text-5xl font-medium leading-snug">
            Um mundo cheio de escolhas
          </h1>
          <p className="font-sans text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed max-w-[650px] mx-auto">
            De um apartamento acolhedor para uma noite até uma vivenda espaçosa
            para o fim de semana — com a Beeva, há sempre a opção ideal para
            cada ocasião.
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
                sizes="60vw"
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
      </div>

      {/* Home types */}
      <div className="mx-4 md:mx-12 lg:mx-36 mt-16 text-pretty">
        <div className="lg:w-[600px] md:w-[500px] w-full">
          <h1 className="lg:text-4xl md:text-2xl text-xl font-semibold text-gray-900">
            Encontre os melhores aluguéis de casas para uma estadia incrível
          </h1>
          <p className="mt-3 text-gray-600">
            Na Beeva, acreditamos que viajar deve ser simples e prazeroso.
            Descubra casas únicas, reserve em minutos e sinta-se em casa em
            qualquer lugar.
          </p>
        </div>

        {/* Home type filter */}
        <div className="mt-10">
          <ul className="flex flex-row gap-4 overflow-x-auto no-scrollbar">
            {homeTypes.map((type) => {
              const isActive = homeType === type;
              return (
                <li key={type}>
                  <button
                    onClick={() => handleHomeTypeChange(type)}
                    className={`${
                      isActive
                        ? "bg-orange-500 text-white border-orange-500"
                        : "border-gray-300 text-gray-700 hover:border-orange-400 hover:text-orange-500"
                    } text-nowrap text-sm font-medium items-center justify-center border px-4 py-2 rounded-full cursor-pointer transition`}
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
          <AnimatePresence mode="popLayout">
            {loading ? (
              // shimmer skeletons while loading
              [...Array(3)].map((_, i) => (
                <motion.div
                  key={`skeleton-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ListingCardSkeleton />
                </motion.div>
              ))
            ) : listings.length > 0 ? (
              <div className="contents">
                {listings.map((listing) => (
                  <motion.div
                    key={listing.listing_id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ListingCard listing={listing} />
                  </motion.div>
                ))}

                <div className="col-span-full flex justify-center font-semibold items-center mt-12">
                  <Link
                    href={`/search?type=${homeType}`}
                    className="rounded-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 transition shadow-md flex items-center gap-2"
                  >
                    Ver mais casas
                    <span aria-hidden="true" className="animate-pulse">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            ) : (
              //only shows when not loading AND no results
              <motion.p
                key="no-results"
                className="text-gray-500 col-span-full  text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                Nenhuma casa encontrada para {homeType}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* Become a host section */}
      <section className="bg-orange-50 py-16 px-6 rounded-2xl mt-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Ganhe dinheiro extra alugando o seu espaço
            </h2>
            <p className="text-lg text-gray-700">
              Seja um anfitrião e transforme sua casa em uma oportunidade.
              Flexibilidade total, pagamentos seguros e suporte 24/7 para você.
            </p>

            {/* Benefícios rápidos */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Wallet className="w-6 h-6 text-black" />
                <span className="text-gray-800">
                  Renda extra todos os meses
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Home className="w-6 h-6 text-black" />
                <span className="text-gray-800">
                  Você decide quando hospedar
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-black" />
                <span className="text-gray-800">
                  Conheça viajantes do mundo todo
                </span>
              </div>
            </div>

            {/* Botão */}
            <div>
              <Link
                href="/become-a-host"
                className="inline-block px-8 py-4 bg-orange-600 text-white font-semibold rounded-xl shadow hover:bg-orange-700 transition"
              >
                Seja um Anfitrião
              </Link>
            </div>
          </div>

          <EarningCalculator />
        </div>
      </section>

      {/* Why Choose Beeva Section */}
      <div className="px-4 md:px-12 lg:px-36 py-16 bg-white text-gray-900 flex flex-col justify-center items-center rounded-2xl mt-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Por que escolher a <span className="text-orange-600">Beeva</span> para
          a sua estadia?
        </h2>
        <p className="text-lg md:text-xl text-center max-w-3xl mb-12 text-gray-700">
          Na Beeva, acreditamos que viajar deve ser simples e agradável.
          Estadias rápidas, seguras e confortáveis — para que você se sinta em
          casa em qualquer lugar.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {[
            {
              title: "Reserva rápida e simples",
              description:
                "Encontre e reserve o seu alojamento em poucos cliques.",
              icon: <FaBolt size={24} />,
            },
            {
              title: "Acomodações verificadas",
              description:
                "Todas as casas são avaliadas para garantir qualidade e conforto.",
              icon: <FaCheckCircle size={24} />,
            },
            {
              title: "Segurança garantida",
              description:
                "Todos os anfitriões e hóspedes são verificados para experiências seguras.",
              icon: <FaLock size={24} />,
            },
            {
              title: "Flexibilidade e variedade",
              description:
                "Desde casas na praia até apartamentos no centro, temos opções para todos.",
              icon: <FaHome size={24} />,
            },
            {
              title: "Suporte 24/7",
              description:
                "Nossa equipe de atendimento está disponível sempre que você precisar.",
              icon: (
                <div className="flex items-center gap-1">
                  <BsHeadset size={24} />
                </div>
              ),
            },
          ].map((card, idx) => (
            <motion.div
              key={card.title}
              className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-200 relative"
              initial={{ opacity: 0, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full text-black">
                {card.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm md:text-base">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/search"
            className="rounded-full bg-orange-600 font-semibold hover:bg-orange-500 hover:scale-105 transition-transform transition-colors duration-300 text-white px-8 py-3 shadow-md"
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
