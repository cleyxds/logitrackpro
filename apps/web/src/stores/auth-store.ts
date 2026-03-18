import { createContext } from "react"

import type { UseMutationResult } from "@tanstack/react-query"

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, nome: string) => Promise<void>
  logout: UseMutationResult<void, Error, void, unknown>
  error: string | null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
