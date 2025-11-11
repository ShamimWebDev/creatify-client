import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaSearch, FaTimes } from "react-icons/fa";
import { useArtworks } from "../context/ArtworksContext";
import PageMotion from "../components/PageMotion";

const Explore = () => {
  const { artworks, loading, fetchArtworks } = useArtworks();
  const [query, setQuery] = useState("");
  // initial load: show recent public artworks
  useEffect(() => {
    fetchArtworks({ visibility: "public", sort: "-createdAt" });
  }, [fetchArtworks]);

  // Debounced live search: when user types, trigger search after a short delay.
  useEffect(() => {
    const timer = setTimeout(() => {
      const q = query?.trim();
      // only call if fetchArtworks is available
      if (typeof fetchArtworks === "function") {
        fetchArtworks(
          q
            ? { visibility: "public", search: q, sort: "-createdAt" }
            : { visibility: "public", sort: "-createdAt" }
        );
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query, fetchArtworks]);

  const handleSearch = (e) => {
    e?.preventDefault();
    const q = query?.trim();
    fetchArtworks(
      q
        ? { visibility: "public", search: q, sort: "-createdAt" }
        : { visibility: "public", sort: "-createdAt" }
    );
  };

  // helper to highlight query matches in displayed text
  const highlightMatch = (text = "") => {
    const q = (query || "").trim();
    if (!q) return text;
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = String(text).split(new RegExp(`(${escaped})`, "ig"));
    return parts.map((part, i) =>
      part.toLowerCase() === q.toLowerCase() ? (
        <span key={i} className="font-semibold bg-white/20 px-0.5 rounded">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <PageMotion className="p-6 min-h-screen bg-linear-to-br from-[#1e1b4b] via-[#4c1d95] to-[#831843]">
      <h2 className="text-3xl font-extrabold text-white mb-6 text-center">
        Explore Artworks
      </h2>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="mb-8 max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-xl p-4 flex flex-col sm:flex-row items-center gap-3 shadow-md"
        aria-label="Search artworks"
      >
        <div className="relative flex-1 w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70">
            <FaSearch />
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or artist"
            aria-label="Search by title or artist"
            className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                handleSearch();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}
        </div>

        <div className="flex gap-2 mt-2 sm:mt-0">
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 rounded-lg text-white font-semibold hover:bg-purple-700 transition"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              handleSearch();
            }}
            className="px-4 py-2 bg-white/20 rounded-lg text-white font-semibold hover:bg-white/30 transition"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Artworks Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-white/5 rounded-2xl p-4 h-72 flex flex-col"
            >
              <div className="bg-white/10 rounded-lg h-40 mb-3" />
              <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
              <div className="h-3 bg-white/10 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(artworks || []).length === 0 ? (
            <div className="col-span-full text-center text-white/60 mt-10">
              No artworks found.
            </div>
          ) : (
            artworks.map((a) => {
              const artId = a._id ?? a.id;
              if (!artId) return null;
              return (
                <div
                  key={artId}
                  className="bg-white/10 hover:bg-white/20 transition p-4 rounded-2xl flex flex-col shadow-md"
                >
                  {a.image ? (
                    <img
                      src={a.image}
                      alt={a.title}
                      className="w-full h-48 object-cover rounded-lg mb-3"
                    />
                  ) : (
                    <div className="w-full h-48 bg-white/10 rounded-lg flex items-center justify-center text-white/50">
                      No image
                    </div>
                  )}

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg truncate text-white">
                      {highlightMatch(a.title)}
                    </h3>
                    <p className="text-sm text-white/70 truncate">
                      {highlightMatch(
                        a.artistName || a.userName || a.artist || "Unknown"
                      )}
                    </p>
                    {a.category && (
                      <span className="inline-block mt-2 text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                        {a.category}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-white/70 flex items-center gap-2">
                      <FaHeart className="text-pink-400" />
                      <span>{a.likes ?? a.likesCount ?? 0}</span>
                    </div>
                    <Link
                      to={`/artworks/${artId}`}
                      className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </PageMotion>
  );
};

export default Explore;
