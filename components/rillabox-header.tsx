"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { LoginDialog } from "@/components/auth/login-dialog"
import { RegisterDialog } from "@/components/auth/register-dialog"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Gift, Trophy, Gamepad2, Boxes, LogOut, Zap, Menu, X, DollarSign, ShoppingBag, ArrowLeftRight, Target, TrendingUp } from "lucide-react"

export function RillaboxHeader() {
  const { user, isAuthenticated, logout } = useAuth()
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showRegisterDialog, setShowRegisterDialog] = useState(false)
  const [gamesOpen, setGamesOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const gamesCloseRef = useRef<number | null>(null)
  const shopCloseRef = useRef<number | null>(null)

  const openGames = () => {
    if (gamesCloseRef.current) clearTimeout(gamesCloseRef.current)
    setGamesOpen(true)
  }
  const closeGamesDelayed = () => {
    if (gamesCloseRef.current) clearTimeout(gamesCloseRef.current)
    gamesCloseRef.current = window.setTimeout(() => setGamesOpen(false), 120)
  }

  const openShop = () => {
    if (shopCloseRef.current) clearTimeout(shopCloseRef.current)
    setShopOpen(true)
  }
  const closeShopDelayed = () => {
    if (shopCloseRef.current) clearTimeout(shopCloseRef.current)
    shopCloseRef.current = window.setTimeout(() => setShopOpen(false), 120)
  }
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
      <header id="header" className="sticky top-0 z-50 bg-card/95 border-b border-border backdrop-blur-sm relative">
        {/* Absolute logo so nav starts at content edge */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-[180px]">
          <Link href="/" className="inline-flex items-center">
            <img src="/logo/OSORTUDO%20LOGO%201.png" alt="Sortudo" className="h-10 md:h-11 lg:h-12 w-auto object-contain" />
          </Link>
        </div>

        <div className="max-w-6xl mx-auto flex items-center px-4 sm:px-6 lg:px-8 h-16 lg:pl-[205px]">
          {/* Mobile: Sign in and Sign up */}
          <div className="lg:hidden flex items-center ms-auto gap-2 ml-auto">
            {!isAuthenticated ? (
              <>
                <Button variant="outline" size="sm" onClick={() => setShowLoginDialog(true)} className="button-sign-in">Sign in</Button>
                <Button size="sm" onClick={() => setShowRegisterDialog(true)} className="sign-up">
                  <Gift className="w-4 h-4 mr-2" />
                  Sign Up & get Free Box
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center">
                    <Avatar className="w-7 h-7 mr-2">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.username || "User"} />
                      <AvatarFallback>{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user?.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <Button variant="ghost" size="icon" className="ml-1" onClick={() => setMobileMenuOpen(v => !v)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Right: Menu and actions */}
          <div className="flex flex-grow items-center header-rightbox">
            {/* Left-aligned navigation cluster */}
            <div className="flex items-center gap-3 mr-[100px]">
              {/* Desktop Home button */}
              <Link href="/" className="hidden lg:inline-flex items-center justify-center">
                <Button variant="outline" size="icon" className="home-btns home-btn transition hover:-translate-y-[1px] hover:text-[#52CA19] hover:border-[#52CA19]/50 hover:shadow-[0_0_10px_rgba(82,202,25,0.35)]">
                  <Home className="w-4 h-4" />
                </Button>
              </Link>

              {/* Desktop Games dropdown (hover to open, no flicker) */}
              <div className="hidden lg:block relative group">
                <Button variant="outline" className="flex items-center gap-2 transition hover:text-[#52CA19] hover:border-[#52CA19]/50 hover:shadow-[0_0_10px_rgba(82,202,25,0.35)]">
                  <Gamepad2 className="w-4 h-4" />
                  <span>Games</span>
                </Button>
                <div className="absolute left-0 mt-2 min-w-[220px] z-[60] hidden group-hover:block rounded-md border border-border bg-card shadow-md p-1">
                  <Link href="/boxes" className="cursor-pointer flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-sm">
                    <Boxes className="w-4 h-4" />
                    <span>Mystery Boxes</span>
                  </Link>
                  <Link href="/battles" className="cursor-pointer flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-sm">
                    <Target className="w-4 h-4" />
                    <span>Find the Prize</span>
                  </Link>
                  <Link href="/crash" className="cursor-pointer flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>Soccer Game</span>
                  </Link>
                  <Link href="/plinko" className="cursor-pointer flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-sm">
                    <Zap className="w-4 h-4" />
                    <span>Chicken Road</span>
                  </Link>
                </div>
              </div>

              {/* Earn to Play (was Rewards) */}
              <Link href="/reward" className="inline-flex">
                <Button variant="outline" className="flex items-center gap-2 transition hover:-translate-y-[1px] hover:text-[#52CA19] hover:border-[#52CA19]/50 hover:shadow-[0_0_10px_rgba(82,202,25,0.35)]">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-white">Earn to Play</span>
                </Button>
              </Link>

              {/* Shop dropdown: Buy / Trade (hover to open) */}
              <div className="hidden lg:block relative group">
                <Button variant="outline" className="flex items-center gap-2 transition hover:text-[#52CA19] hover:border-[#52CA19]/50 hover:shadow-[0_0_10px_rgba(82,202,25,0.35)]">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop</span>
                </Button>
                <div className="absolute left-0 mt-2 min-w-[200px] z-[60] hidden group-hover:block rounded-md border border-border bg-card shadow-md p-1">
                  <Link href="/shop/buy" className="cursor-pointer flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-sm">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Buy</span>
                  </Link>
                  <Link href="/shop/trade" className="cursor-pointer flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-sm">
                    <ArrowLeftRight className="w-4 h-4" />
                    <span>Trade</span>
                  </Link>
                </div>
              </div>

              {/* Weekly race banner */}
              <Link href="/weekly-race" title="10k Race" className="hidden lg:flex items-center overflow-hidden flex-shrink-0 px-3 py-2 rounded-md bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">
                <Trophy className="w-5 h-5 text-amber-700 mr-2" />
                <div className="flex items-center gap-2">
                  <span className="text-black font-semibold italic">$10k Race</span>
                  <div className="flex items-center gap-1 text-black">
                    <div className="flex flex-col leading-none items-center">
                      <span className="font-bold">{timeLeft.days.toString().padStart(2, "0")}</span>
                      <span className="text-[10px]">D</span>
                    </div>
                    <span>:</span>
                    <div className="flex flex-col leading-none items-center">
                      <span className="font-bold">{timeLeft.hours.toString().padStart(2, "0")}</span>
                      <span className="text-[10px]">H</span>
                    </div>
                    <span>:</span>
                    <div className="flex flex-col leading-none items-center">
                      <span className="font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</span>
                      <span className="text-[10px]">M</span>
                    </div>
                    <span>:</span>
                    <div className="flex flex-col leading-none items-center">
                      <span className="font-bold">{timeLeft.seconds.toString().padStart(2, "0")}</span>
                      <span className="text-[10px]">S</span>
                    </div>
                  </div>
                </div>
              </Link>

            </div>

            {/* Right-aligned auth cluster */}
            <div className="hidden lg:flex items-center gap-2 ml-auto">
                {!isAuthenticated ? (
                  <>
                    <Button variant="outline" size="sm" className="button-sign-in transition hover:-translate-y-[2px] hover:text-[#52CA19] hover:border-[#52CA19]/50 hover:shadow-[0_0_10px_rgba(82,202,25,0.35)]" onClick={() => setShowLoginDialog(true)}>Sign in</Button>
                    <Button size="sm" className="sign-up transition text-white hover:text-white hover:-translate-y-[1px] hover:border-[#52CA19]/35 hover:shadow-[0_8px_14px_rgba(82,202,25,0.28)]" onClick={() => setShowRegisterDialog(true)}>
                      <Gift className="w-4 h-4 mr-2" />
                      Sign Up and get Free Box
                    </Button>
                  </>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center space-x-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.username || "User"} />
                          <AvatarFallback>{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user?.username}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="cursor-pointer">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            {/* Overlay when dropdown is open */}
            {gamesOpen && <div className="dropdown-overlay fixed inset-0 z-40" onClick={() => setGamesOpen(false)} />}
          </div>

          {/* Mobile expanded menu (optional quick links) */}
          {mobileMenuOpen && (
            <div className="lg:hidden w-full mt-3">
              <div className="grid grid-cols-3 gap-2">
                <Link href="/boxes"><Button variant="outline" className="w-full">Mystery Boxes</Button></Link>
                <Link href="/battles"><Button variant="outline" className="w-full">Find the Prize</Button></Link>
                <Link href="/crash"><Button variant="outline" className="w-full">Soccer Game</Button></Link>
              </div>
            </div>
          )}
        </div>
      </header>

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