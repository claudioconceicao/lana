import ListingDetail from "./listing_detail";

export async function generateStaticParams() {
  // Replace with your own data or hardcoded IDs
  return [
    { homeId: "1" },
    { homeId: "2" },
    { homeId: "3" },
  ];
}

export default function Page() {
  return <ListingDetail />;
}