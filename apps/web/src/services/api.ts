import axios from "axios"

const API_BASE = import.meta.env.VITE_API_URL

export const api = axios.create({
  baseURL: API_BASE,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const api_routes = {
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    logout: "/api/auth/logout",
  },
  veiculos: "/api/veiculos",
  viagens: "/api/viagens",
  dashboard: "/api/dashboard",
} as const

export const authService = {
  login: (credentials: LoginRequest) =>
    api.post<AuthResponse>(api_routes.auth.login, credentials),
  register: (data: RegisterRequest) =>
    api.post<AuthResponse>(api_routes.auth.register, data),
  logout: () => api.post(api_routes.auth.logout),
}
