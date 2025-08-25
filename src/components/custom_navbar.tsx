"use client";
import { useEffect, useState } from "react";

const CustomNavBar = () => {
  const links = [
    { label: "Fotos", target: "images" },
    { label: "Descrição", target: "description" },
    { label: "Comodidades", target: "amenities" },
    { label: "Localização", target: "location" },
    { label: "Políticas", target: "policies" },
    { label: "Comentários", target: "reviews" },
  ];

  const [showNav, setShowNav] = useState(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // 🔹 Show navbar only after BookingPanel disappears
    const bookingPanel = document.getElementById("booking-panel"); // give your booking panel this id

    if (!bookingPanel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowNav(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(bookingPanel);

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`bg-white shadow-md px-[100px] h-[60px] fixed top-0 left-0 justify-between w-full z-50 flex transition-all duration-500 ${
        showNav ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <ul className="flex flex-row space-x-12 items-stretch h-full">
        {links.map(({ label, target }) => (
          <li key={target} className="h-full flex">
            <button
              onClick={() => scrollToSection(target)}
              className="h-full flex items-center border-b-2 border-transparent hover:border-black px-4 transition-all duration-300"
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
      <div className="flex space-x-12 items-center">
        <h3>AOA 23.000 /noite</h3>
        <button className="bg-orange-300 text-white px-4 py-2 rounded-md hover:bg-orange-400">
          Reservar
        </button>
      </div>
    </nav>
  );
};

export default CustomNavBar;
