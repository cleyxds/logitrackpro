import axios from "axios"

const API_BASE = import.meta.env.VITE_API_URL

export const api = axios.create({
  baseURL: API_BASE,
})

export const api_routes = {
  veiculos: "/api/veiculos",
  viagens: "/api/viagens",
  dashboard: "/api/dashboard",
} as const
