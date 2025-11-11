import { createBrowserRouter } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

// Components / Pages
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import ArtworkDetails from "../pages/ArtworkDetails";
import AddArtwork from "../pages/AddArtwork";
import MyGallery from "../pages/MyGallery";
import Favorites from "../pages/Favorites";
import Login from "../pages/Auth/Login";
import Registration from "../pages/Auth/Registration";
import Profile from "../pages/profile";
import UpdateProfile from "../pages/UpdateProfile";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/explore", element: <Explore /> },
      {
        path: "/artworks/:id",
        element: (
          <PrivateRoute>
            <ArtworkDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-artwork",
        element: (
          <PrivateRoute>
            <AddArtwork />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-gallery",
        element: (
          <PrivateRoute>
            <MyGallery />
          </PrivateRoute>
        ),
      },
      {
        path: "/favorites",
        element: (
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-profile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Registration /> },
    ],
  },

  // Catch-all 404
  { path: "*", element: <NotFound /> },
]);

export default router;
