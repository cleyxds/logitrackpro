export const routes = {
  "landing-page": "/",
  auth: {
    base: "/auth",
    login: "/auth/login",
    register: "/auth/register",
  },
  dashboard: "/dashboard",
  viagens: {
    base: "/dashboard/viagens",
    new: "/dashboard/viagens/new",
  },
} as const
