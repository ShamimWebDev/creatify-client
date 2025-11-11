import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import AuthProvider from "./context/AuthProvider";
import { ArtworksProvider } from "./context/ArtworksContext";
import { router } from "./router/routes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ArtworksProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ArtworksProvider>
  </StrictMode>
);
