import React from "react";
import { motion } from "framer-motion";

const CommunityHighlights = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-purple-50 to-white px-6 md:px-24 overflow-hidden">
      {/* Decorative blurred orbs for a creative touch */}
      <div className="absolute top-10 left-1/4 w-60 h-60 bg-purple-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl"></div>

      {/* Section Header */}
      <div className="relative text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3">
          Community Highlights
        </h2>
        <p className="text-gray-500 text-lg">
          Celebrating creativity and artistic achievements
        </p>
      </div>

      {/* Grid Layout */}
      <div className="relative grid md:grid-cols-3 gap-10 items-stretch">
        {/* Left Large Card - Artist of the Month */}
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className="col-span-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-3xl p-10 shadow-2xl transition-all"
        >
          <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            🏆 Artist of the Month
          </h3>
          <p className="mb-6 text-white/90 text-sm md:text-base">
            Outstanding contribution to our creative community
          </p>

          <div className="flex items-center gap-5 bg-white/10 p-5 rounded-2xl backdrop-blur-sm">
            <img
              src="https://i.pravatar.cc/150?img=55"
              alt="Jessica Adams"
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
            />
            <div>
              <h4 className="font-semibold text-xl">Jessica Adams</h4>
              <p className="text-white/80 text-sm">Mixed Media Artist</p>
              <p className="text-white/70 text-xs mt-1">
                🎨 52 artworks shared • ❤️ 3.2k total likes
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Column Cards */}
        <div className="flex flex-col gap-6">
          {/* Trending Now */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl border border-purple-100 transition-all"
          >
            <h4 className="text-orange-500 font-semibold mb-2 text-lg">
              🔥 Trending Now
            </h4>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Digital Art is gaining massive popularity this week with over{" "}
              <span className="font-semibold text-purple-600">500+</span> new
              uploads!
            </p>
            <a
              href="#"
              className="text-purple-600 text-sm font-semibold hover:underline"
            >
              Explore Trending →
            </a>
          </motion.div>

          {/* Community Stats */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl border border-purple-100 transition-all"
          >
            <h4 className="text-purple-600 font-semibold mb-3 text-lg flex items-center gap-2">
              📊 Community Stats
            </h4>
            <ul className="text-gray-700 text-sm space-y-1">
              <li>👩‍🎨 2,847 Active Artists</li>
              <li>🖼️ 12,593 Artworks Shared</li>
              <li>❤️ 45,281 Likes Given</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunityHighlights;
