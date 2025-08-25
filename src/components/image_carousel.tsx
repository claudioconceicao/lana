"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type CarouselProps = {
  images: string[];
  className?: string;
};
export function ImageCarousel({ images, className }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
   <div
  className={cn(
    "relative w-full aspect-[4/3] sm:aspect-[5/4] md:aspect-[3/2] overflow-hidden rounded-xl",
    className
  )}
>

      {/* Images */}
      <div
        className="flex transition-transform duration-500 h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={i} className="relative min-w-full h-full">
            <Image
              src={src}
              alt={`slide-${i}`}
              fill
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prev}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      {/* Next Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={next}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-3 w-full flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label="indicators"
            onClick={() => setCurrent(i)}
            className={cn(
              "w-[7px] h-[7px] rounded-full transition-all",
              i === current ? "bg-white" : "bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}
