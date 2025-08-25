"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import CreateHouse from "../new-listing/page";

type Listing = {
  id: number;
  title: string;
  status: "Activo" | "Inactivo";
  location: string;
  image: string;
};

const ListingList = () => {
  const [listings, setListings] = useState<Listing[]>([
    {
      id: 1,
      title: "Anúncio 1",
      status: "Activo",
      location: "Luanda / Angola",
      image: "/images/image.png",
    },
    {
      id: 2,
      title: "Anúncio 2",
      status: "Inactivo",
      location: "Mussulo / Angola",
      image: "/images/image1.png",
    },
    {
      id: 3,
      title: "Anúncio 3",
      status: "Activo",
      location: "Ilha de Luanda / Angola",
      image: "/images/image3.png",
    },
  ]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const isModalOpen = searchParams.get("modal") === "new";

  return (
    <div className="lg:mx-32 my-12 md:mx-6 sm:mx-4 px-4 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-row items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold">Seus Anúncios</h1>
        <button
          onClick={() => router.push("?modal=new")}
          className="bg-gray-100 hover:bg-gray-200 shadow-md rounded-full w-10 h-10 flex items-center justify-center text-lg cursor-pointer"
        >
          +
        </button>
      </div>

      {/* Search */}
      <div className="pb-4 bg-white mt-2">
        <div className="relative mt-1">
          <input
            type="text"
            id="table-search"
            className="block pl-10 h-10 w-full max-w-md text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:bg-gray-100"
            placeholder="Procurar anúncios"
          />
        </div>
      </div>

      {/* Table for md+ / Cards for sm */}
      <div className="mt-6">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead className="h-12">
              <tr className="text-left text-sm font-semibold border-b border-gray-300">
                <th className="px-4 py-2">Anúncio</th>
                <th className="px-4 py-2">Estado</th>
                <th className="px-4 py-2">Localização</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => (
                <tr
                  key={listing.id}
                  onClick={() =>
                    router.push(`/hosting/listings/${listing.id}/edit/details`)
                  }
                  className="cursor-pointer hover:bg-gray-100 h-20"
                >
                  <td className="border-b border-gray-200 py-2 px-4">
                    <div className="flex flex-row items-center">
                      <Image
                        src={listing.image}
                        alt={listing.title}
                        width={100}
                        height={100}
                        priority
                        className="w-16 h-16 rounded-md object-cover mr-4"
                      />
                      <div className="text-sm font-semibold">
                        {listing.title}
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-gray-200 py-2 px-4">
                    <div className="flex items-center">
                      <div
                        className={`h-2.5 w-2.5 rounded-full mr-2 ${
                          listing.status === "Activo"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      {listing.status}
                    </div>
                  </td>
                  <td className="border-b border-gray-200 py-2 px-4">
                    {listing.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 md:hidden">
          {listings.map((listing) => (
            <div
              key={listing.id}
              onClick={() =>
                router.push(`/hosting/listings/${listing.id}/edit/details`)
              }
              className="bg-white border border-gray-200 rounded-lg p-4 flex items-start space-x-4 cursor-pointer hover:shadow"
            >
              <Image
                src={listing.image}
                alt={listing.title}
                width={80}
                height={80}
                className="w-20 h-20 rounded-md object-cover"
              />
              <div className="flex-1">
                <h3 className="text-base font-semibold">{listing.title}</h3>
                <p className="text-sm text-gray-600">{listing.location}</p>
                <div className="flex items-center mt-2">
                  <div
                    className={`h-2.5 w-2.5 rounded-full mr-2 ${
                      listing.status === "Activo"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                  <span className="text-sm">{listing.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <CreateHouse
          onClose={() => router.push("/hosting/listings/")}
          onFinish={(newHouse
          ) =>
            setListings((prev) => [
              ...prev,
              {
                id: newHouse.id,
                title: newHouse.title,
                description: "",
                status: "Inactivo", // default or from form
                location: newHouse.location ?? "Luanda / Angola", // fallback
                image: newHouse.image ?? "/images/default.png",
              },
            ])
          }
        />
      )}
    </div>
  );
};

export default ListingList;
