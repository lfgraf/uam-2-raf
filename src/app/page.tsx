import { LandingHero } from "@/components/landing/LandingHero";
import { RoleSelection } from "@/components/landing/RoleSelection";
import { FeatureCards } from "@/components/landing/FeatureCards";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100 dark:from-gray-900 dark:to-gray-800">
      {/* Demo Link */}
      <div className="fixed top-4 right-4 z-50">
        <Link href="/demo">
          <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
            🎨 View Demo
          </Button>
        </Link>
      </div>

      <main className="container mx-auto px-4 py-8">
        <LandingHero />
        <RoleSelection />
        <FeatureCards />
      </main>
    </div>
  );
}
