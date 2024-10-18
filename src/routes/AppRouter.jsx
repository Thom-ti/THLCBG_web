import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "../layouts/Layout";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import Home from "../pages/Home";
import Boardgames from "../pages/boardgame/Boardgames";
import MyShelf from "../pages/shelf/MyShelf";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Unauthorization from "../pages/Unauthorization";
import Posts from "../pages/Posts";
import ViewBoardGame from "../pages/boardgame/ViewBoardGame";
import ProtectRoute from "./ProtectRoute";
import Manage from "../pages/admin/Manage";
import useUserStore from "../stores/userStore";

const guestRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "unauthorization", element: <Unauthorization /> },
      { path: "*", element: <Navigate to="/login" /> },
    ],
  },
]);

const userRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectRoute element={<UserLayout />} allow={["ADMIN", "USER"]} />
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "boardgames", element: <Boardgames /> },
      { path: "boardgames/:id", element: <ViewBoardGame /> },
      { path: "myshelf", element: <MyShelf /> },
      { path: "posts", element: <Posts /> },
      { path: "*", element: <Home /> },
    ],
  },
  { path: "unauthorization", element: <Unauthorization /> },
  {
    path: "/admin",
    element: <ProtectRoute element={<AdminLayout />} allow={["ADMIN"]} />,
    children: [
      { index: true, element: <Manage /> },
    ],
  },
]);

const AppRouter = () => {
  const user = useUserStore((state) => state.user);
  const finalRouter = user ? userRouter : guestRouter;
  return <RouterProvider router={finalRouter} />;
};

export default AppRouter;
