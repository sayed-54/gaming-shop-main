"use client";

import { useState, useEffect } from "react";

export function MovingImage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    {
      src: "/sr-hlMjYlPGvrU-unsplash.jpg",
      alt: "Ramadan Kareem Greeting",
      description: "Warm Ramadan Wishes",
    },
    {
      src: "/rezki-trianto-GSXeIGXxgyw-unsplash.jpg",
      alt: "Iftar Meal Preparation",
      description: "Traditional Iftar Spread",
    },
    {
      src: "/sr-hlMjYlPGvrU-unsplash.jpg",
      alt: "Ramadan Mosque Scene",
      description: "Peaceful Ramadan Evening",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-60 sm:h-64 xl:h-80 2xl:h-96 overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          width: `${images.length * 100}%`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0 relative">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
              {image.description}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`
              w-3 h-3 rounded-full 
              ${currentSlide === index ? "bg-white" : "bg-white/50"}
            `}
          />
        ))}
      </div>
    </div>
  );
}
