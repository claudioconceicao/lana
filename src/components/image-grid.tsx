"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ImageGridProps {
  images: string[];
}

const ImageGrid = ({ images }: ImageGridProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const openGallery = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeGallery = () => setIsOpen(false);

  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const nextImage = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  // 🔑 Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeGallery();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // 🔑 Touch swipe handling (mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEndX(e.changedTouches[0].clientX);
    if (touchStartX === null) return;

    const distance = touchStartX - e.changedTouches[0].clientX;

    // Swipe threshold (50px)
    if (distance > 50) {
      nextImage(); // swipe left
    } else if (distance < -50) {
      prevImage(); // swipe right
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <div className="lg:mx-[150px] md:mx-8 sm:mx-4 h-[450px]">
      <div className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
        {/* Left big image */}
        <div>
          <Image
            src={images[0] || "/images/placeholder.jpg"}
            alt="Main view"
            width={600}
            height={500}
            priority
            onClick={() => openGallery(0)}
            className="object-cover w-full h-[450px] rounded-tl-md rounded-bl-md hover:brightness-75 transition duration-500 cursor-pointer"
          />
        </div>

        {/* Right stacked images */}
        <div className="flex flex-col gap-2 h-[450px]">
          <div className="grid grid-cols-2 gap-2">
            <Image
              src={images[1] || "/images/placeholder.jpg"}
              alt="Secondary view"
              width={300}
              height={200}
              onClick={() => openGallery(1)}
              className="object-cover w-full h-[180px] hover:brightness-75 transition duration-500 cursor-pointer"
            />
            <Image
              src={images[2] || "/images/placeholder.jpg"}
              alt="Skyline view"
              width={300}
              height={200}
              onClick={() => openGallery(2)}
              className="object-cover w-full h-[180px] rounded-tr-md hover:brightness-75 transition duration-500 cursor-pointer"
            />
          </div>

          {/* Bottom image with button */}
          <div className="relative">
            <Image
              src={images[3] || "/images/placeholder.jpg"}
              alt="Panorama view"
              width={600}
              height={350}
              onClick={() => openGallery(3)}
              className="object-cover w-full h-[262px] rounded-br-md hover:brightness-75 transition duration-500 cursor-pointer"
            />
            <button
              className="absolute w-[100px] h-[40px] bg-white flex justify-center items-center shadow bottom-3 right-2 text-sm font-medium rounded-md z-10 hover:bg-gray-100"
              aria-label="Ver mais imagens"
              onClick={() => openGallery(0)}
            >
              Ver mais
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Gallery Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/92 backdrop-blur-sm flex justify-center items-center z-50"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={closeGallery}
            className="absolute top-5 right-5 text-white text-3xl"
            aria-label="Fechar"
          >
            <FaTimes />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-5 text-white text-3xl"
            aria-label="Imagem anterior"
          >
            <FaChevronLeft />
          </button>

          <div className="max-w-5xl max-h-[85vh] shadow-lg rounded-lg overflow-hidden">
            <Image
              src={images[currentIndex]}
              alt={`Imagem ${currentIndex + 1}`}
              width={1200}
              height={800}
              className="object-contain w-full h-full"
            />
          </div>

          <button
            onClick={nextImage}
            className="absolute right-5 text-white text-3xl"
            aria-label="Próxima imagem"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
