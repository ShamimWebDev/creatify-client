import React, { useEffect } from "react";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { useArtworks } from "../context/ArtworksContext";

const ArtCard = () => {
  const { artworks, loading, fetchArtworks } = useArtworks();

  useEffect(() => {
    // ask backend for latest 6 artworks; backend should apply MongoDB sort() and limit()
    fetchArtworks({ sort: "-createdAt", limit: 6 });
  }, [fetchArtworks]);

  const getTimestamp = (x) => {
    if (!x) return 0;
    if (x.createdAt) return new Date(x.createdAt).getTime();
    if (x.created_at) return new Date(x.created_at).getTime();
    if (x._id && typeof x._id === "string" && x._id.length >= 8)
      return parseInt(x._id.substring(0, 8), 16) * 1000;
    return 0;
  };

  const displayed = (artworks || [])
    .slice()
    .sort((a, b) => getTimestamp(b) - getTimestamp(a))
    .slice(0, 6);

  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Featured Artworks</h2>
        <p className="text-gray-500">
          Discover the latest masterpieces from our talented artists
        </p>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 px-10 md:px-24">
          {displayed && displayed.length ? (
            displayed.map((art) => {
              const artId = art._id ?? art.id;
              if (!artId) return null;
              return (
                <div
                  key={artId}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
                >
                  <img
                    src={art.image || art.img}
                    alt={art.title}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="font-semibold text-lg">
                      <Link
                        to={`/artworks/${artId}`}
                        className="hover:underline"
                      >
                        {art.title}
                      </Link>
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">
                      by {art.artistName || art.userName || art.artist}
                    </p>
                    {art.category || art.tag ? (
                      <span className="text-xs px-3 py-1 bg-purple-100 text-purple-600 rounded-full">
                        {art.category || art.tag}
                      </span>
                    ) : null}
                    <div className="flex justify-between items-center mt-4">
                      <Link
                        to={`/artworks/${artId}`}
                        className="inline-block bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-lg"
                      >
                        View Details
                      </Link>
                      <span className="text-gray-400 text-sm">
                        ❤️ {art.likes ?? art.likesCount ?? 0}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-3 text-center text-gray-500">
              No artworks found.
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default ArtCard;
