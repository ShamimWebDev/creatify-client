import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useArtworks } from "../context/ArtworksContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const MyGallery = () => {
  const { user } = useContext(AuthContext);
  const { fetchArtworks, loading, artworks, deleteArtwork, updateArtwork } =
    useArtworks();
  const [localArts, setLocalArts] = useState([]);
  const [editingArt, setEditingArt] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    let mounted = true;
    if (!user) return;
    fetchArtworks({ owner: user.email })
      .then((data) => {
        if (mounted) setLocalArts(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error(err));
    return () => (mounted = false);
  }, [user, fetchArtworks]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this artwork?")) return;
    try {
      await fetchArtworks(); // optimistic refresh trigger
      await deleteArtwork(id);
      toast.success("Artwork deleted");
      // refresh
      const data = await fetchArtworks({ owner: user.email });
      setLocalArts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete artwork");
    }
  };

  const openEdit = (art) => {
    setEditingArt(art);
    setEditForm({
      title: art.title || "",
      category: art.category || "",
      medium: art.medium || "",
      description: art.description || "",
      dimensions: art.dimensions || "",
      price: art.price || "",
      visibility: art.visibility || "public",
    });
  };

  const handleEditChange = (e) =>
    setEditForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateArtwork(editingArt._id ?? editingArt.id, editForm);
      toast.success("Artwork updated");
      setEditingArt(null);
      const data = await fetchArtworks({ owner: user.email });
      setLocalArts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update artwork");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Gallery</h2>
      {!user ? (
        <div>Please login to view your gallery.</div>
      ) : loading ? (
        <div>Loading...</div>
      ) : (
        <>
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
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => openEdit(a)}
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(artId)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {editingArt && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50">
              <form
                onSubmit={handleEditSubmit}
                className="bg-white p-6 rounded max-w-xl w-full"
              >
                <h3 className="text-lg font-semibold mb-3">Update Artwork</h3>
                <input
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                  className="w-full mb-2 p-2 border rounded"
                />
                <input
                  name="category"
                  value={editForm.category}
                  onChange={handleEditChange}
                  className="w-full mb-2 p-2 border rounded"
                />
                <input
                  name="medium"
                  value={editForm.medium}
                  onChange={handleEditChange}
                  className="w-full mb-2 p-2 border rounded"
                />
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  className="w-full mb-2 p-2 border rounded"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingArt(null)}
                    className="px-3 py-2 bg-gray-200 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-purple-600 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyGallery;
