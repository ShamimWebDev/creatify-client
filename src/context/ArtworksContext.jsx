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
      const createdResult = await api.createArtwork(payload);
      // server returns Mongo insertOne result { acknowledged, insertedId }
      let created = createdResult;
      if (createdResult && createdResult.insertedId) {
        // fetch the inserted document to have the full artwork object
        created = await api.getArtworkById(createdResult.insertedId);
      }
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
      await api.likeArtwork(id);
      // server returns update result; fetch latest document to update local state
      const updated = await api.getArtworkById(id);
      setArtworks((prev) => prev.map((a) => (a._id === id ? updated : a)));
      return updated;
    } catch (err) {
      console.error("likeArtwork error:", err);
      throw err;
    }
  }, []);

  // toggleFavorite now requires userEmail and action ('add'|'remove') to match server
  const toggleFavorite = useCallback(async (id, userEmail, action = "add") => {
    try {
      await api.toggleFavorite(id, { userEmail, action });
      // fetch latest doc after favorite toggle
      const updated = await api.getArtworkById(id);
      setArtworks((prev) => prev.map((a) => (a._id === id ? updated : a)));
      return updated;
    } catch (err) {
      console.error("toggleFavorite error:", err);
      throw err;
    }
  }, []);

  const updateArtwork = useCallback(async (id, data) => {
    try {
      await api.updateArtwork(id, data);
      // fetch updated document (server returns update result)
      const updated = await api.getArtworkById(id);
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
