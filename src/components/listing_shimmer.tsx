import clsx from "clsx";

export function HostingListingCardShimmer() {
  return (
    <div
      className={clsx(
        "flex flex-row gap-4 p-2 rounded-lg cursor-default",
        "bg-gray-50 animate-pulse"
      )}
    >
      {/* Image placeholder */}
      <div className="relative w-20 h-16 rounded-md overflow-hidden bg-gray-200" />

      {/* Info placeholder */}
      <div className="flex flex-col justify-center space-y-2">
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-3 w-20 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
