"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Coins, Gift, Star, Users, Clock, TrendingUp, Zap, User, Eye, X } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { OSortudoLayout } from "@/components/layout/rillabox-layout"

// First 15 boxes from Rillabox HTML - exact data
type Risk = { level: string; percent: number }
type Box = {
  id: string
  name: string
  description: string
  originalPrice: number
  currentPrice: number
  coinPrice: number
  category: string
  items: number
  totalValue: number
  trending: boolean
  recentWins: number
  lastWin: string
  image: string
  borderColor: string
  risk?: Risk
}
const boxes: Box[] = [
  {
    id: "1-percent-iphone",
    name: "1% iPhone",
    description: "Win authentic iPhones from iPhone 12 to iPhone 15 Pro Max",
    originalPrice: 3.94,
    currentPrice: 2.79,
    coinPrice: 70,
    category: "Electronics",
    items: 15,
    totalValue: 2000,
    trending: true,
    recentWins: 127,
    lastWin: "2 minutes ago",
    image: "https://cdn.rillabox.com/media/boxes/08_1__IPHONE-Box-mock_box_1.png",
    borderColor: "#FFBE0B"
  },
  {
    id: "1-percent-pc",
    name: "1% PC",
    description: "Win gaming PCs and components",
    originalPrice: 4.13,
    currentPrice: 2.89,
    coinPrice: 72,
    category: "Gaming",
    items: 12,
    totalValue: 1500,
    trending: false,
    recentWins: 89,
    lastWin: "5 minutes ago",
    image: "https://cdn.rillabox.com/media/boxes/07_1__PC-Box-mock_box_1.png",
    borderColor: "#9D1FC3"
  },
  {
    id: "acer",
    name: "Acer",
    description: "Win Acer laptops and accessories",
    originalPrice: 8.79,
    currentPrice: 6.99,
    coinPrice: 175,
    category: "Technology",
    items: 10,
    totalValue: 800,
    trending: true,
    recentWins: 203,
    lastWin: "1 minute ago",
    image: "https://cdn.rillabox.com/media/boxes/04_ACER-Box-mock_box_1_1.png",
    borderColor: "#00A651"
  },
  {
    id: "adidas-bape",
    name: "Adidas x BAPE",
    description: "Win exclusive Adidas x BAPE collaboration items",
    originalPrice: 22.99,
    currentPrice: 18.79,
    coinPrice: 470,
    category: "Fashion",
    items: 8,
    totalValue: 5000,
    trending: false,
    recentWins: 45,
    lastWin: "10 minutes ago",
    image: "https://cdn.rillabox.com/media/boxes/BAPE_X_ADIDAS-mock_box.png",
    borderColor: "#00A651"
  },
  {
    id: "adidas-gucci",
    name: "Adidas x Gucci",
    description: "Win luxury Adidas x Gucci items",
    originalPrice: 84.49,
    currentPrice: 69.99,
    coinPrice: 1750,
    category: "Fashion",
    items: 12,
    totalValue: 3000,
    trending: true,
    recentWins: 156,
    lastWin: "3 minutes ago",
    image: "https://cdn.rillabox.com/media/boxes/GUCCI_X_ADIDAS-mock_box.png",
    borderColor: "#8B4513"
  },
  {
    id: "adin-ross",
    name: "Adin Ross",
    description: "Win Adin Ross merchandise and exclusive items",
    originalPrice: 14.49,
    currentPrice: 12.79,
    coinPrice: 320,
    category: "Gaming",
    items: 14,
    totalValue: 2500,
    trending: false,
    recentWins: 78,
    lastWin: "7 minutes ago",
    image: "https://cdn.rillabox.com/media/boxes/Adin-Ross.png",
    borderColor: "#00A651"
  },
  {
    id: "alexander-mcqueen",
    name: "Alexander McQueen",
    description: "Win luxury Alexander McQueen fashion items",
    originalPrice: 72.48,
    currentPrice: 63.99,
    coinPrice: 1600,
    category: "Fashion",
    items: 8,
    totalValue: 4000,
    trending: true,
    recentWins: 92,
    lastWin: "4 minutes ago",
    image: "https://cdn.rillabox.com/media/boxes/05_ALEXANDER_MCQUEEN-Box-mock_box_1.png",
    borderColor: "#000000"
  },
  {
    id: "alfa-romeo",
    name: "Alfa Romeo",
    description: "Win Alfa Romeo car accessories and merchandise",
    originalPrice: 564.99,
    currentPrice: 469.99,
    coinPrice: 11750,
    category: "Technology",
    items: 6,
    totalValue: 8000,
    trending: false,
    recentWins: 23,
    lastWin: "15 minutes ago",
    image: "https://cdn.rillabox.com/media/boxes/06_ALFA_ROMEO-Box-mock_box_1.png",
    borderColor: "#C8102E"
  },
  {
    id: "alienware",
    name: "Alienware",
    description: "Win Alienware gaming laptops and accessories",
    originalPrice: 16.89,
    currentPrice: 14.49,
    coinPrice: 362,
    category: "Gaming",
    items: 10,
    totalValue: 1200,
    trending: true,
    recentWins: 134,
    lastWin: "2 minutes ago",
    image: "https://cdn.rillabox.com/media/boxes/19-ALIENWARE-Box-mock_box.png",
    borderColor: "#000000"
  },
  {
    id: "amazon",
    name: "Amazon",
    description: "Win Amazon gift cards and electronics",
    originalPrice: 8.49,
    currentPrice: 6.79,
    coinPrice: 170,
    category: "Electronics",
    items: 12,
    totalValue: 600,
    trending: false,
    recentWins: 89,
    lastWin: "6 minutes ago",
    image: "https://cdn.rillabox.com/media/boxes/Amazon.png",
    borderColor: "#FF9900"
  },
  {
    id: "amg-vs-bmw",
    name: "AMG Vs BMW",
    description: "Win luxury car accessories from AMG and BMW",
    originalPrice: 954.49,
    currentPrice: 829.99,
    coinPrice: 20750,
    category: "Technology",
    items: 8,
    totalValue: 15000,
    trending: true,
    recentWins: 12,
    lastWin: "30 minutes ago",
    image: "https://cdn.rillabox.com/media/boxes/05_AMG_VS_BMW__-Box-mock_box.png",
    borderColor: "#000000"
  },
  {
    id: "antisocial-social-club",
    name: "AntiSocialSocialClub",
    description: "Win AntiSocialSocialClub streetwear",
    originalPrice: 9.59,
    currentPrice: 7.99,
    coinPrice: 200,
    category: "Fashion",
    items: 10,
    totalValue: 400,
    trending: false,
    recentWins: 156,
    lastWin: "3 minutes ago",
    image: "https://cdn.rillabox.com/media/boxes/03_ANTI_SOCIAL_SOCIAL_CLUB-Box-mock_box_1.png",
    borderColor: "#FF69B4"
  },
  {
    id: "ap-vs-rolex",
    name: "AP Vs Rolex",
    description: "Win luxury watches from Audemars Piguet and Rolex",
    originalPrice: 2549.98,
    currentPrice: 2189.98,
    coinPrice: 54750,
    category: "Fashion",
    items: 6,
    totalValue: 25000,
    trending: true,
    recentWins: 8,
    lastWin: "1 hour ago",
    image: "https://cdn.rillabox.com/media/boxes/26_AP_VS_ROLEX-Box-mock_box.png",
    borderColor: "#FFD700"
  },
  {
    id: "apple-budget",
    name: "Apple Budget",
    description: "Win Apple accessories and budget items",
    originalPrice: 8.09,
    currentPrice: 5.99,
    coinPrice: 150,
    category: "Electronics",
    items: 10,
    totalValue: 800,
    trending: true,
    recentWins: 203,
    lastWin: "1 minute ago",
    image: "https://cdn.rillabox.com/media/boxes/APPLE-Budget-mock_box_1_1.png",
    borderColor: "#D6D6D6"
  },
  {
    id: "apple-deluxe",
    name: "Apple Deluxe",
    description: "Win premium Apple products",
    originalPrice: 118.89,
    currentPrice: 109.99,
    coinPrice: 2750,
    category: "Electronics",
    items: 8,
    totalValue: 5000,
    trending: false,
    recentWins: 45,
    lastWin: "10 minutes ago",
    image: "https://cdn.rillabox.com/media/boxes/Apple-deluxe.png",
    borderColor: "#8A8A95"
  }
]

// Mock items for each box - updated for new box IDs
const boxItems = {
  "1-percent-iphone": [
    { id: 1, name: "iPhone 15 Pro Max 256GB", value: 1199, rarity: "Legendary", image: "https://rillabox.s3.amazonaws.com/media/items/iPhone-15-Pro-Max-256GB.png" },
    { id: 2, name: "iPhone 15 Pro 128GB", value: 999, rarity: "Epic", image: "https://rillabox.s3.amazonaws.com/media/items/iPhone-15-Pro-128GB.png" },
    { id: 3, name: "iPhone 15 128GB", value: 799, rarity: "Rare", image: "https://rillabox.s3.amazonaws.com/media/items/iPhone-15-128GB.png" },
    { id: 4, name: "iPhone 14 Pro Max 128GB", value: 899, rarity: "Rare", image: "https://rillabox.s3.amazonaws.com/media/items/iPhone-14-Pro-Max-128GB.png" },
    { id: 5, name: "iPhone 14 Pro 128GB", value: 699, rarity: "Uncommon", image: "https://rillabox.s3.amazonaws.com/media/items/iPhone-14-Pro-128GB.png" }
  ],
  "1-percent-pc": [
    { id: 1, name: "RTX 4090 Gaming PC", value: 2500, rarity: "Legendary", image: "https://rillabox.s3.amazonaws.com/media/items/RTX-4090-PC.png" },
    { id: 2, name: "RTX 4080 Gaming PC", value: 1800, rarity: "Epic", image: "https://rillabox.s3.amazonaws.com/media/items/RTX-4080-PC.png" },
    { id: 3, name: "RTX 4070 Gaming PC", value: 1200, rarity: "Rare", image: "https://rillabox.s3.amazonaws.com/media/items/RTX-4070-PC.png" },
    { id: 4, name: "RTX 4060 Gaming PC", value: 800, rarity: "Uncommon", image: "https://rillabox.s3.amazonaws.com/media/items/RTX-4060-PC.png" },
    { id: 5, name: "RTX 3060 Gaming PC", value: 600, rarity: "Common", image: "https://rillabox.s3.amazonaws.com/media/items/RTX-3060-PC.png" }
  ],
  "acer": [
    { id: 1, name: "Acer Predator Helios 16", value: 1299, rarity: "Epic", image: "https://rillabox.s3.amazonaws.com/media/items/Acer-Predator-Helios-16.png" },
    { id: 2, name: "Acer Swift X", value: 899, rarity: "Rare", image: "https://rillabox.s3.amazonaws.com/media/items/Acer-Swift-X.png" },
    { id: 3, name: "Acer Aspire 5", value: 599, rarity: "Uncommon", image: "https://rillabox.s3.amazonaws.com/media/items/Acer-Aspire-5.png" },
    { id: 4, name: "Acer Nitro 5", value: 799, rarity: "Rare", image: "https://rillabox.s3.amazonaws.com/media/items/Acer-Nitro-5.png" },
    { id: 5, name: "Acer Chromebook", value: 299, rarity: "Common", image: "https://rillabox.s3.amazonaws.com/media/items/Acer-Chromebook.png" }
  ],
  "adidas-bape": [
    { id: 1, name: "Adidas x BAPE Ultraboost", value: 299, rarity: "Epic", image: "https://rillabox.s3.amazonaws.com/media/items/Adidas-BAPE-Ultraboost.png" },
    { id: 2, name: "Adidas x BAPE Hoodie", value: 199, rarity: "Rare", image: "https://rillabox.s3.amazonaws.com/media/items/Adidas-BAPE-Hoodie.png" },
    { id: 3, name: "Adidas x BAPE T-Shirt", value: 89, rarity: "Uncommon", image: "https://rillabox.s3.amazonaws.com/media/items/Adidas-BAPE-TShirt.png" },
    { id: 4, name: "Adidas x BAPE Track Pants", value: 149, rarity: "Rare", image: "https://rillabox.s3.amazonaws.com/media/items/Adidas-BAPE-TrackPants.png" },
    { id: 5, name: "Adidas x BAPE Cap", value: 59, rarity: "Common", image: "https://rillabox.s3.amazonaws.com/media/items/Adidas-BAPE-Cap.png" }
  ],
  "adidas-gucci": [
    { id: 1, name: "Adidas x Gucci Gazelle", value: 899, rarity: "Legendary", image: "https://rillabox.s3.amazonaws.com/media/items/Adidas-Gucci-Gazelle.png" },
    { id: 2, name: "Adidas x Gucci Hoodie", value: 1299, rarity: "Legendary", image: "https://rillabox.s3.amazonaws.com/media/items/Adidas-Gucci-Hoodie.png" },
    { id: 3, name: "Adidas x Gucci T-Shirt", value: 399, rarity: "Epic", image: "https://rillabox.s3.amazonaws.com/media/items/Adidas-Gucci-TShirt.png" },
    { id: 4, name: "Adidas x Gucci Track Jacket", value: 799, rarity: "Epic", image: "https://rillabox.s3.amazonaws.com/media/items/Adidas-Gucci-TrackJacket.png" },
    { id: 5, name: "Adidas x Gucci Bag", value: 599, rarity: "Rare", image: "https://rillabox.s3.amazonaws.com/media/items/Adidas-Gucci-Bag.png" }
  ],
  "adin-ross": [
    { id: 1, name: "Adin Ross Gaming Setup", value: 2999, rarity: "Legendary", image: "https://rillabox.s3.amazonaws.com/media/items/Adin-Ross-Gaming-Setup.png" },
    { id: 2, name: "Adin Ross Merch Hoodie", value: 79, rarity: "Rare", image: "https://rillabox.s3.amazonaws.com/media/items/Adin-Ross-Hoodie.png" },
    { id: 3, name: "Adin Ross T-Shirt", value: 39, rarity: "Uncommon", image: "https://rillabox.s3.amazonaws.com/media/items/Adin-Ross-TShirt.png" },
    { id: 4, name: "Adin Ross Gaming Chair", value: 299, rarity: "Epic", image: "https://rillabox.s3.amazonaws.com/media/items/Adin-Ross-Gaming-Chair.png" },
    { id: 5, name: "Adin Ross Cap", value: 29, rarity: "Common", image: "https://rillabox.s3.amazonaws.com/media/items/Adin-Ross-Cap.png" }
  ],
  "alexander-mcqueen": [
    { id: 1, name: "Alexander McQueen Sneakers", value: 899, rarity: "Epic", image: "https://rillabox.s3.amazonaws.com/media/items/Alexander-McQueen-Sneakers.png" },
    { id: 2, name: "Alexander McQueen Jacket", value: 1299, rarity: "Legendary", image: "https://rillabox.s3.amazonaws.com/media/items/Alexander-McQueen-Jacket.png" },
    { id: 3, name: "Alexander McQueen T-Shirt", value: 299, rarity: "Rare", image: "https://rillabox.s3.amazonaws.com/media/items/Alexander-McQueen-TShirt.png" },
    { id: 4, name: "Alexander McQueen Bag", value: 799, rarity: "Epic", image: "https://rillabox.s3.amazonaws.com/media/items/Alexander-McQueen-Bag.png" },
    { id: 5, name: "Alexander McQueen Accessories", value: 199, rarity: "Uncommon", image: "https://rillabox.s3.amazonaws.com/media/items/Alexander-McQueen-Accessories.png" }
  ],
  "alfa-romeo": [
    { id: 1, name: "Alfa Romeo Giulia Quadrifoglio", value: 75000, rarity: "Legendary", image: "https://rillabox.s3.amazonaws.com/media/items/Alfa-Romeo-Giulia-Quadrifoglio.png" },
    { id: 2, name: "Alfa Romeo Stelvio", value: 45000, rarity: "Epic", image: "https://rillabox.s3.amazonaws.com/media/items/Alfa-Romeo-Stelvio.png" },
    { id: 3, name: "Alfa Romeo Merchandise", value: 99, rarity: "Uncommon", image: "https://rillabox.s3.amazonaws.com/media/items/Alfa-Romeo-Merchandise.png" },
    { id: 4, name: "Alfa Romeo Model Car", value: 49, rarity: "Common", image: "https://rillabox.s3.amazonaws.com/media/items/Alfa-Romeo-Model-Car.png" },
    { id: 5, name: "Alfa Romeo Keychain", value: 19, rarity: "Common", image: "https://rillabox.s3.amazonaws.com/media/items/Alfa-Romeo-Keychain.png" }
  ],
  "alienware": [
    { id: 1, name: "Alienware m18 Gaming Laptop", value: 2999, rarity: "Legendary", image: "https://rillabox.s3.amazonaws.com/media/items/Alienware-m18.png" },
    { id: 2, name: "Alienware Aurora R15", value: 1999, rarity: "Epic", image: "https://rillabox.s3.amazonaws.com/media/items/Alienware-Aurora-R15.png" },
    { id: 3, name: "Alienware Gaming Mouse", value: 99, rarity: "Rare", image: "https://rillabox.s3.amazonaws.com/media/items/Alienware-Gaming-Mouse.png" },
    { id: 4, name: "Alienware Gaming Keyboard", value: 149, rarity: "Rare", image: "https://rillabox.s3.amazonaws.com/media/items/Alienware-Gaming-Keyboard.png" },
    { id: 5, name: "Alienware Gaming Headset", value: 199, rarity: "Epic", image: "https://rillabox.s3.amazonaws.com/media/items/Alienware-Gaming-Headset.png" }
  ],
  "amazon": [
    { id: 1, name: "Amazon Gift Card $500", value: 500, rarity: "Epic", image: "https://rillabox.s3.amazonaws.com/media/items/Amazon-Gift-Card-500.png" },
    { id: 2, name: "Amazon Echo Dot", value: 49, rarity: "Uncommon", image: "https://rillabox.s3.amazonaws.com/media/items/Amazon-Echo-Dot.png" },
    { id: 3, name: "Amazon Fire TV Stick", value: 39, rarity: "Common", image: "https://rillabox.s3.amazonaws.com/media/items/Amazon-Fire-TV-Stick.png" },
    { id: 4, name: "Amazon Kindle", value: 89, rarity: "Rare", image: "https://rillabox.s3.amazonaws.com/media/items/Amazon-Kindle.png" },
    { id: 5, name: "Amazon Gift Card $100", value: 100, rarity: "Rare", image: "https://rillabox.s3.amazonaws.com/media/items/Amazon-Gift-Card-100.png" }
  ],
  "amg-vs-bmw": [
    { id: 1, name: "Mercedes-AMG GT", value: 120000, rarity: "Legendary", image: "https://rillabox.s3.amazonaws.com/media/items/Mercedes-AMG-GT.png" },
    { id: 2, name: "BMW M5 Competition", value: 110000, rarity: "Legendary", image: "https://rillabox.s3.amazonaws.com/media/items/BMW-M5-Competition.png" },
    { id: 3, name: "AMG Merchandise", value: 149, rarity: "Rare", image: "https://rillabox.s3.amazonaws.com/media/items/AMG-Merchandise.png" },
    { id: 4, name: "BMW Merchandise", value: 149, rarity: "Rare", image: "https://rillabox.s3.amazonaws.com/media/items/BMW-Merchandise.png" },
    { id: 5, name: "Luxury Car Accessories", value: 299, rarity: "Epic", image: "https://rillabox.s3.amazonaws.com/media/items/Luxury-Car-Accessories.png" }
  ],
  "antisocial-social-club": [
    { id: 1, name: "ASSC Hoodie", value: 89, rarity: "Rare", image: "https://rillabox.s3.amazonaws.com/media/items/ASSC-Hoodie.png" },
    { id: 2, name: "ASSC T-Shirt", value: 39, rarity: "Uncommon", image: "https://rillabox.s3.amazonaws.com/media/items/ASSC-TShirt.png" },
    { id: 3, name: "ASSC Cap", value: 49, rarity: "Uncommon", image: "https://rillabox.s3.amazonaws.com/media/items/ASSC-Cap.png" },
    { id: 4, name: "ASSC Sweatpants", value: 79, rarity: "Rare", image: "https://rillabox.s3.amazonaws.com/media/items/ASSC-Sweatpants.png" },
    { id: 5, name: "ASSC Accessories", value: 29, rarity: "Common", image: "https://rillabox.s3.amazonaws.com/media/items/ASSC-Accessories.png" }
  ],
  "ap-vs-rolex": [
    { id: 1, name: "Audemars Piguet Royal Oak", value: 45000, rarity: "Legendary", image: "https://rillabox.s3.amazonaws.com/media/items/AP-Royal-Oak.png" },
    { id: 2, name: "Rolex Submariner", value: 35000, rarity: "Legendary", image: "https://rillabox.s3.amazonaws.com/media/items/Rolex-Submariner.png" },
    { id: 3, name: "Luxury Watch Box", value: 299, rarity: "Rare", image: "https://rillabox.s3.amazonaws.com/media/items/Luxury-Watch-Box.png" },
    { id: 4, name: "Watch Winders", value: 199, rarity: "Uncommon", image: "https://rillabox.s3.amazonaws.com/media/items/Watch-Winders.png" },
    { id: 5, name: "Watch Straps", value: 99, rarity: "Common", image: "https://rillabox.s3.amazonaws.com/media/items/Watch-Straps.png" }
  ],
  "apple-budget": [
    { id: 1, name: "AirPods Pro 2nd Gen", value: 249, rarity: "Epic", image: "https://rillabox.s3.amazonaws.com/media/items/AirPods-Pro-2nd-Gen.png" },
    { id: 2, name: "AirPods 3rd Gen", value: 179, rarity: "Rare", image: "https://rillabox.s3.amazonaws.com/media/items/AirPods-3rd-Gen.png" },
    { id: 3, name: "Apple Watch SE", value: 249, rarity: "Rare", image: "https://rillabox.s3.amazonaws.com/media/items/Apple-Watch-SE.png" },
    { id: 4, name: "Magic Mouse", value: 79, rarity: "Uncommon", image: "https://rillabox.s3.amazonaws.com/media/items/Magic-Mouse.png" },
    { id: 5, name: "Apple Lightning Cable", value: 19, rarity: "Common", image: "https://rillabox.s3.amazonaws.com/media/items/Apple-Lightning-Cable.png" }
  ],
  "apple-deluxe": [
    { id: 1, name: "MacBook Pro 16-inch M3 Max", value: 3999, rarity: "Legendary", image: "https://rillabox.s3.amazonaws.com/media/items/MacBook-Pro-16-M3-Max.png" },
    { id: 2, name: "MacBook Pro 14-inch M3 Pro", value: 2499, rarity: "Epic", image: "https://rillabox.s3.amazonaws.com/media/items/MacBook-Pro-14-M3-Pro.png" },
    { id: 3, name: "iPad Pro 12.9-inch M2", value: 1099, rarity: "Rare", image: "https://rillabox.s3.amazonaws.com/media/items/iPad-Pro-12.9-M2.png" },
    { id: 4, name: "Studio Display", value: 1599, rarity: "Epic", image: "https://rillabox.s3.amazonaws.com/media/items/Studio-Display.png" },
    { id: 5, name: "Apple Watch Ultra", value: 799, rarity: "Epic", image: "https://rillabox.s3.amazonaws.com/media/items/Apple-Watch-Ultra.png" }
  ]
}

// Risk helpers and augmented data
const inferRisk = (price: number) => {
  if (price >= 500) return { level: "High", percent: 72.4 }
  if (price >= 50) return { level: "Medium", percent: 44.8 }
  return { level: "Low", percent: 18.6 }
}
const getRiskColor = (level: string) => {
  switch (level.toLowerCase()) {
    case "high":
      return "#ef4444" // red
    case "medium":
      return "#f59e0b" // amber
    default:
      return "#52CA19" // green
  }
}
const boxesWithRisk = boxes.map((b) => ({
  ...b,
  risk: b.risk ?? inferRisk(b.currentPrice)
}))

export default function BoxesPage() {
  const { user, isAuthenticated } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedBox, setSelectedBox] = useState<string | null>(null)
  const [showBoxModal, setShowBoxModal] = useState(false)
  const [activeBox, setActiveBox] = useState<Box | null>(null)

  const categories = ["all", "Electronics", "Gaming", "Fashion", "Technology"]
  const filteredBoxes = selectedCategory === "all" 
    ? boxesWithRisk 
    : boxesWithRisk.filter(box => box.category === selectedCategory)

  return (
    <OSortudoLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Banner */}
        <div className="mb-8">
          <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 rounded-2xl overflow-hidden">
            <img
              src="/new/mystery box banner.png"
              alt="Mystery Boxes banner"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
         {/* Header - Exact Rillabox Style */}
         <div className="mb-8">
           <div className="flex items-center justify-between mb-6">
             <div>
               <h1 className="text-3xl font-bold text-foreground mb-2">Mystery Boxes</h1>
               <p className="text-muted-foreground">Open boxes and win amazing prizes</p>
             </div>
                {isAuthenticated && user && (
                  <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-lg">
                    <Coins className="w-5 h-5 text-primary" />
                    <span className="font-bold text-lg text-foreground">{user.balance?.toLocaleString() || 0}</span>
                    <span className="text-sm text-muted-foreground">Coins</span>
                  </div>
                )}
              </div>

              {/* Category Filter - Exact Rillabox Style */}
              <div className="flex space-x-2 mb-6 overflow-x-auto md:overflow-visible -mx-4 px-4 whitespace-nowrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize flex-shrink-0"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Boxes Grid - Homepage card markup */}
            <div className="boxes-container landing-boxes grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredBoxes.map((box) => (
                <div
                  key={box.id}
                  onClick={() => { setActiveBox(box); setShowBoxModal(true); }}
                  className="box-item relative"
                  style={{ "--accent-color": box.borderColor } as React.CSSProperties}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') { setActiveBox(box); setShowBoxModal(true); } }}
                >
                  {/* Decorative vector like homepage */}
                  {/* <img src="/images/helloween/vector-3.svg" alt="" className="vector-halloween" /> */}

                  {/* Name like homepage featured box */}
                  <span className="box-name line-clamp-2">{box.name}</span>

                  {/* Product image using homepage prod-img class */}
                  <img
                    src={box.image}
                    alt={box.name}
                    className="prod-img"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg" }}
                  />

                  {/* Price container exactly like homepage */}
                  <div className="price-container">
                    <div className="original-price"><span>$</span><span>{Number(box.originalPrice).toFixed(2)}</span></div>
                    <div className="current-price"><span>$</span><span>{Number(box.currentPrice).toFixed(2)}</span></div>
                  </div>

                  {/* Frosted risk badge */}
                  <div
                    className="risk-badge"
                    style={{
                      borderColor: `${box.borderColor}80`,
                      boxShadow: `0 4px 12px ${box.borderColor}40`
                    }}
                  >
                    <span
                      className="risk-dot"
                      style={{ backgroundColor: getRiskColor(box.risk.level) }}
                    />
                    <span className="risk-text">Risk {box.risk.level}: {box.risk.percent.toFixed(2)}%</span>
                  </div>

                  {/* Removed top/bottom brand color bars; hover glow handled by CSS */}
                </div>
              ))}
            </div>

            {/* Box Details Modal */}
            <Dialog open={showBoxModal} onOpenChange={(open) => setShowBoxModal(open)}>
              <DialogContent className="max-w-md rounded-2xl">
                <DialogHeader>
                  <DialogTitle>{activeBox?.name || "Mystery Box"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="w-full h-64 md:h-72 bg-muted/20 rounded-xl overflow-hidden flex items-center justify-center">
                    {activeBox && (
                      <img
                        src={activeBox.image}
                        alt={activeBox.name}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg" }}
                      />
                    )}
                  </div>
                  {activeBox && (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="text-xl font-bold text-primary">${Number(activeBox.currentPrice).toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Coins</p>
                        <p className="text-xl font-bold text-primary">{activeBox.coinPrice}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-2">
                    {activeBox && (
                      <Link
                        href={activeBox.id === "1-percent-iphone" ? "/boxes/iphone-box" : `/boxes/${activeBox.id}`}
                        className="w-full"
                      >
                        <Button className="w-full glow-effect">View Box</Button>
                      </Link>
                    )}
                    <Button variant="outline" onClick={() => setShowBoxModal(false)} className="w-28">Close</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Information Section - Exact Rillabox Style with Animations */}
            <div className="mt-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-card border-border text-center p-6 hover:shadow-lg hover:shadow-green-500/10 hover:scale-105 transition-all duration-300 cursor-pointer group">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30 group-hover:scale-110 transition-all duration-300">
                    <Star className="w-8 h-8 text-green-500 group-hover:animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-green-500 transition-colors duration-300">100% Authentic Items</h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    At RillaBox, every item you receive is verified authentic from StockX or official retailers, guaranteeing you the real deal every time.
                  </p>
                </Card>

                <Card className="bg-card border-border text-center p-6 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 transition-all duration-300 cursor-pointer group">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                    <Gift className="w-8 h-8 text-primary group-hover:animate-bounce" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">Exchange Unwanted Items</h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    Convert all items in your inventory into instant cash on RillaBox. Unbox something that perfectly matches your style with no fees or hidden costs.
                  </p>
                </Card>

                <Card className="bg-card border-border text-center p-6 hover:shadow-lg hover:shadow-green-500/10 hover:scale-105 transition-all duration-300 cursor-pointer group">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30 group-hover:scale-110 transition-all duration-300">
                    <Zap className="w-8 h-8 text-green-500 group-hover:animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-green-500 transition-colors duration-300">Worldwide Shipping</h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    Claim your prize & have it delivered to your doorstep, or withdraw the value.
                  </p>
                </Card>
              </div>
            </div>
          </div>
    </OSortudoLayout>
  )
}