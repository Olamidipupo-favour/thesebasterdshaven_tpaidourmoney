"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Gift, Trophy, Coins, Menu, X, User, LogOut, ShoppingBag, ArrowLeftRight } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { LoginDialog } from "@/components/auth/login-dialog"
import { RegisterDialog } from "@/components/auth/register-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showRegisterDialog, setShowRegisterDialog] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const [shopOpen, setShopOpen] = useState(false)

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
            {/* Logo: Keep wordmark only (mascot moved to hero banner) */}
            <Link href="/" className="flex items-center">
              <img
                src="/logo/OSORTUDO%20LOGO%201.png"
                alt="Sortudo Logo"
                className="h-8 object-contain"
              />
            </Link>

            {/* Desktop Navigation - Shop dropdown with Buy/Trade + Earn to Play (opens on hover) */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Wrap in a hover container so moving from trigger to menu keeps it open */}
              <div onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)} className="relative">
                <DropdownMenu open={shopOpen} onOpenChange={setShopOpen}>
                  {/* Use native trigger to avoid ref warning so dropdown works reliably */}
                  <DropdownMenuTrigger
                    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
                    aria-expanded={shopOpen}
                    onClick={() => setShopOpen(prev => !prev)}
                  >
                    <Gift className="w-4 h-4" />
                    <span>Shop</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    sideOffset={8}
                    className="z-[60] mt-2 min-w-[260px] p-0 rounded-xl overflow-hidden bg-popover shadow-xl border border-border"
                  >
                    <DropdownMenuItem asChild className="px-4 py-3 text-base">
                      <Link href="/shop/buy" className="cursor-pointer flex items-center gap-3 w-full">
                        <ShoppingBag className="w-5 h-5" />
                        <span>Buy</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="px-4 py-3 text-base">
                      <Link href="/shop/trade" className="cursor-pointer flex items-center gap-3 w-full">
                        <ArrowLeftRight className="w-5 h-5" />
                        <span>Trade</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Link href="/earn">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Coins className="w-4 h-4" />
                  <span>Earn to Play</span>
                </Button>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated && user && (
                <div className="flex items-center space-x-2 bg-secondary/20 px-3 py-1 rounded-full">
                  <Coins className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-medium">{user.balance?.toLocaleString() || 0}</span>
                  <span className="text-xs text-muted-foreground">Local Coins</span>
                </div>
              )}
              <Link
                href="/weekly-race"
                className="btn btn-link me-md-auto text-decoration-none d-md-flex d-none position-relative leaderboard-btn"
                title="10k Race"
              >
                <img src="https://rillabox.com/images/race-bg.svg" alt="10k Race" />
              </Link>

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
                {/* Mobile: Shop dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start">
                      <Gift className="w-4 h-4 mr-2" />
                      Shop
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <DropdownMenuItem asChild>
                      <Link href="/shop/buy" className="cursor-pointer w-full">Buy</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/shop/trade" className="cursor-pointer w-full">Trade</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mobile: Earn to Play */}
                <Link href="/earn">
                  <Button variant="ghost" className="w-full justify-start">
                    <Coins className="w-4 h-4 mr-2" />
                    Earn to Play
                  </Button>
                </Link>

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
