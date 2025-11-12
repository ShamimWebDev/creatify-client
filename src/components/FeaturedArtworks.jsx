import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useArtworks } from "../context/ArtworksContext";
import Spinner from "./Spinner";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";

const FeaturedArtworks = () => {
  const { artworks, loading, fetchFeaturedArtworks } = useArtworks();

  useEffect(() => {
    fetchFeaturedArtworks();
  }, [fetchFeaturedArtworks]);

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-purple-50 to-white text-center overflow-hidden">
      {/* Decorative Blurs */}
      <div className="absolute top-10 left-1/3 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-1/3 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3 drop-shadow-md">
          🎨 Featured Artworks
        </h2>
        <p className="text-gray-500 mb-16 text-lg max-w-2xl mx-auto">
          Explore the latest masterpieces from our talented artists worldwide.
        </p>

        {loading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 px-6 md:px-16 max-w-7xl mx-auto">
            {artworks && artworks.length ? (
              artworks.map((art) => {
                const artId = art._id ?? art.id;
                if (!artId) return null;

                return (
                  <motion.div
                    key={artId}
                    whileHover={{ scale: 1.06, y: -5 }}
                    className="group relative bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-2xl rounded-3xl w-72 transition-all duration-300 border border-gray-200 cursor-pointer overflow-hidden"
                  >
                    {/* Artwork image */}
                    <div className="relative w-full h-64 rounded-t-3xl overflow-hidden">
                      <img
                        src={art.image || art.img}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 group-hover:from-black/50 transition duration-500"></div>
                      <div className="absolute bottom-3 right-3 flex items-center gap-2 text-sm text-white">
                        <FaHeart className="text-red-500" />
                        <span>{art.likes ?? art.likesCount ?? 0}</span>
                      </div>
                    </div>

                    {/* Artwork info */}
                    <div className="p-5">
                      <h3 className="font-semibold text-lg mb-1 text-gray-900 truncate">
                        <Link
                          to={`/artworks/${artId}`}
                          className="hover:text-purple-600 transition"
                        >
                          {art.title}
                        </Link>
                      </h3>
                      <p className="text-purple-600 text-sm mb-3 truncate">
                        by{" "}
                        {art.artistName ||
                          art.userName ||
                          art.artist ||
                          "Unknown"}
                      </p>

                      {art.category || art.tag ? (
                        <span className="inline-block text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full mb-3">
                          {art.category || art.tag}
                        </span>
                      ) : null}

                      <div className="flex justify-between items-center mt-5">
                        <Link
                          to={`/artworks/${artId}`}
                          className="text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
                        >
                          View Details
                        </Link>
                        <span className="text-xs text-gray-400">
                          {new Date(art.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <p className="col-span-3 text-center text-gray-500">
                No artworks found.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedArtworks;
