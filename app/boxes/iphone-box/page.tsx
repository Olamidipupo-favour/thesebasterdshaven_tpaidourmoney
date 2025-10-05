"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Coins, Gift, Star, Zap, Users, Clock, ArrowLeft, Smartphone } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/layout/footer"

// Exact iPhone items from Rillabox HTML
const iphoneItems = [
  {
    id: "iphone-16-ultramarine",
    name: "iPhone 16 - Ultramarine, 128GB",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1724592000000",
    value: 799.99,
    rarity: "legendary",
    probability: 0.1454,
    glowColor: "#FFBE0B"
  },
  {
    id: "iphone-16e-white",
    name: "iPhone 16e - White, 128GB",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-white?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1724592000000",
    value: 599.99,
    rarity: "epic",
    probability: 0.2865,
    glowColor: "#A800E0"
  },
  {
    id: "iphone-12-black",
    name: "iPhone 12 - Black, 64GB",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-finish-select-2020-6-1inch-black?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1604343702000",
    value: 249.99,
    rarity: "epic",
    probability: 0.3912,
    glowColor: "#A800E0"
  },
  {
    id: "iphone-se-2nd-gen",
    name: "iPhone SE 2nd Generation - Black, 64GB",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-2nd-gen-finish-select-2020-4-7inch-black?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1586714262000",
    value: 144.99,
    rarity: "epic",
    probability: 0.4587,
    glowColor: "#A800E0"
  },
  {
    id: "dji-osmo-mobile-se",
    name: "DJI Osmo Mobile SE",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/accessory-dji-osmo-mobile-se-2023?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1672531200000",
    value: 74.99,
    rarity: "rare",
    probability: 0.6698,
    glowColor: "#0078D7"
  },
  {
    id: "belkin-power-bank",
    name: "Belkin BoostCharge Pro Magnetic Power Bank 5K - Deep Purple",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/accessory-belkin-boostcharge-pro-magnetic-power-bank-5k-deep-purple?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1672531200000",
    value: 64.49,
    rarity: "rare",
    probability: 0.7432,
    glowColor: "#0078D7"
  },
  {
    id: "wireless-carplay",
    name: "Wireless Carplay Adapter",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/accessory-wireless-carplay-adapter?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1672531200000",
    value: 50.49,
    rarity: "rare",
    probability: 0.8554,
    glowColor: "#0078D7"
  },
  {
    id: "mophie-car-charger",
    name: "mophie Dual USB-C 40W PD Car Charger",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/accessory-mophie-dual-usb-c-40w-pd-car-charger?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1672531200000",
    value: 38.99,
    rarity: "rare",
    probability: 0.9989,
    glowColor: "#0078D7"
  },
  {
    id: "apple-earpods",
    name: "Apple EarPods with Lightning Connector",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/accessory-apple-earpods-with-lightning-connector?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1672531200000",
    value: 27.99,
    rarity: "rare",
    probability: 1.3409,
    glowColor: "#0078D7"
  },
  {
    id: "anker-lightning-cable",
    name: "Anker iPhone Lightning Charger Cable",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/accessory-anker-iphone-lightning-charger-cable?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1672531200000",
    value: 18.99,
    rarity: "common",
    probability: 2.0013,
    glowColor: "#52CA19"
  },
  {
    id: "phone-stand",
    name: "Adjustable Phone Stand for Desk",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/accessory-adjustable-phone-stand-for-desk?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1672531200000",
    value: 11.99,
    rarity: "common",
    probability: 2.6601,
    glowColor: "#52CA19"
  },
  {
    id: "transparent-case",
    name: "Transparent iPhone Case Cover",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/accessory-transparent-iphone-case-cover?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1672531200000",
    value: 7.29,
    rarity: "common",
    probability: 3.1721,
    glowColor: "#52CA19"
  },
  {
    id: "screen-protector",
    name: "Tempered Glass Screen Protector",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/accessory-tempered-glass-screen-protector?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1672531200000",
    value: 4.19,
    rarity: "common",
    probability: 4.6665,
    glowColor: "#52CA19"
  },
  {
    id: "apple-logo-sticker",
    name: "Authentic Apple Logo Sticker",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/accessory-apple-logo-sticker?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1672531200000",
    value: 0.99,
    rarity: "common",
    probability: 37.9354,
    glowColor: "#6F6868"
  },
  {
    id: "side-eye-sticker",
    name: "Side Eye Emoji Sticker",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/accessory-side-eye-emoji-sticker?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1672531200000",
    value: 0.09,
    rarity: "common",
    probability: 43.6746,
    glowColor: "#6F6868"
  }
]

// Similar boxes from Rillabox
const similarBoxes = [
  {
    id: "1-percent-pc",
    name: "1% PC",
    image: "https://rillabox.s3.amazonaws.com/media/boxes/07_1__PC-Box-mock_box_1_5rK5rgB.png",
    originalPrice: 4.13,
    currentPrice: 2.89,
    borderColor: "#9D1FC3"
  },
  {
    id: "apple-budget",
    name: "Apple Budget",
    image: "https://rillabox.s3.amazonaws.com/media/boxes/APPLE-Budget-mock_box_1_1_BNZNwNg.png",
    originalPrice: 8.09,
    currentPrice: 5.99,
    borderColor: "#D6D6D6"
  },
  {
    id: "apple-deluxe",
    name: "Apple Deluxe",
    image: "https://rillabox.s3.amazonaws.com/media/boxes/Apple-deluxe_l6wR88P.png",
    originalPrice: 118.89,
    currentPrice: 109.99,
    borderColor: "#8A8A95"
  },
  {
    id: "apple-premium",
    name: "Apple Premium",
    image: "https://rillabox.s3.amazonaws.com/media/boxes/APPLE-Premium-mock_box_Jt7iRRs.png",
    originalPrice: 41.49,
    currentPrice: 32.99,
    borderColor: "#D5D5D5"
  },
  {
    id: "apple-vs-android",
    name: "Apple Vs Android",
    image: "https://rillabox.s3.amazonaws.com/media/boxes/03_APPLE_VS_ANDROID-Box-mock_box_UmzM9F2.png",
    originalPrice: 53.49,
    currentPrice: 44.99,
    borderColor: "#BC39D2"
  },
  {
    id: "apple-vs-samsung",
    name: "Apple Vs Samsung",
    image: "https://rillabox.s3.amazonaws.com/media/boxes/25_APPLE_VS_SAMSUNG-Box-mock_box_NSFrh0X.png",
    originalPrice: 38.49,
    currentPrice: 34.99,
    borderColor: "#A22DE5"
  }
]

export default function IPhoneBoxPage() {
  const { user, isAuthenticated } = useAuth()
  const [isSpinning, setIsSpinning] = useState(false)
  const [isDemoSpinning, setIsDemoSpinning] = useState(false)
  const [wonPrize, setWonPrize] = useState<any>(null)
  const [spinningItems, setSpinningItems] = useState<any[]>([])
  const [currentSpinIndex, setCurrentSpinIndex] = useState(0)
  const [boxOpening, setBoxOpening] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"usd" | "coins">("coins")
  const [quantity, setQuantity] = useState(1)

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
      <Navigation />
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Link href="/boxes" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Boxes
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">1% iPhone Mystery Box</h1>
              <p className="text-muted-foreground">Win authentic iPhones and accessories</p>
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
          {/* Main Box Section */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border overflow-hidden">
              <div className="p-6">
                {!wonPrize && !isSpinning && !isDemoSpinning ? (
                  <div className="text-center space-y-6">
                    {/* Box Image */}
                    <div className="relative mx-auto w-80 h-80">
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center border-2 border-primary/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                        <div className="relative z-10 text-center">
                          <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                            <Smartphone className="w-16 h-16 text-primary" />
                          </div>
                          <h2 className="text-2xl font-bold text-foreground mb-2">1% iPhone Mystery Box</h2>
                          <p className="text-muted-foreground">Open to reveal your prize!</p>
                        </div>
                      </div>
                      <div className="absolute -top-2 -right-2">
                        <Badge className="bg-chart-2 text-black font-bold px-3 py-1">
                          iPhone Box
                        </Badge>
                      </div>
                    </div>

                    {/* Security Badge */}
                    <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span>100% Authentic & Secured by Provable Fairness</span>
                    </div>

                    {/* Payment Options */}
                    <div className="space-y-4">
                      <div className="flex justify-center space-x-3">
                        <Button
                          variant={paymentMethod === "usd" ? "default" : "outline"}
                          size="lg"
                          onClick={() => setPaymentMethod("usd")}
                          className="bg-chart-2 hover:bg-chart-2/90 text-black font-bold"
                        >
                          $2.79 USD
                        </Button>
                        <Button
                          variant={paymentMethod === "coins" ? "default" : "outline"}
                          size="lg"
                          onClick={() => setPaymentMethod("coins")}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                          disabled={!isAuthenticated}
                        >
                          <Coins className="w-4 h-4 mr-2" />
                          70 Coins
                        </Button>
                      </div>

                      {/* Quantity Selection */}
                      <div className="flex justify-center space-x-2">
                        {[1, 2, 3, 4].map((num) => (
                          <Button
                            key={num}
                            variant={quantity === num ? "default" : "outline"}
                            size="sm"
                            onClick={() => setQuantity(num)}
                            className="w-12 h-12"
                          >
                            {num}
                          </Button>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-center space-x-4">
                        <Button
                          onClick={handleDemoSpin}
                          size="lg"
                          className="bg-chart-5 hover:bg-chart-5/90 text-white px-6 py-3 font-bold"
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          Demo Spin
                        </Button>
                        <Button
                          onClick={handleRealSpin}
                          size="lg"
                          className="bg-gradient-to-r from-chart-2 to-chart-2/80 hover:from-chart-2/90 hover:to-chart-2/70 text-black px-6 py-3 font-bold"
                          disabled={!isAuthenticated}
                        >
                          <Gift className="w-4 h-4 mr-2" />
                          Open for $2.79
                        </Button>
                        <Button
                          size="lg"
                          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-bold"
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          Fast Spin
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (isSpinning || isDemoSpinning) ? (
                  <div className="text-center space-y-6">
                    {/* Spinning Animation - Exact Rillabox Style */}
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

                    {/* Spinning Items Display - Rillabox Style */}
                    {spinningItems.length > 0 && (
                      <div className="bg-muted/50 rounded-lg p-4 max-w-md mx-auto">
                        <div className="text-foreground font-bold mb-2">Spinning through:</div>
                        <div className="flex items-center space-x-2 text-sm">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: spinningItems[currentSpinIndex]?.glowColor || '#52CA19' }}
                          ></div>
                          <span className="text-muted-foreground">{spinningItems[currentSpinIndex]?.name}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : wonPrize ? (
                  <div className="text-center space-y-6">
                    {/* Won Prize Display */}
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
                        <Badge className="bg-chart-2 text-black capitalize font-bold px-3 py-1">
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

            {/* Items in Box - Exact Rillabox Style */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Drops in 1% iPhone (15)</h2>
              <p className="text-muted-foreground mb-6">Unbox to ship or exchange one of the products:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {iphoneItems.map((item) => (
                  <Card key={item.id} className="bg-card border-border overflow-hidden hover:border-primary/50 transition-all duration-200">
                    <div 
                      className="border-t-2 border-b-2 p-4"
                      style={{ 
                        borderTopColor: item.glowColor, 
                        borderBottomColor: item.glowColor 
                      }}
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg"
                            }}
                          />
                        </div>
                        <h3 className="text-sm font-bold text-foreground mb-2">{item.name}</h3>
                        <div className="text-lg font-bold text-primary mb-2">${item.value}</div>
                        <div className="text-xs text-muted-foreground">{item.probability}%</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Similar Boxes - Exact Rillabox Style */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Similar Boxes</h2>
              <p className="text-muted-foreground mb-6">Explore other boxes in a similar price range or niche</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {similarBoxes.map((box) => (
                  <Card key={box.id} className="bg-card border-border overflow-hidden hover:border-primary/50 transition-all duration-200">
                    <div 
                      className="border-t-2 border-b-2 p-4"
                      style={{ 
                        borderTopColor: box.borderColor, 
                        borderBottomColor: box.borderColor 
                      }}
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                          <img 
                            src={box.image} 
                            alt={box.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg"
                            }}
                          />
                        </div>
                        <h3 className="text-sm font-bold text-foreground mb-2">{box.name}</h3>
                        <div className="space-y-1">
                          <div className="text-xs text-muted-foreground line-through">${box.originalPrice}</div>
                          <div className="text-sm font-bold text-primary">${box.currentPrice}</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Box Info */}
            <Card className="bg-card border-border">
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Box Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-bold text-foreground">$2.79 / 70 Coins</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items:</span>
                    <span className="font-bold text-foreground">15 Items</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Value:</span>
                    <span className="font-bold text-primary">$2,000+</span>
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
                    { user: "Player1", item: "iPhone 16 - Ultramarine", value: "$799.99", time: "2 min ago" },
                    { user: "Player2", item: "iPhone 16e - White", value: "$599.99", time: "5 min ago" },
                    { user: "Player3", item: "iPhone 12 - Black", value: "$249.99", time: "8 min ago" },
                  ].map((win, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <Smartphone className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground">{win.user}</div>
                        <div className="text-xs text-muted-foreground">{win.item}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-primary">{win.value}</div>
                        <div className="text-xs text-muted-foreground">{win.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
