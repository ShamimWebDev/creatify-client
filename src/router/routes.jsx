import { createBrowserRouter } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

// ====
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Auth/Login";
import Registration from "../pages/Auth/Registration";
import Banner from "../components/Banner";
import ArtCard from "../components/ArtCard";
import TopArtists from "../components/TopArtists";
import CommunityHighlights from "../components/CommunityHighlights";
import Profile from "../pages/profile";
import UpdateProfile from "../pages/UpdateProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
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

      //   {
      //     path: "/all-models",
      //     element: <AllModels />,
      //     loader: () => fetch('https://3d-model-server.vercel.app/models')
      //   },
      //   {
      //     path: "/profile",
      //     element: (
      //       <PrivateRoute>
      //         <Profile />
      //       </PrivateRoute>
      //     ),
      //   },
      //   {
      //     path: "/add-model",
      //     element: (
      //       <PrivateRoute>
      //         <AddModel />
      //       </PrivateRoute>
      //     ),
      //   },
      //   {
      //     path: "/model-details/:id",
      //     element: (
      //       <PrivateRoute>
      //         <ModelDetails />
      //       </PrivateRoute>
      //     ),
      //   },

      //    {
      //     path: "/my-models",
      //     element: (
      //       <PrivateRoute>
      //         <MyModels />
      //       </PrivateRoute>
      //     ),
      //   },

      //    {
      //     path: "/my-downloads",
      //     element: (
      //       <PrivateRoute>
      //         <MyDownloads />
      //       </PrivateRoute>
      //     ),
      //   },

      //     {
      //     path: "/update-model/:id",
      //     element: (
      //       <PrivateRoute>
      //         <UpdateModel />
      //       </PrivateRoute>
      //     ),
      //       loader: ({params}) => fetch(`https://3d-model-server.vercel.app/models/${params.id}`)
      //   },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
    ],
  },
]);
