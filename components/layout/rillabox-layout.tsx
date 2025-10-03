"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Gift, 
  Swords, 
  TrendingUp, 
  Target, 
  Menu, 
  X, 
  ShoppingCart,
  Users,
  Coins,
  Trophy,
  Timer,
  Home,
  ChevronLeft
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { LoginDialog } from "@/components/auth/login-dialog"
import { RegisterDialog } from "@/components/auth/register-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FloatingActionButton } from "@/components/ui/fab"
import { Footer } from "@/components/layout/footer"
import { LiveDropsSidebar } from "@/components/live-drops-sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface OSortudoLayoutProps {
  children: React.ReactNode
}


export function OSortudoLayout({ children }: OSortudoLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
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
      <div className="min-h-screen bg-background">
        {/* Top Navigation Bar - EXACT O Sortudo Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo - EXACT O Sortudo Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">🍀</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">O SORTUDO</h1>
                  <p className="text-xs text-muted-foreground">Irish Gaming Platform</p>
                </div>
              </Link>

              {/* Desktop Navigation - EXACT O Sortudo Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/">
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </Button>
                </Link>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Gift className="w-4 h-4" />
                  <span>Live Drops</span>
                </Button>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Swords className="w-4 h-4" />
                  <span>Games</span>
                </Button>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Gift className="w-4 h-4" />
                  <span>Boxes</span>
                </Button>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4" />
                  <span>Rewards</span>
                </Button>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <img src="https://rillabox.com/images/race-bg.svg" alt="10k Race" className="w-6 h-6" />
                </Button>
              </div>

              <div className="hidden md:flex items-center space-x-4">
                {isAuthenticated && user && (
                  <div className="flex items-center space-x-2 bg-secondary/20 px-3 py-1 rounded-full">
                    <Coins className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-medium">{user.balance?.toLocaleString() || 0}</span>
                    <span className="text-xs text-muted-foreground">Coins</span>
                  </div>
                )}

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
                          <Trophy className="w-4 h-4 mr-2" />
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
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Button variant="outline" size="sm" onClick={() => setShowLoginDialog(true)}>
                      Sign in
                    </Button>
                    <Button size="sm" className="glow-effect" onClick={() => setShowRegisterDialog(true)}>
                      Sign Up and get Free Box
                    </Button>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
                  {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Layout - EXACT O Sortudo Structure */}
        <div className="flex">
          {/* Left Sidebar - API Integrated Live Drops Sidebar */}
          <div className={`fixed inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 lg:static lg:inset-0`}>
            <LiveDropsSidebar />
          </div>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content - EXACT O Sortudo Style */}
          <main className="flex-1 lg:ml-0">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>
        </div>

        {/* Footer - EXACT O Sortudo Footer */}
        <Footer />

        {/* Floating Action Button - EXACT O Sortudo FAB */}
        <FloatingActionButton />
      </div>

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
