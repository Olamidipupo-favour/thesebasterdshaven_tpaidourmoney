"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Coins, Gift, Star, Users, Clock, TrendingUp, Zap, User } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/layout/footer"
import { useLiveDrops } from "@/hooks/use-socket"
import { Eye } from "lucide-react"

// Exact boxes from Rillabox with proper pricing
const boxes = [
  {
    id: "iphone-box",
    name: "1% iPhone Mystery Box",
    description: "Win authentic iPhones from iPhone 12 to iPhone 15 Pro Max",
    originalPrice: 4.13,
    currentPrice: 2.79,
    coinPrice: 70,
    category: "Electronics",
    items: 15,
    totalValue: 2000,
    trending: true,
    recentWins: 127,
    lastWin: "2 minutes ago",
    image: "https://rillabox.s3.amazonaws.com/media/boxes/1%25-iPhone-Box-mock_box_1_5rK5rgB.png",
    borderColor: "#FFBE0B"
  },
  {
    id: "1-percent-pc",
    name: "1% PC",
    description: "Win gaming PCs and components",
    originalPrice: 4.13,
    currentPrice: 2.89,
    coinPrice: 72,
    category: "Gaming",
    items: 12,
    totalValue: 1500,
    trending: false,
    recentWins: 89,
    lastWin: "5 minutes ago",
    image: "https://rillabox.s3.amazonaws.com/media/boxes/07_1__PC-Box-mock_box_1_5rK5rgB.png",
    borderColor: "#9D1FC3"
  },
  {
    id: "apple-budget",
    name: "Apple Budget",
    description: "Win Apple accessories and budget items",
    originalPrice: 8.09,
    currentPrice: 5.99,
    coinPrice: 150,
    category: "Electronics",
    items: 10,
    totalValue: 800,
    trending: true,
    recentWins: 203,
    lastWin: "1 minute ago",
    image: "https://rillabox.s3.amazonaws.com/media/boxes/APPLE-Budget-mock_box_1_1_BNZNwNg.png",
    borderColor: "#D6D6D6"
  },
  {
    id: "apple-deluxe",
    name: "Apple Deluxe",
    description: "Win premium Apple products",
    originalPrice: 118.89,
    currentPrice: 109.99,
    coinPrice: 2750,
    category: "Electronics",
    items: 8,
    totalValue: 5000,
    trending: false,
    recentWins: 45,
    lastWin: "10 minutes ago",
    image: "https://rillabox.s3.amazonaws.com/media/boxes/Apple-deluxe_l6wR88P.png",
    borderColor: "#8A8A95"
  },
  {
    id: "apple-premium",
    name: "Apple Premium",
    description: "Win high-end Apple devices",
    originalPrice: 41.49,
    currentPrice: 32.99,
    coinPrice: 825,
    category: "Electronics",
    items: 12,
    totalValue: 3000,
    trending: true,
    recentWins: 156,
    lastWin: "3 minutes ago",
    image: "https://rillabox.s3.amazonaws.com/media/boxes/APPLE-Premium-mock_box_Jt7iRRs.png",
    borderColor: "#D5D5D5"
  },
  {
    id: "apple-vs-android",
    name: "Apple Vs Android",
    description: "Win both Apple and Android devices",
    originalPrice: 53.49,
    currentPrice: 44.99,
    coinPrice: 1125,
    category: "Electronics",
    items: 14,
    totalValue: 2500,
    trending: false,
    recentWins: 78,
    lastWin: "7 minutes ago",
    image: "https://rillabox.s3.amazonaws.com/media/boxes/03_APPLE_VS_ANDROID-Box-mock_box_UmzM9F2.png",
    borderColor: "#BC39D2"
  }
]

export default function BoxesPage() {
  const { user, isAuthenticated } = useAuth()
  const { drops } = useLiveDrops()
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "Electronics", "Gaming", "Fashion", "Technology"]
  const filteredBoxes = selectedCategory === "all" 
    ? boxes 
    : boxes.filter(box => box.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Main Content Area - Exact Rillabox Layout */}
      <div className="flex">
        {/* Left Sidebar - Live Drops */}
        <div className="hidden xl:block w-80 flex-shrink-0 bg-sidebar border-r border-sidebar-border">
          <div className="p-6">
            {/* Live Drops Section - Real-time Activity */}
            <section className="mb-6">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-foreground mb-2">🔥 Live Drops</h2>
                <p className="text-sm text-muted-foreground">See what others are winning right now!</p>
              </div>
              
              {drops && drops.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {drops.slice(0, 6).map((drop, index) => (
                    <Card key={`${drop.id}-${index}`} className="bg-card border-border overflow-hidden group hover:shadow-md transition-all duration-200">
                      <div className="p-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-foreground truncate">
                              {drop.user.username}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              won {drop.item.name}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-primary">
                              ${drop.item.value}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              from {drop.box.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No live drops at the moment
                </div>
              )}
            </section>
          </div>
        </div>
        
        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header - Exact Rillabox Style */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Mystery Boxes</h1>
              <p className="text-muted-foreground">Open boxes and win amazing prizes</p>
            </div>
            {isAuthenticated && user && (
              <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-lg">
                <Coins className="w-5 h-5 text-primary" />
                <span className="font-bold text-lg text-foreground">{user.balance?.toLocaleString() || 0}</span>
                <span className="text-sm text-muted-foreground">Coins</span>
              </div>
            )}
          </div>

          {/* Category Filter - Exact Rillabox Style */}
          <div className="flex space-x-2 mb-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Boxes Grid - Smaller Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredBoxes.map((box) => (
            <Card key={box.id} className="bg-card border-border overflow-hidden hover:border-primary/50 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/10 hover:scale-105 cursor-pointer animate-borderbox">
              <div className="relative">
                {/* Box Name - Top Left */}
                <div className="absolute top-2 left-2 z-10">
                  <span className="text-sm font-bold text-white bg-black/50 px-2 py-1 rounded">
                    {box.name}
                  </span>
                </div>
                
                {/* Eye Icon - Top Right */}
                <div className="absolute top-2 right-2 z-10">
                  <Link href={box.id === "iphone-box" ? "/boxes/iphone-box" : `/boxes/${box.id}`}>
                    <div className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors cursor-pointer">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                  </Link>
                </div>

                {/* Box Image Container - Exact Rillabox Style */}
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative overflow-hidden group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
                  <img 
                    src={box.image} 
                    alt={box.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg"
                    }}
                  />
                  <div 
                    className="absolute inset-0 border-t-2 border-b-2 group-hover:border-t-4 group-hover:border-b-4 transition-all duration-300"
                    style={{ 
                      borderTopColor: box.borderColor, 
                      borderBottomColor: box.borderColor 
                    }}
                  ></div>
                  {/* Glow effect - Exact Rillabox Style */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-lg"
                    style={{ 
                      backgroundColor: box.borderColor,
                      boxShadow: `0 0 20px ${box.borderColor}40`
                    }}
                  ></div>
                </div>
                
              </div>

              <div className="p-2">
                {/* Price Section - Clickable to Open Box */}
                <Link href={box.id === "iphone-box" ? "/boxes/iphone-box" : `/boxes/${box.id}`}>
                  <div className="mb-2 cursor-pointer hover:scale-105 transition-all duration-300">
                    <div className="price-container flex items-center justify-center space-x-1 w-full">
                      <div className="original-price text-xs font-bold line-through bg-white text-black px-2 py-1 rounded flex-1 text-center">
                        <span>$</span><span>{box.originalPrice}</span>
                      </div>
                      <div className="current-price text-sm font-bold text-white bg-primary px-2 py-1 rounded flex-1 text-center">
                        <span>$</span><span>{box.currentPrice}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </Card>
          ))}
        </div>


        {/* Information Section - Exact Rillabox Style with Animations */}
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card border-border text-center p-6 hover:shadow-lg hover:shadow-green-500/10 hover:scale-105 transition-all duration-300 cursor-pointer group">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30 group-hover:scale-110 transition-all duration-300">
                <Star className="w-8 h-8 text-green-500 group-hover:animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-green-500 transition-colors duration-300">100% Authentic Items</h3>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                At RillaBox, every item you receive is verified authentic from StockX or official retailers, guaranteeing you the real deal every time.
              </p>
            </Card>

            <Card className="bg-card border-border text-center p-6 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 transition-all duration-300 cursor-pointer group">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                <Gift className="w-8 h-8 text-primary group-hover:animate-bounce" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">Exchange Unwanted Items</h3>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                Convert all items in your inventory into instant cash on RillaBox. Unbox something that perfectly matches your style with no fees or hidden costs.
              </p>
            </Card>

            <Card className="bg-card border-border text-center p-6 hover:shadow-lg hover:shadow-chart-2/10 hover:scale-105 transition-all duration-300 cursor-pointer group">
              <div className="w-16 h-16 bg-chart-2/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-chart-2/30 group-hover:scale-110 transition-all duration-300">
                <Zap className="w-8 h-8 text-chart-2 group-hover:animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-chart-2 transition-colors duration-300">Worldwide Shipping</h3>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                Claim your prize & have it delivered to your doorstep, or withdraw the value.
              </p>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <Footer />
          </div>
        </main>
      </div>
    </div>
  )
}