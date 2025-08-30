"use client";

export default function UpcomingTrips() {
  const trips: any[] = []; // Replace with your real data

  return (
    <div className="flex justify-center">
      <div className="w-full py-16 ">

        {trips.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
            <p className="text-lg font-medium mb-2">Você ainda não tem viagens agendadas.</p>
            <p className="text-sm">
              Reserve um local incrível e ele aparecerá aqui.
            </p>
            <button className="mt-6 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition">
              Explorar Destinos
            </button>
          </div>
        ) : (
          <div>
            {/* Map your trips here */}
          </div>
        )}
      </div>
    </div>
  );
}
