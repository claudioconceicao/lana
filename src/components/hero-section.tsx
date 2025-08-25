"use client";

import SearchBox from "./search_box";

const HeroSection = () => {
  return (
    <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-[url(/images/luanda_sky.jpg)] bg-cover bg-center brightness-[0.55]" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 md:px-8 w-full max-w-7xl mx-auto overflow-hidden">
        <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-extrabold text-center text-white leading-tight break-words">
          Descubra a sua{" "}
          <strong className="block font-extrabold text-orange-300">
            escapadela perfeita.
          </strong>
        </h1>

        <div className="w-full mt-8 flex justify-center">
          <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] mx-auto">
            <SearchBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
