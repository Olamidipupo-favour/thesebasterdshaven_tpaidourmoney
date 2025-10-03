"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  Gift, 
  Trophy, 
  TrendingUp, 
  Target,
  X
} from "lucide-react"
import Link from "next/link"

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* FAB Menu Items */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-3 mb-4">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="w-12 h-12 rounded-full bg-card border-border hover:border-primary/50 transition-all duration-300 shadow-lg"
            >
              <Gift className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/battles">
            <Button
              variant="outline"
              size="sm"
              className="w-12 h-12 rounded-full bg-card border-border hover:border-primary/50 transition-all duration-300 shadow-lg"
            >
              <Trophy className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/crash">
            <Button
              variant="outline"
              size="sm"
              className="w-12 h-12 rounded-full bg-card border-border hover:border-primary/50 transition-all duration-300 shadow-lg"
            >
              <TrendingUp className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/plinko">
            <Button
              variant="outline"
              size="sm"
              className="w-12 h-12 rounded-full bg-card border-border hover:border-primary/50 transition-all duration-300 shadow-lg"
            >
              <Target className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      )}

      {/* Main FAB Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'bg-destructive hover:bg-destructive/90' 
            : 'bg-primary hover:bg-primary/90 glow-effect'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Plus className="w-6 h-6" />
        )}
      </Button>
    </div>
  )
}
