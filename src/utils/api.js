// const API_BASE = import.meta.env.VITE_API_URL || "https://creatify-server./api";
const API_BASE = import.meta.env.VITE_API_URL;

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  if (typeof console !== "undefined" && console.debug) {
    console.debug("[api] request:", { url, options });
  }

  const res = await fetch(url, options);
  if (typeof console !== "undefined" && console.debug) {
    console.debug("[api] response:", { url, status: res.status });
  }

  if (!res.ok) {
    const text = await res.text();
    const msg = text || `Request failed: ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return res.json();
  return res.text();
}

// All artworks (with optional query params)
export const getArtworks = (query = "") => {
  const q = query ? `?${new URLSearchParams(query).toString()}` : "";
  return request(`/artworks${q}`);
};

// Single artwork by ID
export const getArtworkById = (id) => request(`/artworks/${id}`);

// Create new artwork
export const createArtwork = (data) =>
  request(`/artworks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

// Like artwork
export const likeArtwork = (id) =>
  request(`/artworks/${id}/like`, { method: "PATCH" });

// Toggle favorite
export const toggleFavorite = (id, body = {}) =>
  request(`/artworks/${id}/favorite`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

// Update artwork
export const updateArtwork = (id, data) =>
  request(`/artworks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

// Delete artwork
export const deleteArtwork = (id) =>
  request(`/artworks/${id}`, { method: "DELETE" });

// =======================
//Featured artworks
export const getFeaturedArtworks = () => request("/featured");

// =======================
export default {
  getArtworks,
  getArtworkById,
  createArtwork,
  likeArtwork,
  toggleFavorite,
  updateArtwork,
  deleteArtwork,
  getFeaturedArtworks,
};
