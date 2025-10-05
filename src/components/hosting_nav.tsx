"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.svg";
import { usePathname } from "next/navigation";
import { IoIosNotifications } from "react-icons/io";
import CustomDrawer from "./custom_drawer";
import LinkMenuBtn from "./link_menu_btn";
import { useSession } from "@/context/SessionContext";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";
import Logo from "./logo";

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
  const { profile } = useSession();
  const router = useRouter();

  const logout = async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Redirect using Next.js router
      router.push("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="w-full min-h-[60px] bg-white px-8 shadow-sm sticky top-0 left-0 z-50">
      <div className="flex flex-row items-center justify-between h-full w-full">
        {/* Logo */}
        <div className="h-full flex items-center">
          <Link href="/hosting" className="h-full flex items-center cursor-pointer">
            <Logo className="h-[20px] text-black"/>
          </Link>
        </div>

        {/* Desktop Nav */}
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

        {/* Right Side */}

        <div className="flex flex-row items-center gap-6">
          <Link
            href={"/"}
            className={`block rounded-md px-3 py-2 text-xs font-semibold uppercase transition-colors duration-200 text-black hover:bg-gray-100`}
          >
            Vou viajar
          </Link>

          {/* Notifications */}
          <Link
            href="/notifications"
            aria-label="Notificações"
            className="text-xl hover:text-black"
          >
            <IoIosNotifications />
          </Link>

          {/* Drawer / Hamburger Menu */}
          <CustomDrawer isScrolled={true}>
            <div className="p-6 space-y-6">
              {/* Top Section */}
              <div>
                <ul className="space-y-1 text-2xl font-normal">
                  <li>
                    <LinkMenuBtn
                      href={`/profile/${profile?.id ?? ""}`}
                      title="Perfil"
                    />
                  </li>
                  <li>
                    <LinkMenuBtn href="/" title="Vou viajar" />
                  </li>
                </ul>
              </div>

              <hr />

              {/* Account Section */}
              <div>
                <ul className="space-y-2 text-lg">
                  <li>
                    <Link href="/account">Minha conta</Link>
                  </li>
                  <li>
                    <Link href="/help-center">Centro de ajuda</Link>
                  </li>
                  <li>
                    <button
                      onClick={() => logout()}
                      className="w-full text-left hover:underline"
                    >
                      Sair
                    </button>
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
