import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios"

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

let isRefreshing = false
type RetryableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean }

type FailedQueueItem = {
  resolve: (value: unknown) => void
  reject: (reason?: unknown) => void
  config: RetryableRequestConfig
}

let failedQueue: FailedQueueItem[] = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      if (token) prom.config.headers.Authorization = `Bearer ${token}`
      prom.resolve(api(prom.config))
    }
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    const axiosError = error as AxiosError
    const originalRequest = axiosError.config as RetryableRequestConfig | undefined

    if (
      axiosError.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      const refreshToken = localStorage.getItem("refresh_token")
      if (!refreshToken) return Promise.reject(axiosError)

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const resp = await authService.refresh(refreshToken)
        const newAccess = resp.data?.access_token
        const newRefresh = resp.data?.refresh_token

        if (newAccess) {
          localStorage.setItem("auth_token", newAccess)
          api.defaults.headers.common.Authorization = `Bearer ${newAccess}`
        }
        if (newRefresh) {
          localStorage.setItem("refresh_token", newRefresh)
        }

        processQueue(null, newAccess || null)
        return api(originalRequest)
      } catch (err) {
        processQueue(err, null)
        localStorage.removeItem("auth_token")
        localStorage.removeItem("refresh_token")
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(axiosError)
  },
)

export const api_routes = {
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    logout: "/api/auth/logout",
    refresh: "/api/auth/refresh",
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
  refresh: (refreshToken: string) =>
    api.post<AuthResponse>(api_routes.auth.refresh, { refreshToken }),
}

export const viagemService = {
  findAll: () => api.get<Trip[]>(api_routes.viagens),
  findById: (id: number) => api.get<Trip>(`${api_routes.viagens}/${id}`),
  create: (data: TripRequest) => api.post<Trip>(api_routes.viagens, data),
  update: (id: number, data: TripRequest) =>
    api.put<Trip>(`${api_routes.viagens}/${id}`, data),
  delete: (id: number) => api.delete(`${api_routes.viagens}/${id}`),
}
