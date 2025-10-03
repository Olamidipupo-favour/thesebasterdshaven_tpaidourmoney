"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  UserPlus, 
  CreditCard, 
  Gift, 
  Truck,
  MenuBoard,
  UserSquare,
  IcGift,
  TruckIc
} from "lucide-react"

const steps = [
  {
    id: 1,
    title: "Sign Up",
    description: "Get started in seconds! Connect through Google, Facebook, or Twitter, or simply sign up with your email to unbox incredible mystery boxes here at O Sortudo.",
    icon: <UserPlus className="w-8 h-8" />,
    bgColor: "bg-primary/20",
    iconColor: "text-primary"
  },
  {
    id: 2,
    title: "Top Up Your Account With Credits",
    description: "Start your unboxing journey now! Simply top up your credits by clicking 'Deposit' button on desktop and + button on mobile. Choose your preferred payment method; we accept most major credit/debit cards as well as crypto.",
    icon: <CreditCard className="w-8 h-8" />,
    bgColor: "bg-secondary/20",
    iconColor: "text-secondary"
  },
  {
    id: 3,
    title: "Unbox Hyped Products",
    description: "Indulge in our exclusive collection of 50+ hand-crafted mystery boxes. Unveil authentic products and seize the chance to own rare pieces at a fraction of their price. Reward yourself with top brand treasures from brands such as Gucci, Louis Vuitton, Nike & many more!",
    icon: <Gift className="w-8 h-8" />,
    bgColor: "bg-chart-1/20",
    iconColor: "text-chart-1"
  },
  {
    id: 4,
    title: "Ship Your Products",
    description: "Relax as we deliver your unboxed products right to your doorstep. With global shipping and minimized costs, you can expect delivery within 7 days to 21 days, as we strive to improve!",
    icon: <Truck className="w-8 h-8" />,
    bgColor: "bg-chart-2/20",
    iconColor: "text-chart-2"
  }
]

export function HowItWorksSection() {
  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">How it works</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Check out how easy the unboxing process is at O Sortudo!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <Card key={step.id} className="bg-card border-border overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="p-6 text-center">
              {/* Step Number */}
              <div className="flex items-center justify-center mb-6">
                <Badge className="bg-primary text-primary-foreground text-lg px-4 py-2">
                  STEP {step.id}
                </Badge>
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className={step.iconColor}>
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-4">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
