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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface RillaBoxLayoutProps {
  children: React.ReactNode
}

// Live Drops Data - EXACT RillaBox Live Drops
const liveDrops = [
  {
    id: 1,
    productImage: "https://cdn.rillabox.com/media/products/removal.ai_3e5fb7cd-3778-4576-b156-97ab292a2bf1-image_1.png",
    boxImage: "https://cdn.rillabox.com/media/boxes/JORDAN_EXCLUSIVE-mock_box.png",
    title: "Jordan 6 Retro - Black Infrared (2019)",
    price: 449.00,
    color: "from-blue-600 to-black"
  },
  {
    id: 2,
    productImage: "https://cdn.rillabox.com/media/products/removal.ai_730bec1d-a26c-45ad-9154-0b97be3e0f30-bape-college-tee-ss22-navy_1.png",
    boxImage: "https://cdn.rillabox.com/media/boxes/BAPE-budget-mock_box.png",
    title: "BAPE College Tee (SS22) - Navy",
    price: 134.00,
    color: "from-blue-600 to-black"
  },
  {
    id: 3,
    productImage: "https://cdn.rillabox.com/media/products/removal.ai_917e6adf-ab89-49c1-9ec1-f4980e89a3c9-image_1.png",
    boxImage: "https://cdn.rillabox.com/media/boxes/08-GOPRO-Box-mock_box.png",
    title: "GoPro Dual Battery Charger & Enduro Batteries",
    price: 69.49,
    color: "from-green-500 to-black"
  },
  {
    id: 4,
    productImage: "https://cdn.rillabox.com/media/products/removal.ai_1712f721-d42e-47f6-b9e4-76ddea516b21_geg_1.png",
    boxImage: "https://cdn.rillabox.com/media/boxes/DIOR-budget-mock_box.png",
    title: "Book: Dior By Dior",
    price: 18.99,
    color: "from-green-500 to-black"
  },
  {
    id: 5,
    productImage: "https://cdn.rillabox.com/media/products/removal.ai_7602004c-e92c-415c-b0b2-0514fe07625b-image_1.png",
    boxImage: "https://cdn.rillabox.com/media/boxes/SUPREME-X_TNF-mock_box.png",
    title: "Supreme The North Face Arc Logo Organizer - Black",
    price: 58.89,
    color: "from-gray-500 to-black"
  }
]

export function RillaBoxLayout({ children }: RillaBoxLayoutProps) {
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
        {/* Top Navigation Bar - EXACT RillaBox Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo - EXACT RillaBox Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <img src="https://rillabox.com/logo/rillabox-logo.png" alt="O SORTUDO" className="h-8 w-auto" />
              </Link>

              {/* Desktop Navigation - EXACT RillaBox Navigation */}
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

        {/* Main Layout - EXACT RillaBox Structure */}
        <div className="flex">
          {/* Left Sidebar - EXACT RillaBox Live Drops Sidebar */}
          <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 lg:static lg:inset-0`}>
            <div className="flex flex-col h-full">
              {/* Sidebar Header - EXACT RillaBox Style */}
              <div className="p-4 border-b border-sidebar-border">
                <div className="flex items-center justify-between">
                  <h1 className="text-lg font-semibold text-sidebar-foreground">LIVE DROPS</h1>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Live Drops Content - EXACT RillaBox Style */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {liveDrops.map((drop) => (
                  <div key={drop.id} className={`bg-gradient-to-r ${drop.color} rounded-lg p-3 hover:scale-105 transition-transform duration-300 cursor-pointer`}>
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <img
                          src={drop.productImage}
                          alt={drop.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <img
                            src={drop.boxImage}
                            alt="Box"
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-white truncate">{drop.title}</h3>
                        <div className="text-lg font-bold text-white">${drop.price}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sidebar Footer - EXACT RillaBox Style */}
              <div className="p-4 border-t border-sidebar-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                  className="w-full justify-center lg:hidden"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              </div>
            </div>
          </div>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content - EXACT RillaBox Style */}
          <main className="flex-1 lg:ml-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </div>
          </main>
        </div>
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