"use client";

export default function CancelledTrips() {
  const cancelledTrips: any[] = []; // Replace with your real data

  return (
    <div className="flex justify-center">
      <div className="w-full py-16">
        {cancelledTrips.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
            <p className="text-lg font-medium mb-2">
              Você ainda não tem viagens canceladas.
            </p>
            <p className="text-sm">
              Se alguma reserva for cancelada, ela aparecerá aqui.
            </p>
            <button className="mt-6 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition">
              Explorar Novos Destinos
            </button>
          </div>
        ) : (
          <div>
            {/* Map cancelled trips here */}
          </div>
        )}
      </div>
    </div>
  );
}
