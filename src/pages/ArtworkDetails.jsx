import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useArtworks } from "../context/ArtworksContext";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const ArtworkDetails = () => {
  const { id } = useParams();
  const { getArtwork } = useArtworks();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { likeArtwork, toggleFavorite, fetchArtworks } = useArtworks();
  const [artistCount, setArtistCount] = useState(0);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    getArtwork(id)
      .then((data) => {
        if (mounted) setArtwork(data);
      })
      .catch((err) => console.error(err))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [id, getArtwork]);

  // fetch artist total artworks
  useEffect(() => {
    if (!artwork) return;
    const owner = artwork.userEmail || artwork.user_email || artwork.ownerEmail;
    if (!owner) return;
    fetchArtworks({ owner })
      .then((list) => setArtistCount(Array.isArray(list) ? list.length : 0))
      .catch(() => setArtistCount(0));
  }, [artwork, fetchArtworks]);

  if (!id) return <div className="p-6">Invalid artwork id.</div>;
  if (loading) return <div className="p-6">Loading...</div>;
  if (!artwork) return <div className="p-6">Artwork not found.</div>;

  const handleLike = async () => {
    try {
      const updated = await likeArtwork(id);
      // update local artwork if server returned updated likes
      if (updated && updated.likes != null)
        setArtwork((a) => ({ ...a, likes: updated.likes }));
      else setArtwork((a) => ({ ...a, likes: (a.likes || 0) + 1 }));
      toast.success("Liked");
    } catch (err) {
      console.error(err);
      toast.error("Failed to like");
    }
  };

  const handleFavorite = async () => {
    if (!user) return toast.info("Please login to favorite");
    try {
      const updated = await toggleFavorite(id);
      // optimistic update: if server returns favorites info, set it; otherwise toggle boolean
      if (updated && updated.favorites != null)
        setArtwork((a) => ({ ...a, favorites: updated.favorites }));
      toast.success("Toggled favorite");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update favorites");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <img
            src={artwork.image}
            alt={artwork.title}
            className="w-full h-96 object-cover rounded mb-4"
          />
          <h2 className="text-3xl font-bold">{artwork.title}</h2>
          <p className="text-sm text-gray-300">
            By {artwork.artist || artwork.userName}
          </p>
          <p className="mt-4">{artwork.description}</p>
          {artwork.medium && (
            <p className="mt-3 text-sm text-gray-400">
              Medium / Tools: {artwork.medium}
            </p>
          )}
        </div>

        <aside className="md:col-span-1 bg-white/5 p-4 rounded">
          <div className="flex items-center gap-3">
            <img
              src={
                artwork.userPhoto ||
                artwork.userAvatar ||
                artwork.photoURL ||
                "https://via.placeholder.com/80"
              }
              alt={artwork.userName || artwork.artist}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold">
                {artwork.userName || artwork.artist}
              </div>
              <div className="text-sm text-gray-400">
                {artistCount} artworks
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <button
              onClick={handleLike}
              className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded"
            >
              👍 Like {artwork.likes ? `(${artwork.likes})` : ""}
            </button>

            <button
              onClick={handleFavorite}
              className="w-full px-3 py-2 bg-white text-purple-700 rounded border border-purple-500"
            >
              {artwork.favorites &&
              Array.isArray(artwork.favorites) &&
              artwork.favorites.length > 0
                ? "★ Favorited"
                : "☆ Add to Favorites"}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ArtworkDetails;
