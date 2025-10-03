"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { authService } from "@/lib/api/services/auth.service"
import type { User, LoginRequest, RegisterRequest } from "@/lib/api/types"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (data: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  clearError: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (data: LoginRequest) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authService.login(data)
          if (response.success && response.data) {
            set({
              user: response.data.user,
              isAuthenticated: true,
              isLoading: false,
            })
          } else {
            throw new Error(response.message || "Login failed")
          }
        } catch (error: any) {
          set({
            error: error.message || "Login failed",
            isLoading: false,
          })
          throw error
        }
      },

      register: async (data: RegisterRequest) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authService.register(data)
          if (response.success && response.data) {
            set({
              user: response.data.user,
              isAuthenticated: true,
              isLoading: false,
            })
          } else {
            throw new Error(response.message || "Registration failed")
          }
        } catch (error: any) {
          set({
            error: error.message || "Registration failed",
            isLoading: false,
          })
          throw error
        }
      },

      logout: async () => {
        set({ isLoading: true })
        try {
          await authService.logout()
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          })
        } catch (error: any) {
          console.error("[v0] Logout error:", error)
          // Clear state anyway
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          })
        }
      },

      refreshUser: async () => {
        if (!authService.isAuthenticated()) {
          return
        }

        try {
          const response = await authService.verify()
          if (!response.success) {
            // Token invalid, logout
            get().logout()
          }
        } catch (error) {
          console.error("[v0] Token verification failed:", error)
          get().logout()
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
