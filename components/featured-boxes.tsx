"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, Clock } from "lucide-react"

const featuredBoxes = [
  {
    id: 1,
    name: "Amazon",
    description: "Tech gadgets and electronics",
    price: "$4.99",
    image: "/amazon-mystery-box.jpg",
    rarity: "Common",
    rarityColor: "bg-gray-500",
    odds: "1:5",
    trending: true,
  },
  {
    id: 2,
    name: "Call Of Duty",
    description: "Gaming gear and collectibles",
    price: "$9.99",
    image: "/call-of-duty-box.jpg",
    rarity: "Rare",
    rarityColor: "bg-blue-500",
    odds: "1:10",
    trending: false,
  },
  {
    id: 3,
    name: "Holidays",
    description: "Seasonal surprises and gifts",
    price: "$14.99",
    image: "/holiday-mystery-box.jpg",
    rarity: "Epic",
    rarityColor: "bg-purple-500",
    odds: "1:25",
    trending: true,
  },
  {
    id: 4,
    name: "India",
    description: "Cultural treasures and spices",
    price: "$7.99",
    image: "/india-cultural-box.jpg",
    rarity: "Uncommon",
    rarityColor: "bg-green-500",
    odds: "1:8",
    trending: false,
  },
]

export function FeaturedBoxes() {
  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Boxes</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover & win the hottest items in our provably fair boxes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredBoxes.map((box) => (
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
                <Badge className={`${box.rarityColor} text-white`}>{box.rarity}</Badge>
                {box.trending && (
                  <Badge variant="secondary" className="bg-chart-2/20 text-chart-2">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Hot
                  </Badge>
                )}
              </div>
              <div className="absolute top-3 right-3">
                <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white">{box.odds}</div>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-xl font-bold text-foreground mb-2">{box.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{box.description}</p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-primary">{box.price}</span>
                <div className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4" />
                </div>
              </div>

              <Button className="w-full glow-effect group-hover:bg-primary/90">Open Box</Button>

              <div className="flex items-center justify-center mt-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3 mr-1" />
                Last opened 2m ago
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
