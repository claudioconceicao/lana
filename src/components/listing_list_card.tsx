import Image from "next/image";
import clsx from "clsx";

export default function HostingListingCard({
  listing,
  selected = false,
  onClick,
}: {
  listing: any | null;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "flex flex-row gap-4 p-2 rounded-lg cursor-pointer transition",
        selected ? "bg-gray-100" : "hover:bg-gray-100"
      )}
    >
      {/* Image */}
      <div className="relative w-20 h-16 rounded-md overflow-hidden">
        <Image
          alt="listing cover"
          src={listing?.cover || "/images/image4.png"}
          fill
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center">
        <h4 className="font-semibold text-sm">
          {listing?.title || "Apartamento Moderno"}
        </h4>
        <p className="text-xs text-gray-500">
          {listing?.location || "Luanda, Angola"}
        </p>
      </div>
    </div>
  );
}
