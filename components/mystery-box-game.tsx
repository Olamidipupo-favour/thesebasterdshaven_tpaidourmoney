"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Coins, Gift, Star, Zap, Info } from "lucide-react"

interface Prize {
  id: number
  name: string
  value: string
  rarity: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary"
  image: string
  probability: number
}

interface MysteryBox {
  id: number
  name: string
  price: number
  localCoinsPrice: number
  image: string
  prizes: Prize[]
  theme: string
}

const mysteryBoxes: MysteryBox[] = [
  {
    id: 1,
    name: "Lucky Leprechaun Box",
    price: 4.99,
    localCoinsPrice: 125, // 25 coins = $1, so $4.99 = 125 coins
    image: "/leprechaun-treasure-box.jpg",
    theme: "Irish Luck",
    prizes: [
      {
        id: 1,
        name: "Four Leaf Clover Charm",
        value: "$2.50",
        rarity: "Common",
        image: "/clover-charm.jpg",
        probability: 40,
      },
      { id: 2, name: "Irish Gold Coin", value: "$5.00", rarity: "Uncommon", image: "/gold-coin.jpg", probability: 30 },
      { id: 3, name: "Leprechaun Hat", value: "$12.00", rarity: "Rare", image: "/leprechaun-hat.jpg", probability: 20 },
      { id: 4, name: "Pot of Gold", value: "$25.00", rarity: "Epic", image: "/pot-of-gold.jpg", probability: 8 },
      {
        id: 5,
        name: "Rainbow Treasure",
        value: "$100.00",
        rarity: "Legendary",
        image: "/rainbow-treasure.jpg",
        probability: 2,
      },
    ],
  },
  {
    id: 2,
    name: "Emerald Mystery",
    price: 9.99,
    localCoinsPrice: 250,
    image: "/emerald-mystery-box.jpg",
    theme: "Precious Gems",
    prizes: [
      { id: 6, name: "Small Emerald", value: "$5.00", rarity: "Common", image: "/small-emerald.jpg", probability: 35 },
      { id: 7, name: "Celtic Ring", value: "$15.00", rarity: "Uncommon", image: "/celtic-ring.jpg", probability: 30 },
      {
        id: 8,
        name: "Emerald Necklace",
        value: "$30.00",
        rarity: "Rare",
        image: "/emerald-necklace.jpg",
        probability: 25,
      },
      { id: 9, name: "Royal Emerald", value: "$75.00", rarity: "Epic", image: "/royal-emerald.jpg", probability: 8 },
      { id: 10, name: "Crown Jewel", value: "$200.00", rarity: "Legendary", image: "/crown-jewel.jpg", probability: 2 },
    ],
  },
]

const rarityColors = {
  Common: "bg-gray-500",
  Uncommon: "bg-green-500",
  Rare: "bg-blue-500",
  Epic: "bg-purple-500",
  Legendary: "bg-yellow-500",
}

export function MysteryBoxGame() {
  const [selectedBox, setSelectedBox] = useState<MysteryBox | null>(null)
  const [isOpening, setIsOpening] = useState(false)
  const [openingProgress, setOpeningProgress] = useState(0)
  const [wonPrize, setWonPrize] = useState<Prize | null>(null)
  const [userCoins, setUserCoins] = useState(1250)
  const [paymentMethod, setPaymentMethod] = useState<"usd" | "coins">("usd")

  const selectRandomPrize = (box: MysteryBox): Prize => {
    const random = Math.random() * 100
    let cumulative = 0

    for (const prize of box.prizes) {
      cumulative += prize.probability
      if (random <= cumulative) {
        return prize
      }
    }

    return box.prizes[0] // Fallback to first prize
  }

  const openBox = async (box: MysteryBox) => {
    if (paymentMethod === "coins" && userCoins < box.localCoinsPrice) {
      alert("Not enough Local Coins!")
      return
    }

    setSelectedBox(box)
    setIsOpening(true)
    setOpeningProgress(0)
    setWonPrize(null)

    // Simulate opening animation
    const interval = setInterval(() => {
      setOpeningProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          const prize = selectRandomPrize(box)
          setWonPrize(prize)
          setIsOpening(false)

          // Deduct payment and add Local Coins if paid with USD
          if (paymentMethod === "usd") {
            setUserCoins((prev) => prev + Math.floor(box.price)) // Add 1 coin per $1 spent
          } else {
            setUserCoins((prev) => prev - box.localCoinsPrice)
          }

          return 100
        }
        return prev + 2
      })
    }, 50)
  }

  const resetGame = () => {
    setSelectedBox(null)
    setIsOpening(false)
    setOpeningProgress(0)
    setWonPrize(null)
  }

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Mystery Box Game</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
          Open mystery boxes and win amazing prizes! Pay with USD or Local Coins.
        </p>

        {/* User Coins Display */}
        <div className="flex items-center justify-center space-x-2 bg-secondary/20 px-4 py-2 rounded-full inline-flex">
          <Coins className="w-5 h-5 text-secondary" />
          <span className="font-bold text-lg">{userCoins}</span>
          <span className="text-sm text-muted-foreground">Local Coins</span>
        </div>
      </div>

      {!selectedBox ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mysteryBoxes.map((box) => (
            <Card key={box.id} className="bg-card border-border overflow-hidden">
              <div className="relative">
                <img src={box.image || "/placeholder.svg"} alt={box.name} className="w-full h-64 object-cover" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground">{box.theme}</Badge>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-4">{box.name}</h3>

                {/* Prize Preview */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-3">POSSIBLE PRIZES:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {box.prizes.slice(0, 4).map((prize) => (
                      <div key={prize.id} className="flex items-center space-x-2 text-xs">
                        <div className={`w-2 h-2 rounded-full ${rarityColors[prize.rarity]}`}></div>
                        <span className="truncate">{prize.name}</span>
                        <span className="text-muted-foreground">({prize.probability}%)</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="mb-4">
                  <div className="flex space-x-2 mb-3">
                    <Button
                      variant={paymentMethod === "usd" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPaymentMethod("usd")}
                      className="flex-1"
                    >
                      ${box.price} USD
                    </Button>
                    <Button
                      variant={paymentMethod === "coins" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPaymentMethod("coins")}
                      className="flex-1"
                      disabled={userCoins < box.localCoinsPrice}
                    >
                      <Coins className="w-4 h-4 mr-1" />
                      {box.localCoinsPrice}
                    </Button>
                  </div>

                  {paymentMethod === "usd" && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Info className="w-3 h-3 mr-1" />
                      You'll receive {Math.floor(box.price)} Local Coins when you pay with USD
                    </div>
                  )}
                </div>

                <Button
                  onClick={() => openBox(box)}
                  className="w-full glow-effect"
                  disabled={paymentMethod === "coins" && userCoins < box.localCoinsPrice}
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Open Mystery Box
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <Card className="bg-card border-border overflow-hidden">
            <div className="p-8 text-center">
              {isOpening ? (
                <div className="space-y-6">
                  <div className="relative">
                    <img
                      src={selectedBox.image || "/placeholder.svg"}
                      alt={selectedBox.name}
                      className={`w-48 h-48 mx-auto rounded-lg object-cover ${isOpening ? "animate-bounce" : ""}`}
                    />
                    <div className="absolute inset-0 bg-primary/20 rounded-lg animate-pulse"></div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-foreground">Opening {selectedBox.name}...</h3>
                    <Progress value={openingProgress} className="w-full" />
                    <div className="flex items-center justify-center space-x-2 text-primary">
                      <Zap className="w-5 h-5 animate-spin" />
                      <span className="font-semibold">Revealing your prize...</span>
                    </div>
                  </div>
                </div>
              ) : wonPrize ? (
                <div className="space-y-6">
                  <div className="relative">
                    <img
                      src={wonPrize.image || "/placeholder.svg"}
                      alt={wonPrize.name}
                      className="w-48 h-48 mx-auto rounded-lg object-cover glow-effect"
                    />
                    <div className="absolute -top-2 -right-2">
                      <Badge className={`${rarityColors[wonPrize.rarity]} text-white`}>{wonPrize.rarity}</Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-foreground">Congratulations!</h3>
                    <h4 className="text-xl text-primary font-semibold">{wonPrize.name}</h4>
                    <div className="flex items-center justify-center space-x-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-2xl font-bold text-secondary">{wonPrize.value}</p>

                    <div className="flex space-x-4 justify-center">
                      <Button onClick={resetGame} variant="outline">
                        Open Another Box
                      </Button>
                      <Button className="glow-effect">Claim Prize</Button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
