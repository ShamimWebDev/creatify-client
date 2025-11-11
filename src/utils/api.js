// Vite exposes env vars via import.meta.env and expects them to be prefixed with VITE_
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  // Diagnostic logging for debugging CRUD/network issues in dev
  // safe debug logging
  if (typeof console !== "undefined" && console.debug) {
    console.debug("[api] request:", { url, options });
  }

  const res = await fetch(url, options);
  if (typeof console !== "undefined" && console.debug) {
    console.debug("[api] response:", { url, status: res.status });
  }
  if (!res.ok) {
    const text = await res.text();
    // include status in thrown error for easier debugging
    const msg = text || `Request failed: ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }
  // some responses may be empty
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return res.json();
  return res.text();
}

export const getArtworks = (query = "") => {
  const q = query ? `?${new URLSearchParams(query).toString()}` : "";
  return request(`/artworks${q}`);
};

export const getArtworkById = (id) => request(`/artworks/${id}`);

export const createArtwork = (data) => {
  return request(`/artworks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const likeArtwork = (id) =>
  request(`/artworks/${id}/like`, {
    method: "PATCH",
  });

export const toggleFavorite = (id) =>
  request(`/artworks/${id}/favorite`, {
    method: "PATCH",
  });

export const updateArtwork = (id, data) =>
  request(`/artworks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export const deleteArtwork = (id) =>
  request(`/artworks/${id}`, { method: "DELETE" });

export default {
  getArtworks,
  getArtworkById,
  createArtwork,
  likeArtwork,
  toggleFavorite,
  updateArtwork,
  deleteArtwork,
};
