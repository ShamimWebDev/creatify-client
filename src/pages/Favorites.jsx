import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const MyFavorites = () => {
  const { user } = useContext(AuthContext); // current logged-in user
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    const fetchFavorites = async () => {
      try {
        const res = await fetch(`${API_BASE}/artworks`);
        const allArtworks = await res.json();

        // Filter artworks where current user email is in favorites
        const favs = allArtworks.filter((art) =>
          art.favorites?.includes(user.email)
        );
        setFavorites(favs);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  // Remove from favorites
  const handleUnfavorite = async (artworkId) => {
    try {
      const res = await fetch(`${API_BASE}/artworks/${artworkId}/favorite`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: user.email, action: "remove" }),
      });

      if (res.ok) {
        setFavorites(favorites.filter((a) => a._id !== artworkId));
        toast.info("Removed from favorites 💔");
      } else {
        toast.error("Failed to unfavorite");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error removing favorite");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading favorites...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-16">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        ❤️ My Favorites
      </h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No favorite artworks yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {favorites.map((art) => (
            <div
              key={art._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h2 className="font-semibold text-lg text-gray-800">
                  {art.title}
                </h2>
                <p className="text-sm text-gray-500 mb-3">
                  {art.artistName}
                </p>
                <button
                  onClick={() => handleUnfavorite(art._id)}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md"
                >
                  Remove ❤️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFavorites;
