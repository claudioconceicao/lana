"use client";
import RegularNav from "@/components/regular_nav";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const accountMenu = [
    { name: "Informação pessoal", href: "/account/personal-info" },
    { name: "Métodos de pagamento", href: "/account/payment-method" },
    { name: "Login e Segurança", href: "/account/login-and-security" },
    { name: "Notificações", href: "/account/notifications" },
    { name: "Definições", href: "/account/settings" },
  ];
  const pathname = usePathname();
  return (
    <>
      <div className="relative flex flex-row right-0 justify-between items-start px-4 mx-[150] gap-8 mt-8">
        <div className="fixed w-[300] bg-white p-4">
          <ul className="flex flex-col items-start">
            {accountMenu.map((item) => {
              const isActive = pathname.endsWith(item.href);
              return (
                <div key={item.name}>
                  <hr className="w-full border-gray-200 mb-2" />
                  <Link key={item.name} href={item.href}>
                    <li
                      className={`${
                        isActive ? "text-black font-medium" : "text-gray-500"
                      }
                cursor-pointer text-md hover:text-black transition-colors duration-200 mb-4`}
                    >
                      {item.name}
                    </li>
                  </Link>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="flex-1 ml-[400] z-[-1] bg-gray-50 overflow-y-auto">{children}</div>
      </div>
    </>
  );
}
