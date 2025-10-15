"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { LoginDialog } from "@/components/auth/login-dialog"
import { RegisterDialog } from "@/components/auth/register-dialog"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Gift, Trophy, Gamepad2, Boxes, LogOut, Zap, Menu, X } from "lucide-react"

export function RillaboxHeader() {
  const { user, isAuthenticated, logout } = useAuth()
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showRegisterDialog, setShowRegisterDialog] = useState(false)
  const [gamesOpen, setGamesOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
      <header id="header" className="sticky top-0 z-50 bg-card/95 border-b border-border backdrop-blur-sm">
        <div className="flex items-center px-4 sm:px-6 lg:px-8 h-16">
          {/* Left: Logo */}
          <div className="header-logo flex items-center justify-center h-full">
            <Link href="/" className="inline-flex items-center">
              <div className="logo-image">
                <img src="/logo/OSORTUDO%20LOGO%201.png" alt="rillabox-logo" className="sidebar-logo h-8 object-contain" />
              </div>
            </Link>
          </div>

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
          <div className="flex justify-between flex-grow items-center header-rightbox">
            <div className="header-menu hidden" />

            <div className="header-rightoption flex items-center gap-3 ml-auto">
              {/* Desktop Home button */}
              <Link href="/" className="hidden lg:inline-flex items-center justify-center">
                <Button variant="outline" size="icon" className="home-btns home-btn">
                  <Home className="w-4 h-4" />
                </Button>
              </Link>

              {/* Mobile bottom bar items */}
              <div className="lg:hidden flex items-center gap-6">
                <button className="flex flex-col items-center text-xs">
                  <Zap className="w-5 h-5" />
                  <span>Live Drops</span>
                </button>
                <button className="flex flex-col items-center text-xs">
                  <Gamepad2 className="w-5 h-5" />
                  <span>Games</span>
                </button>
                <Link href="/boxes" className="flex flex-col items-center text-xs">
                  <Boxes className="w-5 h-5" />
                  <span>Boxes</span>
                </Link>
              </div>

              {/* Desktop Games dropdown (opens on hover & click) */}
              <div
                className="hidden lg:block relative"
                onMouseEnter={() => setGamesOpen(true)}
                onMouseLeave={() => setGamesOpen(false)}
              >
                <DropdownMenu open={gamesOpen} onOpenChange={setGamesOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Gamepad2 className="w-4 h-4" />
                      <span>Games</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" sideOffset={8} className="z-[60] mt-2 min-w-[220px]">
                    <DropdownMenuItem asChild>
                      <Link href="/boxes" className="cursor-pointer">Mystery Boxes</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/battles" className="cursor-pointer">Battles</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/crash" className="cursor-pointer">Crash</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/plinko" className="cursor-pointer">Plinko</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Rewards link */}
              <Link href="/reward" className="inline-flex">
                <Button variant="outline" className="flex items-center gap-2">
                  <Gift className="w-4 h-4" />
                  <span className="text-white">Rewards</span>
                </Button>
              </Link>

              {/* Weekly race banner */}
              <Link href="/weekly-race" title="10k Race" className="hidden lg:flex items-center overflow-hidden flex-shrink-0 px-3 py-2 rounded-md bg-muted">
                <Trophy className="w-5 h-5 text-primary mr-2" />
                <div className="flex items-center gap-2">
                  <span className="text-black dark:text-white font-semibold italic">$10k Race</span>
                  <div className="flex items-center gap-1 text-black dark:text-white">
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

              {/* Desktop login side */}
              <div className="hidden lg:flex items-center gap-2">
                {!isAuthenticated ? (
                  <>
                    <Button variant="outline" size="sm" className="button-sign-in" onClick={() => setShowLoginDialog(true)}>Sign in</Button>
                    <Button size="sm" className="sign-up" onClick={() => setShowRegisterDialog(true)}>
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
          </div>

          {/* Mobile expanded menu (optional quick links) */}
          {mobileMenuOpen && (
            <div className="lg:hidden w-full mt-3">
              <div className="grid grid-cols-3 gap-2">
                <Link href="/mystery-box"><Button variant="outline" className="w-full">Mystery Boxes</Button></Link>
                <Link href="/battles"><Button variant="outline" className="w-full">Battles</Button></Link>
                <Link href="/crash"><Button variant="outline" className="w-full">Crash</Button></Link>
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