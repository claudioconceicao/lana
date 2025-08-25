"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TripsNav() {
  const tabs = [
    { name: "Próximas", href: `/guest/trips/upcoming` },
    { name: "Concluídas", href: `/guest/trips/completed` },
    { name: "Canceladas & Rejeitadas", href: `/guest/trips/cancelled` },
  ];
  const pathname = usePathname();

  return (
    <div className="flex flex-row gap-x-6 border-b border-gray-200">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.name}
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
