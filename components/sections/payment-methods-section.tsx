"use client"

import { Card } from "@/components/ui/card"
import { CreditCard } from "lucide-react"

const paymentMethods = [
  { name: "Visa", logo: "/payment-logos/visa.png" },
  { name: "Master Card", logo: "/payment-logos/mastercard.png" },
  { name: "Skirlls", logo: "/payment-logos/skirlls.png" },
  { name: "Google Pay", logo: "/payment-logos/google-pay.png" },
  { name: "Tether", logo: "/payment-logos/tether.png" },
  { name: "Bitcoin", logo: "/payment-logos/bitcoin.png" },
  { name: "Ethereum", logo: "/payment-logos/ethereum.png" },
  { name: "Solana", logo: "/payment-logos/solana.png" }
]

export function PaymentMethodsSection() {
  return (
    <section className="mb-16">
      <Card className="bg-card border-border overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <CreditCard className="w-8 h-8 text-primary mr-3" />
              <h2 className="text-3xl font-bold text-foreground">Payment</h2>
            </div>
            <h3 className="text-xl font-semibold text-muted-foreground">Methods</h3>
          </div>

          {/* Payment Methods Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors duration-300 group"
              >
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{method.name.charAt(0)}</span>
                  </div>
                </div>
                <span className="text-sm font-medium text-foreground text-center">{method.name}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </section>
  )
}
