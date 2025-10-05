"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, CreditCard, Lock, Bell, Settings } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const accountMenu = [
    { name: "Informação pessoal", href: "/account/personal-info", icon: User },
    {
      name: "Métodos de pagamento",
      href: "/account/payment-method",
      icon: CreditCard,
    },
    {
      name: "Login e Segurança",
      href: "/account/login-and-security",
      icon: Lock,
    },
    { name: "Notificações", href: "/account/notifications", icon: Bell },
  ];

  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="flex w-full max-w-6xl gap-12 px-6 py-12">
        {/* Sidebar */}
        <aside className="hidden sticky top-27 lg:flex lg:flex-col w-80 h-fit px-6 py-8 bg-white border border-gray-200 rounded-2xl shadow-lg sticky top-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-8">
            Minha Conta
          </h2>
          <ul className="space-y-2">
            {accountMenu.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-gray-100 text-black font-medium"
                        : "text-gray-500 hover:bg-gray-50 hover:text-black"
                    }`}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Content */}
        <main
          className="
    flex-1 
    w-full 
    px-4 sm:px-6 md:px-8 
    py-6 sm:py-8 
    bg-white 
    lg:max-w-3xl
  "
        >
          {children}
        </main>
      </div>
    </div>
  );
}
