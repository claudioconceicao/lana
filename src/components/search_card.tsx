"use client";
import { FaStar } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { SearchImageCarousel } from "./search_image_carousel";

export default function SearchCard({ listing }: { listing: any }) {
  const router = useRouter();
  const images = [
    "/images/image.png",
    "/images/image1.png",
    "/images/image3.png",
    "/images/image4.png",
    "/images/luanda_beach.jpeg",
    "/images/luanda_night.jpg",
  ];

  return (
    <div
      className="flex flex-col sm:flex-row gap-4 justify-between w-full rounded-xl bg-white overflow-hidden cursor-pointer"
      onClick={() => router.push(`/homes/${listing ? listing.listing_id : 0}`)}
    >
      {/* Carousel */}
      <div className="w-full sm:w-[220px] md:w-[260px] lg:w-[280px] flex-shrink-0">
        <SearchImageCarousel
          images={images}
          className="h-40 sm:h-48 md:h-52 lg:h-56"
        />
      </div>

      {/* Text Section */}
      <div className="flex-1 flex flex-col justify-between p-2">
        <div>
          <h2 className="font-heading text-lg font-semibold text-gray-900">
            {listing?.title || "Título do Imóvel"}
          </h2>
          <p className="text-sm text-gray-500">
            {listing?.location || "Localização"}
          </p>
        </div>

        {/* Rating + Price */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1 text-yellow-500 text-sm">
            <FaStar className="w-4 h-4" />
            <span>{listing?.rating || "4.9"}</span>
          </div>
          <p className="font-medium text-gray-900 text-sm">
            {listing?.price || "5000"}{" "}
            <span className="text-gray-500">Kz / noite</span>
          </p>
        </div>
      </div>
    </div>
  );
}
