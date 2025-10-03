"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  MessageCircle, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail,
  Shield,
  FileText,
  HelpCircle
} from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section - EXACT RillaBox Footer */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img src="https://rillabox.com/logo/rillabox-logo.png" alt="O SORTUDO" className="h-8 w-auto mb-4" />
            </div>
          </div>

          {/* Legal Section - EXACT RillaBox Footer */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-6">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#shipping" className="text-muted-foreground hover:text-primary transition-colors">
                  Shipping & Return Policy
                </Link>
              </li>
              <li>
                <Link href="#aml" className="text-muted-foreground hover:text-primary transition-colors">
                  AML Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Games Section - EXACT RillaBox Footer */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-6">Games</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Mystery Boxes
                </Link>
              </li>
              <li>
                <Link href="/battles" className="text-muted-foreground hover:text-primary transition-colors">
                  Battles
                </Link>
              </li>
              <li>
                <Link href="/crash" className="text-muted-foreground hover:text-primary transition-colors">
                  Crash
                </Link>
              </li>
              <li>
                <Link href="/plinko" className="text-muted-foreground hover:text-primary transition-colors">
                  Plinko
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Section - EXACT RillaBox Footer */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-6">Help</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#deposit" className="text-muted-foreground hover:text-primary transition-colors">
                  'How can I deposit on O Sortudo?'
                </Link>
              </li>
              <li>
                <Link href="#provably-fair" className="text-muted-foreground hover:text-primary transition-colors">
                  'How does Provable Fairness work?'
                </Link>
              </li>
              <li>
                <Link href="#shipping-info" className="text-muted-foreground hover:text-primary transition-colors">
                  'How does shipping work?'
                </Link>
              </li>
              <li>
                <Link href="#countries" className="text-muted-foreground hover:text-primary transition-colors">
                  'Which countries does O Sortudo ship to?'
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us & Contact - EXACT RillaBox Footer */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-6">Follow Us</h4>
            <div className="flex space-x-3 mb-6">
              <Link href="https://www.instagram.com/rillaboxofficial/" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <img src="https://rillabox.com/icons/instagram-filled.svg" alt="Instagram" className="w-6 h-6" />
              </Link>
              <Link href="https://www.facebook.com/people/RillaBox/100094306086732/" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <img src="https://rillabox.com/icons/facebook-filled.svg" alt="Facebook" className="w-6 h-6" />
              </Link>
              <Link href="https://t.me/+SfKiB6OCwzdmNmU0" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <img src="https://rillabox.com/icons/telegram-filled.svg" alt="Telegram" className="w-6 h-6" />
              </Link>
              <Link href="https://twitter.com/RillaBox" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <img src="https://rillabox.com/icons/twitter-filled.svg" alt="Twitter" className="w-6 h-6" />
              </Link>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-3">Contact Us</h4>
              <p className="text-sm text-muted-foreground">
                For any inquiries, contact us at support@osortudo.com. We're here to assist you!
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section - EXACT RillaBox Footer */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              © 2025 O Sortudo. All Rights Reserved
            </p>
            <p className="text-xs text-muted-foreground">
              O Sortudo is a brand name of TechNexus Ltd, Reg No: HE 449023, Having its registered address at 25 Voukourestiou Street, Neptune House, Limassol, 3045 Cyprus
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}