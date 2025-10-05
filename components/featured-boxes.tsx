"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, Clock, Loader2 } from "lucide-react"
import { useBoxes } from "@/hooks/use-boxes"
import Link from "next/link"

const rarityColors = {
  common: "bg-gray-500",
  rare: "bg-blue-500",
  epic: "bg-purple-500",
  legendary: "bg-yellow-500",
}

export function FeaturedBoxes() {
  const { boxes, isLoading } = useBoxes()

  if (isLoading) {
    return (
      <div className="mb-12 flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  const featuredBoxes = boxes?.filter((box) => box.trending).slice(0, 4) || []

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Boxes</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover & win the hottest items in our provably fair boxes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredBoxes.length > 0 ? (
          featuredBoxes.map((box) => (
            <Card
              key={box.id}
              className="group bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={box.image || "/placeholder.svg"}
                  alt={box.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge className={`${rarityColors[box.rarity]} text-white capitalize`}>{box.rarity}</Badge>
                  {box.trending && (
                    <Badge variant="secondary" className="bg-chart-2/20 text-chart-2">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Hot
                    </Badge>
                  )}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-bold text-foreground mb-2">{box.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{box.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-primary">{box.price} coins</span>
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < 4 ? "fill-current" : ""}`} />
                    ))}
                  </div>
                </div>

                <Link href="/mystery-box">
                  <Button className="w-full glow-effect group-hover:bg-primary/90">Open Box</Button>
                </Link>

                <div className="flex items-center justify-center mt-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  Last opened 2m ago
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-4 text-center py-12">
            <p className="text-muted-foreground">No featured boxes available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}
