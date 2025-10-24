"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { Loader2 } from "lucide-react"

interface RegisterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSwitchToLogin: () => void
}

export function RegisterDialog({ open, onOpenChange, onSwitchToLogin }: RegisterDialogProps) {
  const { register, isLoading, error, clearError } = useAuth()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    if (formData.password !== formData.confirmPassword) {
      return
    }

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
      onOpenChange(false)
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
    } catch (error) {
      // Error is handled by the store
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[640px] bg-card border-border p-0 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Top brand header to match LoginDialog */}
        <div className="relative rounded-t-2xl bg-gradient-to-b from-emerald-500 to-emerald-700 px-6 py-6 text-white overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[url('/new/rainbow.png')] bg-cover bg-right opacity-20"></div>
          <div className="flex items-center justify-center relative">
            <img
              src="/logo/OSORTUDO%20LOGO%201.png"
              alt="Sortudo Logo"
              className="h-16 md:h-20 object-contain"
            />
          </div>
          <img src="/new/coin.png" alt="Pot of gold" className="pointer-events-none absolute -bottom-3 -left-3 w-20 md:w-28 opacity-70 drop-shadow-xl" />
          <img src="/new/coin.png" alt="Pot of gold" className="pointer-events-none absolute -bottom-3 -right-3 w-20 md:w-28 opacity-70 drop-shadow-xl" />
          <p className="mt-2 text-sm/6 text-center relative">Create your account</p>
        </div>

        <DialogHeader className="px-6 pt-5">
          <DialogTitle className="sr-only">Join O Sortudo</DialogTitle>
          <DialogDescription className="text-muted-foreground">Fill the details below</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-3 px-6 pb-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="lucky_player"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                disabled={isLoading}
                className="h-11 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-email">Email</Label>
              <Input
                id="reg-email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isLoading}
                className="h-11 rounded-xl"
              />
            </div>

            

            <div className="space-y-2">
              <Label htmlFor="reg-password">Password</Label>
              <Input
                id="reg-password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                disabled={isLoading}
                className="h-11 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                disabled={isLoading}
                className="h-11 rounded-xl"
              />
              {formData.password !== formData.confirmPassword && formData.confirmPassword && (
                <p className="text-sm text-destructive">Passwords do not match</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 rounded-full text-sm font-semibold"
            disabled={isLoading || formData.password !== formData.confirmPassword}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-primary hover:underline font-medium"
              disabled={isLoading}
            >
              Sign in
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
