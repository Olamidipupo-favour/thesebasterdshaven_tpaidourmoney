"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Gift, ShoppingCart } from "lucide-react"
import { useBoxes } from "@/hooks/use-boxes"
import Link from "next/link"

export function HeroSection() {
  const { boxes, isLoading } = useBoxes()
  
  // Get featured boxes (trending ones)
  const featuredBoxes = boxes?.filter((box) => box.trending).slice(0, 6) || []

  return (
    <div className="mb-16">
      {/* Featured Boxes Section - RillaBox Style */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured boxes</h2>
          <p className="text-lg text-muted-foreground">Discover & win the hottest items in our provably fair boxes</p>
        </div>

        {/* Featured Boxes Grid - RillaBox Exact Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {featuredBoxes.length > 0 ? (
            featuredBoxes.map((box) => (
              <Card
                key={box.id}
                className="group bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 overflow-hidden relative"
              >
                <div className="relative">
                  <img
                    src={box.image || "/placeholder.svg"}
                    alt={box.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className="bg-primary text-primary-foreground text-sm px-2 py-1">
                      {box.category}
                    </Badge>
                    {box.trending && (
                      <Badge variant="secondary" className="bg-chart-2/20 text-chart-2 text-sm px-2 py-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Hot
                      </Badge>
                    )}
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button className="bg-white text-gray-900 hover:bg-gray-100">
                      <Gift className="w-4 h-4 mr-2" />
                      Open Box
                    </Button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-foreground mb-2">{box.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-2xl font-bold text-primary">{box.price}</span>
                      <span className="text-sm text-muted-foreground">coins</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ${(box.price / 25).toFixed(2)} USD
                    </div>
                  </div>

                  <Link href="/boxes">
                    <Button className="w-full glow-effect group-hover:bg-primary/90 text-sm py-2">
                      <Gift className="w-4 h-4 mr-2" />
                      Open Mystery Box
                    </Button>
                  </Link>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-12 h-12 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg">No featured boxes available at the moment.</p>
            </div>
          )}
        </div>

        {/* Shop All Button */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg" className="px-8">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Shop All
          </Button>
        </div>
      </div>

      {/* Stats Section - RillaBox Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="flex items-center justify-center space-x-4 bg-card border border-border rounded-lg p-6">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">993,881+</div>
            <div className="text-sm text-muted-foreground">Users</div>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-4 bg-card border border-border rounded-lg p-6">
          <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
            <Gift className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">3,917,122+</div>
            <div className="text-sm text-muted-foreground">Mystery Boxes Opened</div>
          </div>
        </div>
      </div>
    </div>
  )
}
