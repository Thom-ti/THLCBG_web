import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../layouts/Layout'
import Home from '../pages/Home'
import Boardgames from '../pages/Boardgames'
import MyShelf from '../pages/user/MyShelf'
import HowToPlay from '../pages/HowToPlay'
import Reviews from '../pages/Reviews'
import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'
import PageNotFound from '../pages/PageNotFound'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "boardgames", element: <Boardgames /> },
      { path: "myshelf", element: <MyShelf /> },
      { path: "howtoplay", element: <HowToPlay /> },
      { path: "reviews", element: <Reviews /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
])

const AppRoute = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default AppRoute