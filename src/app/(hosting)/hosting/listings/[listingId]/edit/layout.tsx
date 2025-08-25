import Link from "next/link";
import EditNav from "../edit_nav";

const listings = [
  { id: "1", title: "Cozy Apartment" },
  { id: "2", title: "Beach House" },
  { id: "3", title: "Mountain Cabin" },
];

export default async function EditLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ listingId: string }>;
}) {
  const { listingId } = await params;

  return (
    <div className="flex lg:block block sm:hidden">
      {/* Sidebar */}
      <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-[350px] border-r bg-white p-4 overflow-y-auto">
        <h2 className="font-semibold font-heading text-lg mb-4">{listings.length} Anúncios</h2>
        <ul className="space-y-2">
          {listings.map((listing) => (
            <li key={listing.id}>
              <Link
                href={`/hosting/listings/${listing.id}/edit/details`}
                className={`block rounded-lg px-3 py-2 hover:bg-gray-100 ${
                  listingId === listing.id
                    ? "bg-gray-200 font-bold"
                    : "text-gray-700"
                }`}
              >
                {listing.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="ml-[350px] flex-1 p-8 overflow-y-auto">
        <EditNav listingId={listingId} />
        <div className="py-8 lg:mr-[190px]">{children}</div>
      </main>
    </div>
  );
}
