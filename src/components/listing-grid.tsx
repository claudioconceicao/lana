import ListingCard from "./listing_card";

export default function ListingGrid({ listings }: { listings: any[] }) {
  return (
    <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {listings.map((listing, index) => (
        <ListingCard key={index} listing={listing} />
      ))}
    </div>
  );
}
