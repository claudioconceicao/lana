"use client";
import Link from "next/link";
// Heroicons (use across the UI as needed)
import { LifebuoyIcon } from "@heroicons/react/24/outline";
// Brand icons (since Heroicons has no brand logos)
import { SiFacebook, SiInstagram, SiLinkedin } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
import { usePathname } from "next/navigation";

const CustomFooter = () => {

    const pathname = usePathname();
  const noFooterPages = [
    "/hosting/listings",
    "/hosting/messages",
    "/hosting/reservations",
    "/hosting/reviews",
    "/hosting/calendar",
    "/login",
    "/guest/messages",
    "/register",
    "/hosting/listings/new",
    "/account",
    "/account/personal-info",
    "/account/payment-method",
    "/account/login-and-security",
    "/account/notifications",
    "/account/settings",
  ];

  if(noFooterPages.includes(pathname) || pathname.includes('/edit')){
    return <></>
  };

  return (
    <footer className="sticky bg-gray-100 text-black py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        {/* Left side */}
        <div className="flex flex-col md:flex-row md:space-x-16 space-y-8 md:space-y-0">
          <div className="flex flex-col space-y-3">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <LifebuoyIcon className="h-5 w-5" />
              Suporte
            </h2>
            <Link href="/" className="hover:underline underline-offset-2">
              Centro de Ajuda
            </Link>
          </div>

          <div className="flex flex-col space-y-3">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              Beeva
            </h2>
            <Link href="/" className="hover:underline underline-offset-2">
              Sobre nós
            </Link>
            <Link href="/" className="hover:underline underline-offset-2">
              Notícias
            </Link>
            <Link href="/" className="hover:underline underline-offset-2">
              Grupos e Negócios
            </Link>
            <Link href="/" className="hover:underline underline-offset-2">
              Imobiliária
            </Link>
            <Link href="/" className="hover:underline underline-offset-2">
              Responsabilidade corporativa
            </Link>
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col space-y-4">
          <h2 className="font-semibold text-lg">Segue-nos</h2>
          <div className="flex gap-6 text-2xl text-gray-600">
            <Link
              href="/"
              className="hover:text-blue-600 transition"
              aria-label="Facebook"
            >
              <SiFacebook />
            </Link>
            <Link
              href="/"
              className="hover:text-sky-500 transition"
              aria-label="Twitter"
            >
              <FaTwitter />
            </Link>
            <Link
              href="/"
              className="hover:text-pink-500 transition"
              aria-label="Instagram"
            >
              <SiInstagram />
            </Link>
            <Link
              href="/"
              className="hover:text-blue-700 transition"
              aria-label="LinkedIn"
            >
              <SiLinkedin />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;
