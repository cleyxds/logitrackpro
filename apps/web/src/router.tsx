import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"

import Auth from "./components/auth"
import Landing from "./components/landing"
import Login from "./components/login"
import Register from "./components/register"

import { routes } from "./constants/routes"

const router = createBrowserRouter([
  {
    path: routes["landing-page"],
    element: <Landing />,
  },
  {
    path: routes.auth.base,
    element: <Auth />,
    children: [
      {
        index: true,
        element: <Navigate replace to={routes.auth.login} />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: routes.dashboard,
    element: <Landing />,
  },
])

export default function Routes() {
  return <RouterProvider router={router} />
}
