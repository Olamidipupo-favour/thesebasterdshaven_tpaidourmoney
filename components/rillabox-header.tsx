"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { LoginDialog } from "@/components/auth/login-dialog"
import { RegisterDialog } from "@/components/auth/register-dialog"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { SVGProps } from "react"

function FootballIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8l2.5 1.8-.9 2.8h-3.2l-.9-2.8L12 8z" />
      <path d="M7.3 10.2 5.5 11.4l1.1 2.1 2.1.8" />
      <path d="M16.7 10.2 18.5 11.4l-1.1 2.1-2.1.8" />
    </svg>
  )
}
import { Home, Gift, Trophy, Gamepad2, Boxes, LogOut, Zap, Menu, X, DollarSign, ShoppingBag, ShoppingCart, ArrowLeftRight, Target, Egg, Goal, ChevronDown } from "lucide-react"

export function RillaboxHeader() {
  const { user, isAuthenticated, logout } = useAuth()
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showRegisterDialog, setShowRegisterDialog] = useState(false)
  const [gamesOpen, setGamesOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const gamesCloseRef = useRef<number | null>(null)
  const shopCloseRef = useRef<number | null>(null)
  const [mobileShopOpen, setMobileShopOpen] = useState(false)

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

  // Mobile drawer actions
  const openLiveDropsFromHeader = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-live-drops"))
      setMobileMenuOpen(false)
    }
  }

  // Listen for bottom nav requests to open the Games menu
  useEffect(() => {
    const openGamesHandler = () => setMobileMenuOpen(true)
    // Custom event triggered from mobile bottom nav
    window.addEventListener("open-games-menu", openGamesHandler as EventListener)
    return () => {
      window.removeEventListener("open-games-menu", openGamesHandler as EventListener)
    }
  }, [])

  return (
    <>
      <header id="header" className="sticky top-0 z-50 border-b border-border relative bg-card lg:bg-card/95 lg:backdrop-blur-sm">
        {/* Absolute logo so nav starts at content edge */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-[180px]">
          <Link href="/" className="inline-flex items-center">
            <img src="/logo/OSORTUDO%20LOGO%201.png" alt="Sortudo" className="h-10 md:h-11 lg:h-12 w-auto object-contain" />
          </Link>
        </div>

        <div className="max-w-6xl mx-auto flex items-center px-4 sm:px-6 lg:px-8 h-16 lg:pl-[205px]">
          {/* Mobile: Big logo with compact Sign in / Sign up on right */}
          <div className="lg:hidden flex items-center justify-between w-full">
            {/* Left: Bigger wordmark */}
            <Link href="/" className="inline-flex items-center">
              <img src="/logo/OSORTUDO%20LOGO%201.png" alt="Sortudo" className="h-10 w-auto object-contain" />
            </Link>
            {/* Right: Auth buttons (removed from games menu) */}
            <div className="flex items-center gap-1.5 pl-1">
              {!isAuthenticated ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="button-sign-in h-7 px-2 text-xs rounded-md leading-none"
                    onClick={() => setShowLoginDialog(true)}
                  >
                    Sign in
                  </Button>
                  <Button
                    size="sm"
                    className="sign-up h-7 px-2.5 text-xs rounded-md leading-none whitespace-nowrap"
                    onClick={() => setShowRegisterDialog(true)}
                  >
                    Sign Up & get Free Box
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
          </div>

          {/* Right: Menu and actions */}
          <div className="flex flex-grow items-center header-rightbox relative">
            {/* Left-aligned navigation cluster */}
            <div className="hidden lg:flex items-center gap-3 absolute left-1/2 -translate-x-1/2 -ml-[250px]">
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
                <div aria-hidden className="absolute left-0 top-full w-full h-2"></div>
                <div className="absolute left-0 top-full mt-1 min-w-[220px] z-[60] block opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto rounded-md border border-border bg-card shadow-md p-1 transition-opacity duration-150">
                  <Link href="/boxes" className="cursor-pointer flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-sm">
                    <Boxes className="w-4 h-4" />
                    <span>Mystery Boxes</span>
                  </Link>
                  <Link href="#" className="cursor-pointer flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-sm">
                    <Target className="w-4 h-4" />
                    <span>Find the Prize</span>
                  </Link>
                  <Link href="#" className="cursor-pointer flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-sm">
                    {/* Replace icon with soccer.png */}
                    <img src="/new/soccer2.png" alt="Soccer" className="w-5 h-5 object-contain" />
                    <span>Soccer Game</span>
                  </Link>
                  <Link href="#" className="cursor-pointer flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-sm">
                    <Egg className="w-4 h-4" />
                    <span>Chicken Road</span>
                  </Link>
                </div>
              </div>

              {/* Earn to Play (moved to mobile drawer) */}
              <Link href="/" className="hidden lg:inline-flex">
                <Button variant="outline" className="group flex items-center gap-2 transition hover:-translate-y-[1px] hover:text-[#52CA19] hover:border-[#52CA19]/50 hover:shadow-[0_0_10px_rgba(82,202,25,0.35)]">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-white group-hover:text-[#52CA19]">Earn to Play</span>
                </Button>
              </Link>

              {/* Shop dropdown: Buy / Trade (hover to open) */}
              <div className="hidden lg:block relative group">
                <Button variant="outline" className="flex items-center gap-2 transition hover:text-[#52CA19] hover:border-[#52CA19]/50 hover:shadow-[0_0_10px_rgba(82,202,25,0.35)]">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop</span>
                </Button>
                <div aria-hidden className="absolute left-0 top-full w-full h-2"></div>
                <div className="absolute left-0 top-full mt-1 min-w-[200px] z-[60] block opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto rounded-md border border-border bg-card shadow-md p-1 transition-opacity duration-150">
                  <Link href="/" className="cursor-pointer flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-sm">
                    <ShoppingCart className="w-4 h-4" />
                    <span>Buy</span>
                  </Link>
                  <Link href="/" className="cursor-pointer flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-sm">
                    <ArrowLeftRight className="w-4 h-4" />
                    <span>Trade</span>
                  </Link>
                </div>
              </div>

              {/* Weekly race banner */}
              <Link href="/weekly-race" title="10k Race" className="hidden lg:flex group items-center overflow-hidden flex-shrink-0 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#fed81f] to-[#e67d00] border-4 border-[#e67d00] transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-amber-500/30">
                <Trophy className="w-5 h-5 text-amber-700 mr-2 group-hover:animate-bounce" />
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold not-italic">$10k Race</span>
                  <div className="flex items-center gap-1 text-white">
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

          {/* Mobile full-screen Games menu */}
          {mobileMenuOpen && (
            <>
              <div className="fixed inset-0 bg-black/20 z-[60] lg:hidden" onClick={() => setMobileMenuOpen(false)} />
              <aside className="fixed inset-0 h-full w-full bg-card/95 backdrop-blur-sm z-[65] lg:hidden shadow-xl">
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
                    <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                <div className="px-4 pt-3.5 pb-3.5 overflow-y-auto h-[calc(100vh-64px)]">
                  <div>
                    <Link href="/boxes"><Button variant="outline" className="w-full justify-start min-h-[56px] px-4 py-4 rounded-2xl bg-card text-foreground hover:bg-accent hover:text-accent-foreground border-border mb-3.5"><Boxes className="w-5 h-5 mr-2" />Mystery Boxes</Button></Link>
                    <Link href="#"><Button variant="outline" className="w-full justify-start min-h-[56px] px-4 py-4 rounded-2xl bg-card text-foreground hover:bg-accent hover:text-accent-foreground border-border mb-3.5"><Target className="w-5 h-5 mr-2" />Find the Prize</Button></Link>
                    <Button
                      variant="outline"
                      className="w-full justify-between min-h-[56px] px-4 py-4 rounded-2xl bg-card text-foreground hover:bg-accent hover:text-accent-foreground border-border mb-3.5"
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          window.dispatchEvent(new Event("open-soccer-coming-soon"))
                        }
                        setMobileMenuOpen(false)
                      }}
                    >
                      <span className="flex items-center"><img src="/new/soccer2.png" alt="Soccer" className="w-5 h-5 mr-2 object-contain" />Soccer Game</span>
                      <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-muted text-muted-foreground">Coming Soon</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-between min-h-[56px] px-4 py-4 rounded-2xl bg-card text-foreground hover:bg-accent hover:text-accent-foreground border-border mb-3.5"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="flex items-center"><Egg className="w-4 h-4 mr-2" />Chicken Road</span>
                      <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-muted text-muted-foreground">Coming Soon</span>
                    </Button>
                    <Link href="/earn"><Button variant="outline" className="w-full justify-start min-h-[56px] px-4 py-4 rounded-2xl bg-card text-foreground hover:bg-accent hover:text-accent-foreground border-border mb-3.5"><DollarSign className="w-5 h-5 mr-2" />Earn to Play</Button></Link>

                    {/* Shop collapsible below Earn to Play */}
                    <button
                      type="button"
                      className="w-full flex items-center justify-between rounded-2xl bg-card border border-border px-4 py-4 text-sm hover:bg-accent hover:text-accent-foreground transition-colors min-h-[56px] mb-3.5"
                      onClick={() => setMobileShopOpen((v) => !v)}
                      aria-expanded={mobileShopOpen}
                    >
                      <span className="flex items-center"><Gift className="w-4 h-4 mr-2" />Shop</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileShopOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileShopOpen && (
                      <div className="pl-6 border-l border-border ml-2">
                        <Link href="#">
                          <Button variant="ghost" className="w-full justify-start rounded-xl px-4 py-2.5 mb-3.5">
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            Buy
                          </Button>
                        </Link>
                        <Link href="#">
                          <Button variant="ghost" className="w-full justify-start rounded-xl px-4 py-2.5 mb-3.5">
                            <ArrowLeftRight className="w-4 h-4 mr-2" />
                            Trade
                          </Button>
                        </Link>
                      </div>
                    )}

                    {/* Weekly Race 10k banner (mobile) */}
                    <Link href="/weekly-race" title="$10k Race" className="flex group items-center overflow-hidden flex-shrink-0 w-full px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#fed81f] to-[#e67d00] border-2 border-[#e67d00] transition-all duration-300">
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
                    </Link>
                  </div>
                  {/* Auth actions removed from games menu per mobile design */}
                </div>
              </aside>
            </>
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