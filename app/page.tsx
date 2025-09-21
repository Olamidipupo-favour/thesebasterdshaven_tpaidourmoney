import { Navigation } from "@/components/navigation"
import { LiveDropsSidebar } from "@/components/live-drops-sidebar"
import { HeroBanner } from "@/components/hero-banner"
import { FeaturedBoxes } from "@/components/featured-boxes"
import { MysteryBoxGame } from "@/components/mystery-box-game"
import { GamesGrid } from "@/components/games-grid"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex">
        <LiveDropsSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <HeroBanner />

            <FeaturedBoxes />

            <MysteryBoxGame />

            <GamesGrid />
          </div>
        </main>
      </div>
    </div>
  )
}
