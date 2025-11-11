import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useArtworks } from "../context/ArtworksContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Favorites = () => {
  const { user } = useContext(AuthContext);
  const { fetchArtworks, loading, artworks, toggleFavorite } = useArtworks();
  const [localArts, setLocalArts] = useState([]);

  useEffect(() => {
    let mounted = true;
    if (!user) return;
    fetchArtworks({ favoritesOf: user.email })
      .then((data) => {
        if (mounted) setLocalArts(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error(err));
    return () => (mounted = false);
  }, [user, fetchArtworks]);

  const handleUnfavorite = async (id) => {
    try {
      await toggleFavorite(id);
      toast.success("Updated favorites");
      const data = await fetchArtworks({ favoritesOf: user.email });
      setLocalArts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update favorites");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Favorites</h2>
      {!user ? (
        <div>Please login to view your favorites.</div>
      ) : loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(localArts.length ? localArts : artworks)?.map((a) => {
            const artId = a._id ?? a.id;
            if (!artId) return null;
            return (
              <div key={artId} className="bg-white/5 p-3 rounded">
                <Link to={`/artworks/${artId}`} className="block">
                  <img
                    src={a.image}
                    alt={a.title}
                    className="w-full h-48 object-cover rounded mb-2"
                  />
                  <h3 className="font-semibold">{a.title}</h3>
                </Link>
                <div className="mt-2">
                  <button
                    onClick={() => handleUnfavorite(artId)}
                    className="px-3 py-1 bg-white text-purple-700 border border-purple-500 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favorites;
