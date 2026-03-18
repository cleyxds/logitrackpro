import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"

import Auth from "./components/auth"
import Login from "./components/auth/login"
import Register from "./components/auth/register"
import AuthLayout from "./components/auth/auth-layout"

import Landing from "./components/landing"
import Dashboard from "./components/dashboard"
import DashboardLayout from "./components/dashboard/dashboard-layout"

import { routes } from "./constants/routes"

const router = createBrowserRouter([
  {
    path: routes["landing-page"],
    element: <Landing />,
  },
  {
    path: routes.auth.base,
    element: (
      <AuthLayout>
        <Auth />
      </AuthLayout>
    ),
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
    element: (
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    ),
  },
])

export default function Routes() {
  return <RouterProvider router={router} />
}
