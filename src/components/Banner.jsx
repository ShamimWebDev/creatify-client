import React, { useState, useEffect } from "react";
import Button from "../ui/Button";


const images = [
  "/banner1.png",
  "/banner2.png",
  "/banner3.png",
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      {/* Image Slider */}
      <div
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="min-w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-700/70 to-pink-500/70"></div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-24 text-white">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
          Discover & Share Creative Artworks
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl text-gray-100">
          Join a vibrant community of artists and art lovers. Showcase your
          creativity, explore amazing artworks, and connect with fellow artists.
        </p>
        <div className="flex gap-4">
          <Button className="bg-white text-purple-700 hover:bg-gray-100 font-semibold px-6 py-3 rounded-xl">
            Explore Gallery
          </Button>
          <Button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-xl">
            Start Creating
          </Button>
        </div>
      </div>

      {/* Slider Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;
