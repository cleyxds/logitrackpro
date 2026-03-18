import DashboardProvider from "../../contexts/dashboard-context"
import AuthProvider from "../../contexts/auth-context"

import ProtectedRoute from "../auth/protected-route"

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <DashboardProvider>{children}</DashboardProvider>
      </ProtectedRoute>
    </AuthProvider>
  )
}
