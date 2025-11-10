"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Gift, Trophy, Coins, Menu, X, User, LogOut, ShoppingCart, ArrowLeftRight, Boxes, Target, Egg, DollarSign, ShoppingBag, ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { LoginDialog } from "@/components/auth/login-dialog"
import { RegisterDialog } from "@/components/auth/register-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mobileGamesOpen, setMobileGamesOpen] = useState(false)
  const [mobileShopOpen, setMobileShopOpen] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showRegisterDialog, setShowRegisterDialog] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const [shopOpen, setShopOpen] = useState(false)

  // Weekly race countdown to end of Sunday (local time)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const getNextWeeklySundayEnd = (now: Date) => {
      const end = new Date(now)
      const day = now.getDay() // 0 = Sunday
      const daysToSunday = (7 - day) % 7
      end.setDate(now.getDate() + daysToSunday)
      end.setHours(23, 59, 59, 999)
      if (end.getTime() <= now.getTime()) {
        end.setDate(end.getDate() + 7)
      }
      return end
    }

    let target = getNextWeeklySundayEnd(new Date())

    const update = () => {
      const now = new Date()
      if (target.getTime() - now.getTime() <= 0) {
        target = getNextWeeklySundayEnd(now)
      }
      const diff = target.getTime() - now.getTime()
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      setTimeLeft({ days, hours, minutes, seconds })
    }

    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  // Listen for bottom nav "Games" tab across pages
  useEffect(() => {
    const openHandler = () => setMobileGamesOpen(true)
    const closeHandler = () => setMobileGamesOpen(false)
    window.addEventListener("open-games-menu", openHandler as EventListener)
    window.addEventListener("close-games-menu", closeHandler as EventListener)
    return () => {
      window.removeEventListener("open-games-menu", openHandler as EventListener)
      window.removeEventListener("close-games-menu", closeHandler as EventListener)
    }
  }, [])

  // Auto-close mobile games overlay when the route changes (e.g., bottom nav navigation)
  const pathname = usePathname()
  useEffect(() => {
    if (mobileGamesOpen) {
      setMobileGamesOpen(false)
    }
  }, [pathname])

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
                      <Link href="/" className="cursor-pointer flex items-center gap-3 w-full">
                        <ShoppingCart className="w-5 h-5" />
                         <span>Buy</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="px-4 py-3 text-base">
                      <Link href="/" className="cursor-pointer flex items-center gap-3 w-full">
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
                      <Link href="/" className="cursor-pointer w-full">Buy</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/" className="cursor-pointer w-full">Trade</Link>
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

      {/* Mobile full-screen Games menu (used on pages with Navigation header) */}
      {mobileGamesOpen && (
        <>
          <div className="fixed inset-0 bg-black/20 z-[60] md:hidden" onClick={() => setMobileGamesOpen(false)} />
          <aside className="fixed inset-0 h-full w-full bg-card/95 backdrop-blur-sm z-[65] md:hidden shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <Link href="/" className="inline-flex items-center">
                <img src="/logo/OSORTUDO%20LOGO%201.png" alt="Sortudo" className="h-6 w-auto object-contain" />
              </Link>
              <div className="flex items-center gap-2">
                {!isAuthenticated ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 px-2 text-xs rounded-md leading-none"
                      onClick={() => setShowLoginDialog(true)}
                    >
                      Sign in
                    </Button>
                    <Button
                      size="sm"
                      className="h-7 px-2.5 text-xs rounded-md leading-none whitespace-nowrap bg-gradient-to-r from-yellow-400 to-yellow-600 text-black"
                      onClick={() => setShowRegisterDialog(true)}
                    >
                      Sign Up & get Free Box
                    </Button>
                  </>
                ) : null}
                <Button variant="ghost" size="icon" onClick={() => setMobileGamesOpen(false)} aria-label="Close menu">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="px-4 pt-3.5 pb-3.5 overflow-y-auto h-[calc(100vh-64px)]">
              <div className="grid grid-cols-1">
                <Link href="/boxes" className="block"><Button variant="outline" className="w-full justify-start min-h-[56px] px-4 py-4 rounded-2xl bg-card text-foreground hover:bg-accent hover:text-accent-foreground border-border mb-3.5"><Boxes className="w-5 h-5 mr-2" />Mystery Boxes</Button></Link>
                <Link href="#" className="block"><Button variant="outline" className="w-full justify-start min-h-[56px] px-4 py-4 rounded-2xl bg-card text-foreground hover:bg-accent hover:text-accent-foreground border-border mb-3.5"><Target className="w-5 h-5 mr-2" />Find the Prize</Button></Link>
                <Button
                  variant="outline"
                  className="w-full justify-between min-h-[56px] px-4 py-4 rounded-2xl bg-card text-foreground hover:bg-accent hover:text-accent-foreground border-border mb-3.5"
                  onClick={() => setMobileGamesOpen(false)}
                >
                  <span className="flex items-center"><img src="/new/soccer2.png" alt="Soccer" className="w-5 h-5 mr-2 object-contain" />Soccer Game</span>
                  <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-muted text-muted-foreground">Coming Soon</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-between min-h-[56px] px-4 py-4 rounded-2xl bg-card text-foreground hover:bg-accent hover:text-accent-foreground border-border mb-3.5"
                  onClick={() => setMobileGamesOpen(false)}
                >
                  <span className="flex items-center"><Egg className="w-5 h-5 mr-2" />Chicken Road</span>
                  <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-muted text-muted-foreground">Coming Soon</span>
                </Button>
                <Link href="/earn" className="block"><Button variant="outline" className="w-full justify-start min-h-[56px] px-4 py-4 rounded-2xl bg-card text-foreground hover:bg-accent hover:text-accent-foreground border-border mb-3.5"><DollarSign className="w-5 h-5 mr-2" />Earn to Play</Button></Link>

                {/* Shop collapsible */}
                <button
                  type="button"
                  className="w-full flex items-center justify-between rounded-2xl bg-card border border-border px-4 py-4 text-sm hover:bg-accent hover:text-accent-foreground transition-colors min-h-[56px] mb-3.5"
                  onClick={() => setMobileShopOpen((v) => !v)}
                  aria-expanded={mobileShopOpen}
                >
                  <span className="flex items-center"><Gift className="w-5 h-5 mr-2" />Shop</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${mobileShopOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileShopOpen && (
                  <div className="pl-6 border-l border-border ml-2">
                    <Link href="#" className="block">
                      <Button variant="ghost" className="w-full justify-start rounded-xl px-4 py-2.5 mb-3.5">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Buy
                      </Button>
                    </Link>
                    <Link href="#" className="block">
                      <Button variant="ghost" className="w-full justify-start rounded-xl px-4 py-2.5 mb-3.5">
                        <ArrowLeftRight className="w-4 h-4 mr-2" />
                        Trade
                      </Button>
                    </Link>
                  </div>
                )}

                {/* Weekly Race 10k banner (mobile) */}
                <Link href="/weekly-race" title="$10k Race" className="block">
                  <div className="flex group items-center overflow-hidden flex-shrink-0 w-full px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#fed81f] to-[#e67d00] border-2 border-[#e67d00] transition-all duration-300">
                  <Trophy className="w-5 h-5 text-amber-700 mr-2 group-hover:animate-bounce" />
                  <div className="flex items-center gap-2 w-full justify-between">
                    <span className="text-white font-semibold not-italic">$10k Race</span>
                    <div className="flex items-center gap-1 text-white">
                      {[
                        { label: 'D', value: timeLeft.days },
                        { label: 'H', value: timeLeft.hours },
                        { label: 'M', value: timeLeft.minutes },
                        { label: 'S', value: timeLeft.seconds },
                      ].map((b) => (
                        <div key={b.label} className="flex flex-col items-center">
                          <span className="px-1.5 py-1 rounded-md bg-black/30 border border-white/10 text-white font-bold text-[12px] min-w-[28px] text-center">{b.value.toString().padStart(2, '0')}</span>
                          <span className="text-white/80 text-[10px] mt-1">{b.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  </div>
                </Link>
              </div>
            </div>
          </aside>
        </>
      )}

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
