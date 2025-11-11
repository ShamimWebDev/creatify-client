import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import api from "../utils/api";

const ArtworksContext = createContext(null);

export const ArtworksProvider = ({ children }) => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchArtworks = useCallback(async (query = {}) => {
    try {
      setLoading(true);
      const q = query && typeof query === "object" ? query : query || "";
      const data = await api.getArtworks(q);
      setArtworks(Array.isArray(data) ? data : []);
      return data;
    } catch (err) {
      console.error("fetchArtworks error:", err);
      setArtworks([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getArtwork = useCallback(async (id) => {
    try {
      setLoading(true);
      const data = await api.getArtworkById(id);
      return data;
    } catch (err) {
      console.error("getArtwork error:", err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const addArtwork = useCallback(async (payload) => {
    try {
      setLoading(true);
      const created = await api.createArtwork(payload);
      // prepend to local list (if public)
      setArtworks((prev) => (created ? [created, ...prev] : prev));
      return created;
    } catch (err) {
      console.error("addArtwork error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const likeArtwork = useCallback(async (id) => {
    try {
      const updated = await api.likeArtwork(id);
      // update local copy if present
      setArtworks((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, likes: updated.likes ?? (a.likes || 0) } : a
        )
      );
      return updated;
    } catch (err) {
      console.error("likeArtwork error:", err);
      throw err;
    }
  }, []);

  const toggleFavorite = useCallback(async (id) => {
    try {
      const updated = await api.toggleFavorite(id);
      setArtworks((prev) =>
        prev.map((a) =>
          a._id === id
            ? { ...a, favorites: updated.favorites ?? a.favorites }
            : a
        )
      );
      return updated;
    } catch (err) {
      console.error("toggleFavorite error:", err);
      throw err;
    }
  }, []);

  const updateArtwork = useCallback(async (id, data) => {
    try {
      const updated = await api.updateArtwork(id, data);
      setArtworks((prev) => prev.map((a) => (a._id === id ? updated : a)));
      return updated;
    } catch (err) {
      console.error("updateArtwork error:", err);
      throw err;
    }
  }, []);

  const deleteArtwork = useCallback(async (id) => {
    try {
      await api.deleteArtwork(id);
      setArtworks((prev) => prev.filter((a) => a._id !== id));
      return true;
    } catch (err) {
      console.error("deleteArtwork error:", err);
      throw err;
    }
  }, []);

  // initial load
  useEffect(() => {
    fetchArtworks();
  }, [fetchArtworks]);

  return (
    <ArtworksContext.Provider
      value={{
        artworks,
        loading,
        fetchArtworks,
        getArtwork,
        addArtwork,
        likeArtwork,
        toggleFavorite,
        updateArtwork,
        deleteArtwork,
      }}
    >
      {children}
    </ArtworksContext.Provider>
  );
};

export const useArtworks = () => {
  const ctx = useContext(ArtworksContext);
  if (!ctx) throw new Error("useArtworks must be used within ArtworksProvider");
  return ctx;
};

export default ArtworksContext;
