import { Outlet } from "react-router-dom"

import DashboardProvider from "../../contexts/dashboard-context"
import AuthProvider from "../../contexts/auth-context"

import ProtectedRoute from "../auth/protected-route"

export default function DashboardLayout() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <DashboardProvider>
          <Outlet />
        </DashboardProvider>
      </ProtectedRoute>
    </AuthProvider>
  )
}
