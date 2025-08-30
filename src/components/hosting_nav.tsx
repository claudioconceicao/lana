"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.svg";
import { usePathname } from "next/navigation";
import { IoIosNotifications } from "react-icons/io";
import CustomDrawer from "./custom_drawer";
import LinkMenuBtn from "./link_menu_btn";
import { useSession } from "@/context/SessionContext";

const HostingNav = () => {
  const navLinks = [
    { name: "Visão geral", href: "/hosting" },
    { name: "Calendário", href: "/hosting/calendar" },
    { name: "Anúncios", href: "/hosting/listings" },
    { name: "Mensagens", href: "/hosting/messages" },
    { name: "Reservas", href: "/hosting/reservations" },
    { name: "Avaliações", href: "/hosting/reviews" },
    { name: "Finanças", href: "/hosting/transactions-history" },
  ];
  const pathname = usePathname();

  const {profile} = useSession();

  return (
    <nav className="w-full min-h-[60px] bg-white px-8 shadow-sm sticky top-0 z-50">
      <div className="flex flex-row items-center justify-between h-full w-full">
        <div className="h-full flex items-center">
          <Link href="/hosting">
            <Image
              priority
              src={logo}
              alt="Logo"
              width={85}
              height={40}
              className="cursor-pointer object-contain"
            />
          </Link>
        </div>

        <ul className="hidden lg:flex flex-row justify-center space-x-4 items-center h-full">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/hosting"
                ? pathname === "/hosting"
                : pathname.startsWith(link.href);

            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`${isActive ? "font-medium" : "text-gray-700"}`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-row items-center gap-6">
          <button
            aria-label="Notificações"
            className="text-xl hover:text-black"
          >
            <IoIosNotifications />
          </button>
          <CustomDrawer isScrolled={true}>
            <div className="p-6 space-y-6">
              <div>
                <ul className="space-y-1 text-2xl font-normal">
                  <li>
                    <LinkMenuBtn href={`/profile/${profile.id}`} title="Perfil" />
                  </li>
                  <li>
                    <LinkMenuBtn href="/" title="Vou viajar" />
                  </li>
                </ul>
              </div>
              <hr />
              <div>
                <ul className="space-y-2 text-lg">
                  <li>
                    <Link href="/account">Minha conta</Link>
                  </li>
                  <li>
                    <Link href="/help-center">Centro de ajuda</Link>
                  </li>
                </ul>
              </div>
            </div>
          </CustomDrawer>
        </div>
      </div>
    </nav>
  );
};

export default HostingNav;
