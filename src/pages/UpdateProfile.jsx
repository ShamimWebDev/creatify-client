import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import useDocumentTitle from "../hook/useDocumentTitle";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  useDocumentTitle("Update Profile");
  const { user, updateProfileFunc } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name || !photoURL) {
      toast.error("Name and photo URL cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      await updateProfileFunc(name, photoURL);
      toast.success("Profile updated successfully!");
      setLoading(false);
      navigate("/profile"); // Redirect back to profile page
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold text-[#00FFFF] mb-8">Update Information</h1>

      <form
        onSubmit={handleUpdate}
        className="flex flex-col gap-4 bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Update Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <input
          type="text"
          placeholder="Update Photo URL"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-[#4C1D71] to-[#BE21E0] text-white rounded-lg hover:scale-105 transition-all font-semibold"
        >
          {loading ? "Updating..." : "Update Information"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
