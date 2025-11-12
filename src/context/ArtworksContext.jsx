import React, { createContext, useContext, useCallback, useState } from "react";
import api from "../utils/api";

const ArtworksContext = createContext(null);

export const ArtworksProvider = ({ children }) => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all artworks (optional, for other pages)
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

  // ✅ Fetch featured artworks (from your new API)
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

  return (
    <ArtworksContext.Provider
      value={{
        artworks,
        loading,
        fetchArtworks,
        fetchFeaturedArtworks,
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
