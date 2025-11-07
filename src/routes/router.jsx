import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import AllToys from "../pages/AllToys/AllToys";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import SingleToys from "../pages/AllToys/SingleToys";
import Loading from "../pages/Loading/Loading";

import ErrorPage from "../pages/Error/ErrorPage";
import Forget from "../auth/Forget";
// import PriaviteRoute from "../PrivateRoute/privateRoute";
import PrivateRoute from "../PrivateRoute/privateRoute";
import Blog from "../pages/Blog/Blog";
import Contacts from "../pages/Contacts/Contacts";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    hydrateFallbackElement: <Loading />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
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
        path: "/products",
        element: <AllToys />,
      },
      {
        path: "/blog",
        element: (
          <PrivateRoute>
            <Blog/>
          </PrivateRoute>
        ),
      },
      {
        path: "/contacts",
        element: (
          <PrivateRoute>
            <Contacts />
          </PrivateRoute>
        ),
      },
      {
        path: "/products/:id",
        element: (
          <PrivateRoute>
            <SingleToys />
          </PrivateRoute>
        ),
        loader: () => fetch("/toys.json"),
      },
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/forget",
        element: <Forget />,
      },
    ],
  },
]);
