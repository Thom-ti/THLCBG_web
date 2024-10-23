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
import ViewBoardGame from "../pages/boardgame/ViewBoardGame";
import MyShelf from "../pages/shelf/MyShelf";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Posts from "../pages/post/Posts";
import ViewPost from "../pages/post/ViewPost";
import CreatePost from "../pages/post/CreatePost";
import ProtectRoute from "./ProtectRoute";
import Unauthorization from "../pages/Unauthorization";
import useUserStore from "../stores/userStore";
import AddBoardgame from "../pages/admin/AddBoardgame";
import DeleteBoardgame from "../pages/admin/DeleteBoardgame";

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
      { path: "boardgames/:boardgameId", element: <ViewBoardGame /> },
      { path: "myshelf", element: <MyShelf /> },
      { path: "posts", element: <Posts /> },
      { path: "posts/:postId", element: <ViewPost /> },
      { path: "posts/create-post", element: <CreatePost /> },
      { path: "*", element: <Home /> },
    ],
  },
  {
    path: "/unauthorization",
    element: <UserLayout />,
    children: [
      { index: true, element: <Unauthorization /> },
      { path: "*", element: <Home /> },
    ],
  },
  {
    path: "/admin",
    element: <ProtectRoute element={<AdminLayout />} allow={["ADMIN"]} />,
    children: [
      { index: true, element: <AddBoardgame /> },
      { path: "delete-boardgame", element: <DeleteBoardgame /> },
      { path: "*", element: <Home /> },
    ],
  },
]);

const AppRouter = () => {
  const user = useUserStore((state) => state.user);
  const finalRouter = user ? userRouter : guestRouter;
  return <RouterProvider router={finalRouter} />;
};

export default AppRouter;
