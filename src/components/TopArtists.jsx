import React from "react";
import { motion } from "framer-motion";

const TopArtists = () => {
  const artists = [
    { name: "Sarah Martinez", title: "Digital Artist", works: 45, likes: "2.1k" },
    { name: "Michael Chen", title: "Oil Painter", works: 32, likes: "1.8k" },
    { name: "Emma Wilson", title: "Sculptor", works: 28, likes: "1.5k" },
    { name: "David Park", title: "Watercolor Artist", works: 38, likes: "1.3k" },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-purple-50 to-white text-center overflow-hidden">
      
      <div className="absolute top-10 left-1/4 w-60 h-60 bg-purple-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3">
          Top Artists of the Week
        </h2>
        <p className="text-gray-500 mb-14 text-lg">
          Meet the most creative minds of our art community 🎨
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 justify-items-center">
          {artists.map((artist, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative bg-white/70 backdrop-blur-xl shadow-xl hover:shadow-2xl rounded-3xl px-8 py-10 w-64 transition-all duration-300 border border-white/30 cursor-pointer"
            >
              {/* Profile image */}
              <div className="relative w-28 h-28 mx-auto mb-5">
                <img
                  src={`https://i.pravatar.cc/150?img=${i + 10}`}
                  alt={artist.name}
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Artist info */}
              <h3 className="font-semibold text-gray-800 text-xl">{artist.name}</h3>
              <p className="text-purple-600 text-sm mb-4">{artist.title}</p>

              <div className="flex justify-center gap-3 text-base text-gray-600">
                <span>🎨 {artist.works} Works</span>
                <span>•</span>
                <span>❤️ {artist.likes}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopArtists;
