import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiImage, FiUpload } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";
import { useArtworks } from "../context/ArtworksContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AddArtwork = () => {
  const { user } = useContext(AuthContext); // ✅ fixed
  const { createArtwork } = useArtworks(); // ✅ use correct function
  const navigate = useNavigate();

  const [form, setForm] = useState({
    image: "",
    title: "",
    category: "",
    medium: "",
    description: "",
    dimensions: "",
    price: "",
    visibility: "public",
  });

  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imgError, setImgError] = useState("");
  const [descCount, setDescCount] = useState(0);

  useEffect(() => {
    if (form.image) setPreviewUrl(form.image);
  }, [form.image]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "image") {
      setPreviewUrl(value);
      setImgError("");
    }
    if (name === "description") setDescCount(value.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("⚠️ Please login first to add artwork.");
      return;
    }

    if (!form.image || !form.title) {
      toast.error("Please provide at least an image URL and title.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...form,
        artistName: user?.displayName,
        artistEmail: user?.email,
        userName: user?.displayName,
        userEmail: user?.email,
        price: form.price ? Number(form.price) : undefined,
        likes: 0,
        favorites: [],
      };

      const created = await createArtwork(payload);
      toast.success("✨ Artwork added successfully!");

      // Reset form
      setForm({
        image: "",
        title: "",
        category: "",
        medium: "",
        description: "",
        dimensions: "",
        price: "",
        visibility: "public",
      });
      setPreviewUrl("");
      setDescCount(0);

      const id = created?._id ?? created?.id;
      if (id) navigate(`/artworks/${id}`);
    } catch (err) {
      console.error("AddArtwork Error:", err);
      toast.error(err.message || "Failed to add artwork.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e1b4b] via-[#4c1d95] to-[#831843] p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl p-8 bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl text-white"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent">
            Add Your Artwork
          </h2>
          <p className="text-white/70 mt-2">
            Share your masterpiece with the world 🌎
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-3 gap-8 items-start"
        >
          {/* IMAGE PREVIEW SECTION */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="md:col-span-1 space-y-3"
          >
            <label className="text-sm text-white/80">Preview</label>
            <div className="w-full h-72 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden transition-all hover:border-purple-400">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="art preview"
                  className="w-full h-full object-cover"
                  onError={() => {
                    console.warn("Invalid image URL:", previewUrl);
                    setImgError("Invalid image URL");
                    setPreviewUrl("");
                  }}
                />
              ) : (
                <div className="text-center text-white/70 px-4">
                  <FiImage className="text-5xl mx-auto mb-3 opacity-60" />
                  <p>Paste an image URL to preview</p>
                </div>
              )}
            </div>
            {imgError && <p className="text-xs text-red-400">{imgError}</p>}
            <p className="text-xs text-white/60">
              Tip: Use high-quality landscape images (3:2 ratio).
            </p>
          </motion.div>

          {/* FORM FIELDS */}
          <div className="md:col-span-2 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <input
                value={user?.displayName || ""}
                disabled
                placeholder="Your Name"
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 text-white/90 border border-white/20"
              />
              <input
                value={user?.email || ""}
                disabled
                placeholder="Your Email"
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 text-white/90 border border-white/20"
              />
            </div>

            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-purple-400 transition"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:border-pink-400 transition"
                required
              />

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-white text-gray-800 border border-white/20 focus:border-pink-400 transition"
              >
                <option value="">Select category</option>
                <option>Landscape</option>
                <option>Portrait</option>
                <option>Abstract</option>
                <option>Still Life</option>
                <option>Digital</option>
                <option>Other</option>
              </select>
            </div>

            <input
              name="medium"
              value={form.medium}
              onChange={handleChange}
              placeholder="Medium / Tools (e.g. Oil, Digital, Acrylic)"
              className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:border-purple-400 transition"
            />

            <div>
              <label className="text-sm text-white/80 mb-1 block">
                Description{" "}
                <span className="text-xs text-white/60">
                  ({descCount}/1000)
                </span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your artwork..."
                rows={5}
                maxLength={1000}
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:border-purple-400 transition"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <input
                name="dimensions"
                value={form.dimensions}
                onChange={handleChange}
                placeholder="Dimensions"
                className="px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:border-pink-400 transition"
              />
              <input
                name="price"
                type="number"
                min="0"
                value={form.price}
                onChange={handleChange}
                placeholder="Price (optional)"
                className="px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:border-pink-400 transition"
              />
              <select
                name="visibility"
                value={form.visibility}
                onChange={handleChange}
                className="px-4 py-2.5 rounded-lg bg-white text-gray-800 border border-white/20 focus:border-purple-400 transition"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-white/70">
                Public artworks are featured on the Explore page.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold shadow-lg hover:from-purple-600 hover:to-pink-600 transition"
              >
                <FiUpload className="text-lg" />
                {loading ? "Uploading..." : "Add Artwork"}
              </motion.button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddArtwork;
