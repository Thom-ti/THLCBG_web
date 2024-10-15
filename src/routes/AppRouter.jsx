import React from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Layout from '../layouts/Layout'
import UserLayout from '../layouts/UserLayout'
import Home from '../pages/Home'
import Boardgames from '../pages/Boardgames'
import MyShelf from '../pages/user/MyShelf'
import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'
import PageNotFound from '../pages/PageNotFound'
import useUserStore from '../stores/userStore'
import Posts from '../pages/Posts'

const guestRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <Navigate to="/login" /> },
    ],
  },
])

const userRouter = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "boardgames", element: <Boardgames /> },
      { path: "myshelf", element: <MyShelf /> },
      { path: "posts", element: <Posts /> },
      { path: "*", element: <Home /> },
    ],
  },
])

const AppRouter = () => {
  const user = useUserStore((state) => state.user);
  const finalRouter = user ? userRouter : guestRouter;
  return <RouterProvider router={finalRouter} />;
}

export default AppRouter