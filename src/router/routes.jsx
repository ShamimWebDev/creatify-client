import { createBrowserRouter } from "react-router";



// import Profile from "../Pages/Profile/Profile";
// import Login from "../Pages/Auth/Login";
// import Register from "../Pages/Auth/Registration";
import PrivateRoute from "./PrivateRoute";
// import AddModel from "../Pages/AddModel/AddModel";
// import ModelDetails from "../Pages/ModelDetails/ModelDetails";
// import UpdateModel from "../Pages/UpdateModel/UpdateModel";
// import MyModels from "../Pages/MyModels/MyModels";
// import MyDownloads from "../Pages/MyDownloads/MyDownloads";
// ====
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Auth/Login";
import Registration from "../pages/Auth/Registration";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
        {
        path: "/",
        element: <Navbar></Navbar>,
       
      },
      {
        path: "/",
        element: <Home />,
       
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
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Registration />,
      },
    ],
  },
]);
