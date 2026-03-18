import AuthProvider from "../../contexts/auth-context"

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return <AuthProvider>{children}</AuthProvider>
}
