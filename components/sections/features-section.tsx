"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, ShoppingBag, Truck, CheckCircle } from "lucide-react"

const features = [
  {
    id: 1,
    title: "100% Authentic Items",
    description: "At O Sortudo, every item you receive is verified authentic from StockX or official retailers, guaranteeing you the real deal every time.",
    icon: <Shield className="w-8 h-8" />,
    bgColor: "bg-green-500/20",
    iconColor: "text-green-500"
  },
  {
    id: 2,
    title: "Exchange Unwanted Items",
    description: "Convert all items in your inventory into instant cash on O Sortudo. Unbox something that perfectly matches your style with no fees or hidden costs.",
    icon: <ShoppingBag className="w-8 h-8" />,
    bgColor: "bg-blue-500/20",
    iconColor: "text-blue-500"
  },
  {
    id: 3,
    title: "Worldwide Shipping",
    description: "Claim your prize & have it delivered to your doorstep, or withdraw the value.",
    icon: <Truck className="w-8 h-8" />,
    bgColor: "bg-purple-500/20",
    iconColor: "text-purple-500"
  }
]

export function FeaturesSection() {
  return (
    <section className="mb-16">
      {/* Provably Fair Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <CheckCircle className="w-8 h-8 text-primary mr-3" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Our industry-leading "Provably Fair" technology ensures that all mystery box draws are completely fair, guaranteeing a 100% fair experience.
          </h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-8">
          We uphold complete transparency and have no means of manipulating the outcome in any manner.
        </p>
        <Badge className="bg-primary/20 text-primary border-primary/30 text-lg px-6 py-3">
          Learn more
        </Badge>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <Card key={feature.id} className="bg-card border-border overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="p-8 text-center">
              {/* Icon */}
              <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className={feature.iconColor}>
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
