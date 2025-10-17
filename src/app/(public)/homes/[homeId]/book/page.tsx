import BookingClient from "./booking_listing";

// ✅ Generate static paths for GitHub Pages
export async function generateStaticParams() {
  // Replace with your own data or hardcoded IDs
  return [
    { homeId: "1" },
    { homeId: "2" },
    { homeId: "3" },
  ];
}

export default function BookingPage() {
  return <BookingClient  />;
}