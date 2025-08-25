"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EditNav({ listingId }: { listingId: string }) {
  const pathname = usePathname();

  // Define edit tabs + their routes
  const tabs = [
    { name: "Detalhes do anúncio", href: `/hosting/listings/${listingId}/edit/details` },
    { name: "Preços e disponibilidade", href: `/hosting/listings/${listingId}/edit/pricing` },
    { name: "Políticas e Regras", href: `/hosting/listings/${listingId}/edit/policies` },
    { name: "Informações para os hóspedes", href: `/hosting/listings/${listingId}/edit/info` },
  ];
  return (
    <div className="flex flex-row gap-x-6 border-b border-gray-200">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`py-4 text-md transition-all duration-300 border-b-2
              ${
                isActive
                  ? "text-black border-black"
                  : "text-gray-400 border-transparent hover:border-black"
              }`}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
}
