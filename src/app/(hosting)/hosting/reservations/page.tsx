"use client";
import Image from "next/image";

const reservationsData = [
  {
    id: 1,
    listing: "Listing name 1",
    startDate: "2025-08-01",
    endDate: "2025-08-03",
    guest: "Guest 1",
    guestsCount: 2,
    reference: "ABC123",
    status: "Activo",
    price: "5000 Kz",
  },
  {
    id: 2,
    listing: "Listing name 2",
    startDate: "2025-08-05",
    endDate: "2025-08-07",
    guest: "Guest 2",
    guestsCount: 1,
    reference: "DEF456",
    status: "Pendente",
    price: "3000 Kz",
  },
  // add more reservations
];

const Reservations = () => {
  const filters = ["Todas", "Próximas", "Canceladas", "Concluídas", "Pendentes"];

  return (
    <div className="lg:mx-32 my-12 md:mx-auto sm:mx-auto px-4">
      <h1 className="text-3xl font-semibold mb-6">Reservas</h1>

      {/* Filter Buttons */}
      <div className="flex gap-4 overflow-x-auto pb-2 mb-6">
        {filters.map((filter) => (
          <button
            key={filter}
            className="flex-shrink-0 border-b-2 border-transparent hover:border-black transition-colors duration-300 ease-in px-2 py-1"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Table for large screens */}
      <div className="hidden md:block overflow-x-auto w-full">
        <table className="table-auto w-full min-w-[700px]">
          <thead className="h-12">
            <tr className="text-left text-sm font-semibold">
              <th>Anúncio</th>
              <th>Referência</th>
              <th>Hospede</th>
              <th>Estado</th>
              <th>Custo total</th>
            </tr>
          </thead>
          <tbody>
            {reservationsData.map((res) => (
              <tr
                key={res.id}
                className="cursor-pointer hover:bg-gray-100 h-20"
              >
                <td className="border-b border-gray-200 py-2">
                  <div className="flex flex-row items-center ml-3">
                    <Image
                      src="/images/image.png"
                      alt="House"
                      width={100}
                      height={100}
                      className="w-16 h-16 rounded-md object-cover mr-4"
                    />
                    <div className="flex flex-col text-sm font-semibold">
                      <div className="text-gray-500 font-normal text-sm">
                        {res.startDate} - {res.endDate}
                      </div>
                      <div className="font-semibold text-sm">{res.listing}</div>
                    </div>
                  </div>
                </td>
                <td className="border-b border-gray-200 py-2">{res.reference}</td>
                <td className="border-b border-gray-200 py-2">
                  <div className="flex flex-col text-sm font-semibold">
                    <div className="text-gray-500 font-normal">{res.guest}</div>
                    <div className="text-sm">{res.guestsCount} hóspedes</div>
                  </div>
                </td>
                <td className="border-b border-gray-200 py-2">
                  <div className="flex items-center">
                    <div
                      className={`h-2.5 w-2.5 rounded-full me-2 ${
                        res.status === "Activo" ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    ></div>
                    {res.status}
                  </div>
                </td>
                <td className="border-b border-gray-200 py-2">{res.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view for small screens */}
      <div className="flex flex-col gap-4 md:hidden">
        {reservationsData.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">{res.listing}</span>
              <span
                className={`text-sm font-medium ${
                  res.status === "Activo" ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {res.status}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              {res.startDate} - {res.endDate}
            </div>
            <div className="text-sm text-gray-500">
              {res.guest} ({res.guestsCount} hóspedes)
            </div>
            <div className="text-sm text-gray-500">Ref: {res.reference}</div>
            <div className="text-sm font-semibold">Total: {res.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservations;
