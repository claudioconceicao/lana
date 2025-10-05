"use client";

import SearchBox from "./search_box";

const HeroSection = () => {
  return (
    <section className="bg-white py-12 relative h-[70vh] w-full flex flex-col md:flex-row items-center justify-between overflow-hidden">
      {/* Left content */}
      <div className="flex-1 flex flex-col items-start justify-center px-6 md:px-12 lg:px-20 text-left z-20">
        <h1 className="text-4xl md:text-6xl font-bold text-black mb-4">
          Torne-se um Anfitrião
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-xl">
          Compartilhe seu espaço com viajantes do mundo inteiro e ganhe dinheiro
          de forma flexível.
        </p>
        <button className="px-8 py-4 bg-orange-600 text-white font-semibold rounded-2xl shadow-md hover:bg-orange-700 transition">
          Anúncie grátis
        </button>
      </div>

      {/* Right side image */}
      <div className="flex-1 h-full relative mr-8 bg-white">
        <div className="absolute inset-0 bg-[url('/images/luanda_sky.jpg')] bg-cover bg-center z-0" />
      </div>
    </section>
  );
};

export default HeroSection;
