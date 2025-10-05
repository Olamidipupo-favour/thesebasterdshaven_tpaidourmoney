"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Coins, Gift, Star, Zap, Info, Loader2, Smartphone, Sparkles, Users, Clock, Trophy } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import type { BoxItem } from "@/lib/api/types"

// iPhone items data with real images
const iphoneItems: BoxItem[] = [
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max 256GB",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1693009279823",
    value: 1199.00,
    rarity: "legendary",
    probability: 1
  },
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro 128GB",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1693009279823", 
    value: 999.00,
    rarity: "epic",
    probability: 3
  },
  {
    id: "iphone-15",
    name: "iPhone 15 128GB",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-pink?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1693009279823",
    value: 799.00,
    rarity: "rare",
    probability: 8
  },
  {
    id: "iphone-14-pro-max",
    name: "iPhone 14 Pro Max 128GB",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-deeppurple?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1663703841896",
    value: 1099.00,
    rarity: "epic",
    probability: 5
  },
  {
    id: "iphone-14-pro",
    name: "iPhone 14 Pro 128GB",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-deeppurple?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1663703841896",
    value: 999.00,
    rarity: "epic",
    probability: 7
  },
  {
    id: "iphone-14",
    name: "iPhone 14 128GB",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-purple?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1663703841896",
    value: 699.00,
    rarity: "rare",
    probability: 12
  },
  {
    id: "iphone-13-pro-max",
    name: "iPhone 13 Pro Max 128GB",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-sierra-blue-select?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1631652954000",
    value: 899.00,
    rarity: "rare",
    probability: 15
  },
  {
    id: "iphone-13-pro",
    name: "iPhone 13 Pro 128GB",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-sierra-blue-select?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1631652954000",
    value: 799.00,
    rarity: "rare",
    probability: 18
  },
  {
    id: "iphone-13",
    name: "iPhone 13 128GB",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pink-select-2021?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1629842662000",
    value: 599.00,
    rarity: "common",
    probability: 25
  },
  {
    id: "iphone-12",
    name: "iPhone 12 64GB",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-purple-select-2021?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1617130317000",
    value: 499.00,
    rarity: "common",
    probability: 35
  }
]

const rarityColors = {
  common: "bg-gray-500",
  rare: "bg-blue-500", 
  epic: "bg-purple-500",
  legendary: "bg-yellow-500",
}

export default function MysteryBoxPage() {
  const { user, isAuthenticated } = useAuth()
  const [isSpinning, setIsSpinning] = useState(false)
  const [isDemoSpinning, setIsDemoSpinning] = useState(false)
  const [wonPrize, setWonPrize] = useState<BoxItem | null>(null)
  const [spinningItems, setSpinningItems] = useState<BoxItem[]>([])
  const [currentSpinIndex, setCurrentSpinIndex] = useState(0)
  const [boxOpening, setBoxOpening] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"usd" | "coins">("coins")

  // Demo spin function
  const handleDemoSpin = () => {
    setIsDemoSpinning(true)
    setWonPrize(null)
    const tripleItems = [...iphoneItems, ...iphoneItems, ...iphoneItems]
    setSpinningItems(tripleItems)
    setCurrentSpinIndex(0)
    
    const spinInterval = setInterval(() => {
      setCurrentSpinIndex(prev => {
        if (prev >= tripleItems.length - 1) {
          clearInterval(spinInterval)
          const randomItem = iphoneItems[Math.floor(Math.random() * iphoneItems.length)]
          setTimeout(() => {
            setWonPrize(randomItem)
            setIsDemoSpinning(false)
          }, 500)
          return prev
        }
        return prev + 1
      })
    }, 100)

    setTimeout(() => {
      setBoxOpening(true)
      setTimeout(() => {
        setBoxOpening(false)
      }, 2000)
    }, 1500)
  }

  // Real spin function
  const handleRealSpin = async () => {
    if (!isAuthenticated) {
      alert("Please sign in to open boxes")
      return
    }

    setIsSpinning(true)
    setWonPrize(null)
    const tripleItems = [...iphoneItems, ...iphoneItems, ...iphoneItems]
    setSpinningItems(tripleItems)
    setCurrentSpinIndex(0)

    await new Promise(resolve => setTimeout(resolve, 1000))

    const spinInterval = setInterval(() => {
      setCurrentSpinIndex(prev => {
        if (prev >= tripleItems.length - 1) {
          clearInterval(spinInterval)
          const randomItem = iphoneItems[Math.floor(Math.random() * iphoneItems.length)]
          setTimeout(() => {
            setWonPrize(randomItem)
            setIsSpinning(false)
          }, 500)
          return prev
        }
        return prev + 1
      })
    }, 100)

    setTimeout(() => {
      setBoxOpening(true)
      setTimeout(() => {
        setBoxOpening(false)
      }, 2000)
    }, 1500)
  }

  const resetGame = () => {
    setWonPrize(null)
    setSpinningItems([])
    setCurrentSpinIndex(0)
    setBoxOpening(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Rillabox-style Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">iPhone Mystery Box</h1>
              <p className="text-muted-foreground">Win authentic iPhones from iPhone 12 to iPhone 15 Pro Max</p>
            </div>
            {isAuthenticated && user && (
              <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-lg">
                <Coins className="w-5 h-5 text-primary" />
                <span className="font-bold text-lg text-foreground">{user.balance?.toLocaleString() || 0}</span>
                <span className="text-sm text-muted-foreground">Coins</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Box Section - Rillabox Style */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border overflow-hidden">
              <div className="p-6">
                {!wonPrize && !isSpinning && !isDemoSpinning ? (
                  <div className="text-center space-y-6">
                    {/* Box Image - Rillabox Style */}
                    <div className="relative mx-auto w-80 h-80">
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center border-2 border-primary/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                        <div className="relative z-10 text-center">
                          <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                            <Smartphone className="w-16 h-16 text-primary" />
                          </div>
                          <h2 className="text-2xl font-bold text-foreground mb-2">iPhone Mystery Box</h2>
                          <p className="text-muted-foreground">Open to reveal your prize!</p>
                        </div>
                      </div>
                      <div className="absolute -top-2 -right-2">
                        <Badge className="bg-chart-2 text-black font-bold px-3 py-1">
                          iPhone Box
                        </Badge>
                      </div>
                    </div>

                    {/* Payment Options - Rillabox Style */}
                    <div className="space-y-4">
                      <div className="flex justify-center space-x-3">
                        <Button
                          variant={paymentMethod === "usd" ? "default" : "outline"}
                          size="lg"
                          onClick={() => setPaymentMethod("usd")}
                          className="bg-chart-2 hover:bg-chart-2/90 text-black font-bold"
                        >
                          $25.00 USD
                        </Button>
                        <Button
                          variant={paymentMethod === "coins" ? "default" : "outline"}
                          size="lg"
                          onClick={() => setPaymentMethod("coins")}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                          disabled={!isAuthenticated}
                        >
                          <Coins className="w-4 h-4 mr-2" />
                          625 Coins
                        </Button>
                      </div>

                      {/* Action Buttons - Rillabox Style */}
                      <div className="flex justify-center space-x-4">
                        <Button
                          onClick={handleDemoSpin}
                          size="lg"
                          className="bg-chart-5 hover:bg-chart-5/90 text-white px-6 py-3 font-bold"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Demo Spin
                        </Button>
                        <Button
                          onClick={handleRealSpin}
                          size="lg"
                          className="bg-gradient-to-r from-chart-2 to-chart-2/80 hover:from-chart-2/90 hover:to-chart-2/70 text-black px-6 py-3 font-bold"
                          disabled={!isAuthenticated}
                        >
                          <Gift className="w-4 h-4 mr-2" />
                          Open Box
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (isSpinning || isDemoSpinning) ? (
                  <div className="text-center space-y-6">
                    {/* Spinning Animation - Rillabox Style */}
                    <div className="relative mx-auto w-80 h-80">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center border-2 border-primary/30 animate-pulse">
                        <div className="text-center">
                          <Smartphone className="w-16 h-16 text-primary animate-spin mx-auto mb-4" />
                          <h2 className="text-2xl font-bold text-foreground mb-2">
                            {isDemoSpinning ? "Demo Spinning..." : "Opening Box..."}
                          </h2>
                          <p className="text-muted-foreground">Revealing your prize...</p>
                        </div>
                      </div>
                      {boxOpening && (
                        <div className="absolute inset-0 bg-chart-2/20 rounded-2xl animate-ping"></div>
                      )}
                    </div>

                    {/* Spinning Items Display */}
                    {spinningItems.length > 0 && (
                      <div className="bg-muted/50 rounded-lg p-4 max-w-md mx-auto">
                        <div className="text-foreground font-bold mb-2">Spinning through:</div>
                        <div className="flex items-center space-x-2 text-sm">
                          <div className={`w-3 h-3 rounded-full ${rarityColors[spinningItems[currentSpinIndex]?.rarity || 'common']}`}></div>
                          <span className="text-muted-foreground">{spinningItems[currentSpinIndex]?.name}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : wonPrize ? (
                  <div className="text-center space-y-6">
                    {/* Won Prize Display - Rillabox Style */}
                    <div className="relative mx-auto w-80 h-80">
                      <div className="w-full h-full bg-gradient-to-br from-chart-2/20 to-chart-2/40 rounded-2xl flex items-center justify-center border-2 border-chart-2/30 animate-bounce">
                        <div className="text-center">
                          <div className="w-32 h-32 mx-auto mb-4 bg-white/90 rounded-xl flex items-center justify-center overflow-hidden">
                            <img 
                              src={wonPrize.image} 
                              alt={wonPrize.name}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.svg"
                              }}
                            />
                          </div>
                          <h2 className="text-2xl font-bold text-foreground mb-2">Congratulations!</h2>
                          <p className="text-chart-2 font-bold">{wonPrize.name}</p>
                        </div>
                      </div>
                      <div className="absolute -top-2 -right-2">
                        <Badge className={`${rarityColors[wonPrize.rarity]} text-white capitalize font-bold px-3 py-1`}>
                          {wonPrize.rarity}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="text-3xl font-bold text-primary">${wonPrize.value.toFixed(2)}</div>
                      <div className="flex items-center justify-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-chart-2 fill-current" />
                        ))}
                      </div>
                      <div className="flex justify-center space-x-4">
                        <Button onClick={resetGame} variant="outline" size="lg">
                          Spin Again
                        </Button>
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          Claim Prize
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </Card>
          </div>

          {/* Sidebar - Rillabox Style */}
          <div className="space-y-6">
            {/* Box Info */}
            <Card className="bg-card border-border">
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Box Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-bold text-foreground">$25.00 / 625 Coins</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items:</span>
                    <span className="font-bold text-foreground">10 iPhones</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Value:</span>
                    <span className="font-bold text-primary">$8,495</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent Wins */}
            <Card className="bg-card border-border">
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Recent Wins</h3>
                <div className="space-y-3">
                  {[
                    { user: "Player1", item: "iPhone 15 Pro", value: "$999" },
                    { user: "Player2", item: "iPhone 14 Pro Max", value: "$1099" },
                    { user: "Player3", item: "iPhone 13 Pro", value: "$799" },
                  ].map((win, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <Smartphone className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground">{win.user}</div>
                        <div className="text-xs text-muted-foreground">{win.item}</div>
                      </div>
                      <div className="text-sm font-bold text-primary">{win.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Possible Prizes */}
            <Card className="bg-card border-border">
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Possible Prizes</h3>
                <div className="grid grid-cols-2 gap-3">
                  {iphoneItems.slice(0, 6).map((item) => (
                    <div key={item.id} className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg"
                          }}
                        />
                      </div>
                      <div className="text-xs font-medium text-foreground truncate">{item.name}</div>
                      <div className="text-xs text-muted-foreground">${item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}