"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EditNav({ listingId }: { listingId: string }) {
  const pathname = usePathname();

  // Define edit tabs + their routes
  const tabs = [
    { name: "Detalhes do anúncio", href: `/hosting/listings/edit/${listingId}/details` },
    { name: "Preços e disponibilidade", href: `/hosting/listings/edit/${listingId}/pricing` },
    { name: "Políticas e Regras", href: `/hosting/listings/edit/${listingId}/policies` },
    { name: "Informações para os hóspedes", href: `/hosting/listings/edit/${listingId}/info` },
  ];
  return (
    <div className="flex flex-row gap-x-6 border-b border-gray-200">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`text-md transition-all duration-300 border-b-2 pb-2
              ${
                isActive
                  ? "text-black border-black"
                  : "text-gray-400 border-transparent hover:text-black"
              }`}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
}
