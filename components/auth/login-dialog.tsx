"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { Loader2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

interface LoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSwitchToRegister: () => void
}

export function LoginDialog({ open, onOpenChange, onSwitchToRegister }: LoginDialogProps) {
  const { login, isLoading, error, clearError } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    try {
      await login(formData)
      onOpenChange(false)
      setFormData({ email: "", password: "" })
    } catch (error) {
      // Error is handled by the store
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px] bg-card border-border p-0 rounded-2xl shadow-2xl">
        {/* Top brand header to match RillaBox layout */}
        <div className="relative rounded-t-2xl bg-gradient-to-b from-emerald-500 to-emerald-700 px-6 py-6 text-white overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[url('/new/rainbow.png')] bg-cover bg-right opacity-20"></div>
          <div className="flex items-center justify-center relative">
            <img
              src="/logo/OSORTUDO%20LOGO%201.png"
              alt="Sortudo Logo"
              className="h-14 md:h-16 object-contain"
            />
          </div>
          <img src="/new/mascot2.png" alt="Mascot" className="pointer-events-none absolute -bottom-3 -right-3 w-24 md:w-32 opacity-40" />
          <p className="mt-2 text-sm/6 text-center relative">Welcome back! 👋</p>
        </div>

        <DialogHeader className="px-6 pt-5">
          <DialogTitle className="sr-only">Welcome Back</DialogTitle>
          <DialogDescription className="text-muted-foreground">Please sign in to your account below</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-3 px-6 pb-6">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs">Username or Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Username or Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isLoading}
                className="h-11 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  disabled={isLoading}
                  className="h-11 rounded-xl pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="flex justify-end">
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
            </div>
          </div>

          <Button type="submit" className="mt-4 w-full h-11 rounded-full text-sm font-semibold uppercase" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Login"
            )}
          </Button>

          <div className="mt-3 text-center text-sm text-muted-foreground">
            New to O Sortudo? {" "}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-primary hover:underline font-medium"
              disabled={isLoading}
            >
              Create an account
            </button>
          </div>

          <div className="mt-4">
            <div className="text-center text-xs text-muted-foreground mb-2">Or Continue With</div>
            <div className="grid grid-cols-3 gap-3">
              <Button type="button" variant="outline" className="h-10 rounded-xl flex items-center justify-center gap-2 group hover:shadow-lg hover:shadow-[#52CA19]/25 transition-all">
                <span className="w-7 h-7 rounded-full bg-[#1877F2] text-white grid place-items-center group-hover:brightness-110 group-hover:scale-105 transition-transform">
                  <img src="https://rillabox.com/icons/facebook.svg" alt="Facebook" className="h-3.5 w-3.5" loading="lazy" decoding="async" />
                </span>
                <span>Facebook</span>
              </Button>
              <Button type="button" variant="outline" className="h-10 rounded-xl flex items-center justify-center gap-2 group hover:shadow-lg hover:shadow-[#52CA19]/25 transition-all">
                <span className="w-7 h-7 rounded-full bg-white text-[#4285F4] grid place-items-center group-hover:brightness-110 group-hover:scale-105 transition-transform">
                  <img src="https://rillabox.com/icons/google-icon.svg" alt="Google" className="h-3.5 w-3.5" loading="lazy" decoding="async" />
                </span>
                <span>Google</span>
              </Button>
              <Button type="button" variant="outline" className="h-10 rounded-xl flex items-center justify-center gap-2 group hover:shadow-lg hover:shadow-[#52CA19]/25 transition-all">
                <span className="w-7 h-7 rounded-full bg-black text-white grid place-items-center group-hover:brightness-110 group-hover:scale-105 transition-transform">
                  <img src="https://rillabox.com/icons/twitter-icon.svg" alt="Twitter" className="h-3.5 w-3.5" loading="lazy" decoding="async" />
                </span>
                <span>Twitter</span>
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
