"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Gift, Trophy, Coins, Menu, X, User, LogOut } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { LoginDialog } from "@/components/auth/login-dialog"
import { RegisterDialog } from "@/components/auth/register-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showRegisterDialog, setShowRegisterDialog] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  const handleSwitchToRegister = () => {
    setShowLoginDialog(false)
    setShowRegisterDialog(true)
  }

  const handleSwitchToLogin = () => {
    setShowRegisterDialog(false)
    setShowLoginDialog(true)
  }

  const handleLogout = async () => {
    await logout()
  }

  return (
    <>
      <nav className="bg-card/95 border-b border-border sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center coin-spin">
                <span className="text-primary-foreground font-bold text-lg">🍀</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">O SORTUDO</h1>
                <p className="text-xs text-muted-foreground">Irish Gaming Platform</p>
              </div>
            </Link>

            {/* Desktop Navigation - RillaBox Style */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Gift className="w-4 h-4" />
                  <span>Mystery Boxes</span>
                </Button>
              </Link>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Trophy className="w-4 h-4" />
                <span>Battles</span>
              </Button>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Home className="w-4 h-4" />
                <span>Crash</span>
              </Button>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Coins className="w-4 h-4" />
                <span>Plinko</span>
              </Button>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated && user && (
                <div className="flex items-center space-x-2 bg-secondary/20 px-3 py-1 rounded-full">
                  <Coins className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-medium">{user.balance?.toLocaleString() || 0}</span>
                  <span className="text-xs text-muted-foreground">Local Coins</span>
                </div>
              )}
              <Badge variant="secondary" className="bg-chart-2/20 text-chart-2">
                $10K RACE
              </Badge>

              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                        <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.username}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <User className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <Coins className="w-4 h-4 mr-2" />
                        Balance: {user.balance?.toLocaleString() || 0} coins
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={() => setShowLoginDialog(true)}>
                    Sign In
                  </Button>
                  <Button size="sm" className="glow-effect" onClick={() => setShowRegisterDialog(true)}>
                    Sign Up & Get Free Box
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden border-t border-border bg-card">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link href="/">
                  <Button variant="ghost" className="w-full justify-start">
                    <Gift className="w-4 h-4 mr-2" />
                    Mystery Boxes
                  </Button>
                </Link>
                <Button variant="ghost" className="w-full justify-start">
                  <Trophy className="w-4 h-4 mr-2" />
                  Battles
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="w-4 h-4 mr-2" />
                  Crash
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Coins className="w-4 h-4 mr-2" />
                  Plinko
                </Button>
                <Link href="/dashboard">
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>

                {isAuthenticated && user && (
                  <div className="flex items-center justify-between p-2 bg-secondary/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Coins className="w-4 h-4 text-secondary" />
                      <span className="text-sm font-medium">{user.balance?.toLocaleString() || 0} Local Coins</span>
                    </div>
                  </div>
                )}

                {isAuthenticated && user ? (
                  <>
                    <div className="p-2 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium">{user.username}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent" onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => {
                        setShowLoginDialog(true)
                        setIsMenuOpen(false)
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      className="w-full glow-effect"
                      onClick={() => {
                        setShowRegisterDialog(true)
                        setIsMenuOpen(false)
                      }}
                    >
                      Sign Up & Get Free Box
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <LoginDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        onSwitchToRegister={handleSwitchToRegister}
      />
      <RegisterDialog
        open={showRegisterDialog}
        onOpenChange={setShowRegisterDialog}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  )
}
