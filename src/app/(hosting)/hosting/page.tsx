"use client";

import ReservationCard from "@/components/reseveration-card";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import { useState } from "react";
import { FaHeadset, FaStar } from "react-icons/fa";

const mockReservations = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  guest: `Guest ${i + 1}`,
  status: "Pending",
}));

export default function HomeHosting(){ 

  const [reservations, setReservations] = useState(mockReservations);

  const filters = [
    "Convidados actuais",
    "Próximos hóspedes",
    "Pendentes",
  ];

  return (
    <div className="w-full flex flex-col items-start justify-center px-4 md:px-12 lg:px-36 my-12 space-y-8">
      {/* Greeting + Create Listing */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
        <h3 className="font-semibold text-3xl">Olá, Admin!</h3>
        <button className="flex flex-row gap-2 shadow items-center justify-center p-2 rounded-lg hover:shadow-md">
          <IoMdAdd className="w-4 h-4" />
          <span>Criar Anúncio</span>
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <div className="p-8 border rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Anúncios Ativos</p>
          <h2 className="text-2xl font-semibold">3</h2>
        </div>
        <div className="p-8 border rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Reservas Próximas</p>
          <h2 className="text-2xl font-semibold">5</h2>
        </div>
        <div className="p-8 border rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Ganhos do mês</p>
          <h2 className="text-2xl font-semibold"><span className="text-md">AO</span> 250,000</h2>
        </div>
        <div className="p-8 border rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Avaliação Média</p>
          <h2 className="text-2xl font-semibold flex flex-row items-center">
            <span>
              <FaStar className="w-4 h-4"/>
            </span>{" "}
            4.8
          </h2>
        </div>
      </div>

      {/* Reservations Section */}
      <div className="w-full space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-2">
          <h1 className="font-semibold text-3xl">Reservas</h1>
          <Link href="/hosting/reservations" className="underline text-md">
            Todas as reservas ({reservations.length})
          </Link>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              className="flex flex-row gap-2 border items-center justify-center py-2 px-4 rounded-full hover:border-black transition-colors"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Horizontal Scrollable Reservations */}
        <div className="overflow-x-auto w-full py-4">
          <ul className="inline-flex gap-4">
            {reservations.map((res) => (
              <li key={res.id} className="flex-shrink-0 w-64 mx-4">
                <ReservationCard />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-orange-400/30 w-full h-60 rounded-lg flex flex-col items-center justify-center">
        <FaHeadset className="w-8 h-8" />
        <p className="mt-2 text-lg font-semibold">
          Precisa de ajuda ? Estamos aqui para o ajudar
        </p>
        <p className="text-md">
          Entre em contacto com a nossa equipa, num click estaremos aqui para o
          ajudar
        </p>

        <button className="p-3 hover:bg-gray-400/25 rounded-full mt-4">
          Enviar mensagem
        </button>
      </div>
    </div>
  );
};

