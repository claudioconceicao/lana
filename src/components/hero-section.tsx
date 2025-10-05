"use client";

import SearchBox from "./search_box";

const HeroSection = () => {
  return (
    <section className="relative h-[80vh] w-full flex items-center justify-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url(/images/luanda_sky.jpg)] bg-cover bg-center brightness-[0.55]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 md:px-8 w-full max-w-7xl mx-auto">
        <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-extrabold text-center text-white leading-tight break-words">
          Descubra a sua{" "}
          <strong className="block font-extrabold text-orange-300">
            escapadela perfeita.
          </strong>
        </h1>

        <div className="relative w-full mt-8 flex justify-center">
          <div className="w-full sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[900px]">
            <SearchBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
