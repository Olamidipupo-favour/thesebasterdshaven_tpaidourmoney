"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, Clock, Loader2, Gift } from "lucide-react"
import { useBoxes } from "@/hooks/use-boxes"
import Link from "next/link"

const rarityColors = {
  common: "bg-gray-500",
  rare: "bg-blue-500",
  epic: "bg-purple-500",
  legendary: "bg-yellow-500",
}

export function FeaturedBoxesSection() {
  const { boxes, isLoading } = useBoxes()

  if (isLoading) {
    return (
      <div className="mb-12 flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  const featuredBoxes = boxes?.filter((box) => box.trending).slice(0, 6) || []

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Badge className="bg-primary/20 text-primary border-primary/30 mb-2">
            <TrendingUp className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Featured Mystery Boxes</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover & win the hottest items in our provably fair boxes. Each box contains amazing prizes waiting to be revealed!
        </p>
      </div>

      {/* Featured Boxes Grid - RillaBox Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className={`${rarityColors[box.rarity]} text-white capitalize`}>{box.rarity}</Badge>
                  {box.trending && (
                    <Badge variant="secondary" className="bg-chart-2/20 text-chart-2">
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

              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-3">{box.name}</h3>
                <p className="text-muted-foreground mb-6 line-clamp-2">{box.description}</p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-primary">{box.price}</span>
                    <span className="text-sm text-muted-foreground">coins</span>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < 4 ? "fill-current" : ""}`} />
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href="/boxes">
                    <Button className="w-full glow-effect group-hover:bg-primary/90 text-lg py-3">
                      <Gift className="w-5 h-5 mr-2" />
                      Open Mystery Box
                    </Button>
                  </Link>

                  <div className="flex items-center justify-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    Last opened 2m ago
                  </div>
                </div>
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

      {/* View All Button */}
      <div className="text-center mt-12">
        <Button variant="outline" size="lg" className="px-8">
          View All Mystery Boxes
        </Button>
      </div>
    </section>
  )
}
