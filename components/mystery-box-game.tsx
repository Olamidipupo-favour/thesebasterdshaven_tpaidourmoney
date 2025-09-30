"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Coins, Gift, Star, Zap, Info, Loader2 } from "lucide-react"
import { useBoxes, useOpenBox } from "@/hooks/use-boxes"
import { useAuth } from "@/hooks/use-auth"
import type { MysteryBox, BoxItem } from "@/lib/api/types"

const rarityColors = {
  common: "bg-gray-500",
  rare: "bg-blue-500",
  epic: "bg-purple-500",
  legendary: "bg-yellow-500",
}

export function MysteryBoxGame() {
  const { boxes, isLoading: loadingBoxes } = useBoxes()
  const { openBox, isOpening } = useOpenBox()
  const { user, isAuthenticated } = useAuth()
  const [selectedBox, setSelectedBox] = useState<MysteryBox | null>(null)
  const [openingProgress, setOpeningProgress] = useState(0)
  const [wonPrize, setWonPrize] = useState<BoxItem | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<"usd" | "coins">("coins")

  const handleOpenBox = async (box: MysteryBox) => {
    if (!isAuthenticated) {
      alert("Please sign in to open boxes")
      return
    }

    if (paymentMethod === "coins" && user && user.balance < box.price) {
      alert("Not enough Local Coins!")
      return
    }

    setSelectedBox(box)
    setOpeningProgress(0)
    setWonPrize(null)

    // Simulate opening animation
    const interval = setInterval(() => {
      setOpeningProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + 2
      })
    }, 50)

    const result = await openBox(box.id, {
      quantity: 1,
      payment_method: paymentMethod,
    })

    clearInterval(interval)
    setOpeningProgress(100)

    if (result && result.items && result.items.length > 0) {
      setTimeout(() => {
        setWonPrize(result.items[0])
      }, 500)
    }
  }

  const resetGame = () => {
    setSelectedBox(null)
    setOpeningProgress(0)
    setWonPrize(null)
  }

  if (loadingBoxes) {
    return (
      <div className="mb-12 flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Mystery Box Game</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
          Open mystery boxes and win amazing prizes! Pay with USD or Local Coins.
        </p>

        {isAuthenticated && user && (
          <div className="flex items-center justify-center space-x-2 bg-secondary/20 px-4 py-2 rounded-full inline-flex">
            <Coins className="w-5 h-5 text-secondary" />
            <span className="font-bold text-lg">{user.balance?.toLocaleString() || 0}</span>
            <span className="text-sm text-muted-foreground">Local Coins</span>
          </div>
        )}
      </div>

      {!selectedBox ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {boxes && boxes.length > 0 ? (
            boxes.map((box) => (
              <Card key={box.id} className="bg-card border-border overflow-hidden">
                <div className="relative">
                  <img src={box.image || "/placeholder.svg"} alt={box.name} className="w-full h-64 object-cover" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground">{box.category}</Badge>
                  </div>
                  {box.trending && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-chart-2/20 text-chart-2">
                        Trending
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{box.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{box.description}</p>

                  {/* Prize Preview */}
                  {box.items && box.items.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-muted-foreground mb-3">POSSIBLE PRIZES:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {box.items.slice(0, 4).map((item) => (
                          <div key={item.id} className="flex items-center space-x-2 text-xs">
                            <div className={`w-2 h-2 rounded-full ${rarityColors[item.rarity]}`}></div>
                            <span className="truncate">{item.name}</span>
                            <span className="text-muted-foreground">({item.probability}%)</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Payment Method Selection */}
                  <div className="mb-4">
                    <div className="flex space-x-2 mb-3">
                      <Button
                        variant={paymentMethod === "usd" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPaymentMethod("usd")}
                        className="flex-1"
                      >
                        ${(box.price / 25).toFixed(2)} USD
                      </Button>
                      <Button
                        variant={paymentMethod === "coins" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPaymentMethod("coins")}
                        className="flex-1"
                        disabled={!isAuthenticated || (user && user.balance < box.price)}
                      >
                        <Coins className="w-4 h-4 mr-1" />
                        {box.price}
                      </Button>
                    </div>

                    {paymentMethod === "usd" && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Info className="w-3 h-3 mr-1" />
                        You'll receive {Math.floor(box.price / 25)} Local Coins when you pay with USD
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={() => handleOpenBox(box)}
                    className="w-full glow-effect"
                    disabled={
                      !isAuthenticated || isOpening || (paymentMethod === "coins" && user && user.balance < box.price)
                    }
                  >
                    {isOpening ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Opening...
                      </>
                    ) : (
                      <>
                        <Gift className="w-4 h-4 mr-2" />
                        Open Mystery Box
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-muted-foreground">No mystery boxes available at the moment.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <Card className="bg-card border-border overflow-hidden">
            <div className="p-8 text-center">
              {!wonPrize ? (
                <div className="space-y-6">
                  <div className="relative">
                    <img
                      src={selectedBox.image || "/placeholder.svg"}
                      alt={selectedBox.name}
                      className="w-48 h-48 mx-auto rounded-lg object-cover animate-bounce"
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
              ) : (
                <div className="space-y-6">
                  <div className="relative">
                    <img
                      src={wonPrize.image || "/placeholder.svg"}
                      alt={wonPrize.name}
                      className="w-48 h-48 mx-auto rounded-lg object-cover glow-effect"
                    />
                    <div className="absolute -top-2 -right-2">
                      <Badge className={`${rarityColors[wonPrize.rarity]} text-white capitalize`}>
                        {wonPrize.rarity}
                      </Badge>
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
                    <p className="text-2xl font-bold text-secondary">${wonPrize.value.toFixed(2)}</p>

                    <div className="flex space-x-4 justify-center">
                      <Button onClick={resetGame} variant="outline">
                        Open Another Box
                      </Button>
                      <Button className="glow-effect">Claim Prize</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
