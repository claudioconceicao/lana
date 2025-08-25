"use client";

import { HeartIcon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const BookingPanel = () => {

 const [scrollY, setScrollY] = useState(0);

  useEffect(() => {

    const onScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div  id="booking-panel" >
      <section className={`${scrollY > 500 ? "fixed top-[80] right-[150]" : "sticky top-[80] right-[150]"} 
       ${scrollY > 800 ? "sticky right-[150]" : "sticky right-[150]"}} transition-all transition-discrete duration-300 ease-in-out bg-white shadow-md p-4 rounded-lg z-0`}>
        <form action="GET">
          <div className="flex justify-between items-center">
            <h2>Adiciona datas para ver o preço</h2>
            <div>
              <Link href={"#"}>
                <HeartIcon />
              </Link>
            </div>
          </div>
          <div className="flex flex-row  gap-4 mt-4">
            <button className="flex-1 border border-gray-200 p-3 rounded-full">
              Adicionar datas
            </button>
            <button className="flex-1 border border-gray-200 p-3 rounded-full">
              1 Convidado
            </button>
          </div>
          <div className={`hidden`}></div>
          <button className="w-full flex-1 bg-orange-300 p-4 rounded-lg mt-4">
            Verificar disponibilidade
          </button>
        </form>
      </section>
    </div>
  );
};

export default BookingPanel;
