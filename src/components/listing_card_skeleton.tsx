"use client";

export default function ListingCardSkeleton() {
  return (
    <div className="w-full sm:max-w-sm rounded-xl bg-white overflow-hidden shadow-sm">
      {/* Image placeholder */}
      <div className="w-full h-64 bg-gray-300 shimmer" />

      {/* Card Content */}
      <div className="py-3 flex flex-col gap-2 px-4">
        {/* Heading + Heart */}
        <div className="flex flex-row justify-between items-center">
          <div className="space-y-2">
            {/* Title */}
            <div className="h-4 bg-gray-300 rounded w-32 shimmer"></div>
            {/* Location */}
            <div className="h-3 bg-gray-200 rounded w-20 shimmer"></div>
          </div>
          {/* Heart placeholder */}
          <div className="h-6 w-6 bg-gray-300 rounded-full shimmer"></div>
        </div>

        {/* Rating + Price */}
        <div className="flex items-center justify-between mt-2 ">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-300 rounded shimmer"></div>
            <div className="h-3 w-6 bg-gray-200 rounded shimmer"></div>
          </div>
          {/* Price */}
          <div className="h-4 w-16 bg-gray-300 rounded shimmer"></div>
        </div>
      </div>
    </div>
  );
}
