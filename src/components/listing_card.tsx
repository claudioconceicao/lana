import { ImageCarousel } from "./image_carousel";
import { FaStar } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";

type Listing = {
  listing_id: string;
  title: string;
  location: string;
  price: number;
  rating: {
    rating: number;
  };
};

export default function ListingCard({ listing }: { listing: Listing | null }) {
  const router = useRouter();
  const [liked, setLiked] = useState(false);

  const images = [
    "/images/image.png",
    "/images/image1.png",
    "/images/image3.png",
    "/images/image4.png",
    "/images/luanda_beach.jpeg",
    "/images/luanda_night.jpg",
  ];

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // ✅ prevent navigating when clicking the heart
    setLiked((prev) => !prev);
  };

  return (
    <div className="w-full sm:max-w-sm rounded-xl bg-white overflow-hidden  transition">
      {/* Image Carousel (now bigger) */}
      <div
        className="w-full h-64 cursor-pointer" // 👈 taller image section
        onClick={() =>
          router.push(`/homes/${listing ? listing.listing_id : 0}`)
        }
      >
        <ImageCarousel images={images} />
      </div>

      {/* Card Content */}
      <div
        className="py-3 flex flex-col gap-2 cursor-pointer"
        onClick={() =>
          router.push(`/homes/${listing ? listing.listing_id : 0}`)
        }
      >
        {/* Heading + Location */}
        <div className="flex flex-row justify-between items-center">
          <div>
            <h2 className="font-heading text-lg font-semibold text-gray-900">
              {listing?.title || "Título do Imóvel"}
            </h2>
            <p className="text-sm text-gray-500">
              {listing?.location || "Localização"}
            </p>
          </div>
          <button
            onClick={toggleLike}
            className="rounded-full p-2"
          >
            {liked ? (
              <FaHeart className="text-red-500 w-5 h-5" />
            ) : (
              <FaRegHeart className="text-gray-700 w-5 h-5" />
            )}
          </button>
        </div>

        {/* Rating + Price */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1 text-yellow-500 text-sm">
            <FaStar className="w-4 h-4" />
            <span>{listing?.rating.rating || "4.9"}</span>
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
