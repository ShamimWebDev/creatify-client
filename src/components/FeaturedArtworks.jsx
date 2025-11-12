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
    <section className="py-16 bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-3 tracking-wide">🎨 Featured Artworks</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Discover the latest masterpieces from our talented artists
        </p>
      </div>

      {loading ? (
        <div className="text-center">
          <Spinner />
        </div>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 px-6 md:px-16 max-w-7xl mx-auto">
          {artworks && artworks.length ? (
            artworks.map((art, i) => {
              const artId = art._id ?? art.id;
              if (!artId) return null;

              return (
                <motion.div
                  key={artId}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-800"
                >
                  <div className="relative group">
                    <img
                      src={art.image || art.img}
                      alt={art.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-500"></div>

                    <div className="absolute bottom-3 right-3 flex items-center gap-2 text-sm text-white">
                      <FaHeart className="text-red-500" />
                      <span>{art.likes ?? art.likesCount ?? 0}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold text-lg mb-1">
                      <Link
                        to={`/artworks/${artId}`}
                        className="hover:text-purple-400 transition"
                      >
                        {art.title}
                      </Link>
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">
                      by {art.artistName || art.userName || art.artist || "Unknown"}
                    </p>

                    {art.category || art.tag ? (
                      <span className="inline-block text-xs px-3 py-1 bg-purple-700/20 text-purple-400 rounded-full">
                        {art.category || art.tag}
                      </span>
                    ) : null}

                    <div className="flex justify-between items-center mt-5">
                      <Link
                        to={`/artworks/${artId}`}
                        className="text-sm font-medium bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-all duration-200"
                      >
                        View Details
                      </Link>
                      <span className="text-xs text-gray-500">
                        {new Date(art.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <p className="col-span-3 text-center text-gray-500">No artworks found.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default FeaturedArtworks;
