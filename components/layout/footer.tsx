"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center coin-spin">
                <span className="text-primary-foreground font-bold text-lg">🍀</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">O SORTUDO</h3>
                <p className="text-sm text-muted-foreground">Irish Gaming Platform</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Experience the luck of the Irish with our mystery boxes, live drops, and exciting games. 
              Fair, fun, and rewarding gaming experience.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm" className="p-2">
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="p-2">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="p-2">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="p-2">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#mystery-boxes" className="text-muted-foreground hover:text-primary transition-colors">
                  Mystery Boxes
                </Link>
              </li>
              <li>
                <Link href="#games" className="text-muted-foreground hover:text-primary transition-colors">
                  Games
                </Link>
              </li>
              <li>
                <Link href="#live-drops" className="text-muted-foreground hover:text-primary transition-colors">
                  Live Drops
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-6">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#help" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#tutorial" className="text-muted-foreground hover:text-primary transition-colors">
                  Tutorial
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-6">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#terms" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#privacy" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#responsible" className="text-muted-foreground hover:text-primary transition-colors">
                  Responsible Gaming
                </Link>
              </li>
              <li>
                <Link href="#age" className="text-muted-foreground hover:text-primary transition-colors">
                  Age Verification
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © 2024 O Sortudo. All rights reserved.
              </p>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                <Shield className="w-3 h-3 mr-1" />
                Secure & Fair
              </Badge>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>18+ Only</span>
              <span>•</span>
              <span>Provably Fair</span>
              <span>•</span>
              <span>SSL Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}