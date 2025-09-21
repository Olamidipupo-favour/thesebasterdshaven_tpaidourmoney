"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Gift, Trophy, Coins, Menu, X, User } from "lucide-react"
import Link from "next/link"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/">
              <Button variant="ghost" className="flex items-center space-x-2">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Button>
            </Link>
            <Button variant="ghost" className="flex items-center space-x-2">
              <Gift className="w-4 h-4" />
              <span>Games</span>
            </Button>
            <Button variant="ghost" className="flex items-center space-x-2">
              <Trophy className="w-4 h-4" />
              <span>Rewards</span>
            </Button>
            <Link href="/dashboard">
              <Button variant="ghost" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Dashboard</span>
              </Button>
            </Link>
          </div>

          {/* User Info & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-secondary/20 px-3 py-1 rounded-full">
              <Coins className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">1,250</span>
              <span className="text-xs text-muted-foreground">Local Coins</span>
            </div>
            <Badge variant="secondary" className="bg-chart-2/20 text-chart-2">
              $10K RACE
            </Badge>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm" className="glow-effect">
              Sign Up & Get Free Box
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/">
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Button variant="ghost" className="w-full justify-start">
                <Gift className="w-4 h-4 mr-2" />
                Games
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Trophy className="w-4 h-4 mr-2" />
                Rewards
              </Button>
              <Link href="/dashboard">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <div className="flex items-center justify-between p-2 bg-secondary/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Coins className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-medium">1,250 Local Coins</span>
                </div>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                Sign In
              </Button>
              <Button className="w-full glow-effect">Sign Up & Get Free Box</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
