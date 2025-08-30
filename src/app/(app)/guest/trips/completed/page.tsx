"use client";

import Image from "next/image";

export default function CompletedTrips() {
  const completedTrips: any[] = []; // Replace with your real data

  return (
    <div className="flex justify-center">
      <div className="w-full py-16 ">
        {completedTrips.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
            <p className="text-lg font-medium mb-2">
              Você ainda não tem viagens concluídas.
            </p>
            <p className="text-sm">
              Assim que terminar uma reserva, ela aparecerá aqui.
            </p>
            <button className="mt-6 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition">
              Reservar uma Viagem
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {completedTrips.map((trip, idx) => (
              <div
                key={idx}
                className="border rounded-lg shadow-sm bg-white p-4 hover:shadow-md transition"
              >
                <Image
                  src={trip.image || "/images/placeholder.jpg"}
                  alt={trip.destination}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold">{trip.destination}</h2>
                <p className="text-gray-500 text-sm">{trip.date}</p>
                <p className="mt-2 text-gray-700 text-sm">
                  {trip.description || "Viagem incrível já concluída!"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
