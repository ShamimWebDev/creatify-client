// src/context/ArtworksContext.jsx
import React, { createContext, useContext, useCallback, useState } from "react";
import api from "../utils/api";

const ArtworksContext = createContext(null);

export const ArtworksProvider = ({ children }) => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all artworks
  const fetchArtworks = useCallback(async (query = {}) => {
    try {
      setLoading(true);
      const data = await api.getArtworks(query);
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

  // Fetch featured artworks
  const fetchFeaturedArtworks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getFeaturedArtworks();
      setArtworks(Array.isArray(data) ? data : []);
      return data;
    } catch (err) {
      console.error("fetchFeaturedArtworks error:", err);
      setArtworks([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single artwork by ID
  const getArtwork = useCallback(async (id) => {
    try {
      const data = await api.getArtworkById(id);
      return data;
    } catch (err) {
      console.error("getArtwork error:", err);
      throw err;
    }
  }, []);

  // Create new artwork
  const createArtwork = useCallback(async (data) => {
    try {
      const newArt = await api.createArtwork(data);
      setArtworks((prev) => [...prev, newArt]);
      return newArt;
    } catch (err) {
      console.error("createArtwork error:", err);
      throw err;
    }
  }, []);

  // Update artwork
  const updateArtwork = useCallback(async (id, data) => {
    try {
      const updated = await api.updateArtwork(id, data);
      setArtworks((prev) =>
        prev.map((a) => (a._id === id || a.id === id ? updated : a))
      );
      return updated;
    } catch (err) {
      console.error("updateArtwork error:", err);
      throw err;
    }
  }, []);

  // Delete artwork
  const deleteArtwork = useCallback(async (id) => {
    try {
      await api.deleteArtwork(id);
      setArtworks((prev) => prev.filter((a) => a._id !== id && a.id !== id));
      return true;
    } catch (err) {
      console.error("deleteArtwork error:", err);
      throw err;
    }
  }, []);

  // Like artwork
  const likeArtwork = useCallback(async (id) => {
    try {
      const updated = await api.likeArtwork(id);
      setArtworks((prev) =>
        prev.map((a) => (a._id === id || a.id === id ? updated : a))
      );
      return updated;
    } catch (err) {
      console.error("likeArtwork error:", err);
      throw err;
    }
  }, []);

  // Toggle favorite
  const toggleFavorite = useCallback(async (id, userEmail, action) => {
    try {
      const body = { userEmail, action };
      const updated = await api.toggleFavorite(id, body);
      setArtworks((prev) =>
        prev.map((a) => (a._id === id || a.id === id ? updated : a))
      );
      return updated;
    } catch (err) {
      console.error("toggleFavorite error:", err);
      throw err;
    }
  }, []);

  return (
    <ArtworksContext.Provider
      value={{
        artworks,
        loading,
        fetchArtworks,
        fetchFeaturedArtworks,
        getArtwork,
        createArtwork,
        updateArtwork,
        deleteArtwork,
        likeArtwork,
        toggleFavorite,
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
