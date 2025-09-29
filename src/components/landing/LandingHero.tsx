'use client';

import { BrandHero, StatsShowcase, BrandCallout } from "@/components/ui/BrandElements";
import { WalletConnect } from "@/components/wallet/WalletConnect";

export function LandingHero() {
  return (
    <section className="space-y-16">
      <BrandHero
        subtitle="🚀 The Future of AdTech is Here"
        title="Transparent User Acquisition"
        description="Connect advertisers and publishers through blockchain-powered transparency. Track every conversion, eliminate fraud, and optimize campaigns with real-time attribution."
        primaryAction={{
          text: "Connect Wallet & Start",
          onClick: () => {
            document.getElementById('role-selection')?.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }}
        secondaryAction={{
          text: "Learn More",
          onClick: () => {
            document.getElementById('features')?.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }}
      />

      <StatsShowcase
        title="Trusted by the Community"
        stats={[
          { value: "$2.5M+", label: "Volume Processed", trend: "+127%", highlight: true },
          { value: "1,200+", label: "Active Users", trend: "+45%" },
          { value: "99.9%", label: "Uptime", highlight: true },
          { value: "0.02s", label: "Avg Attribution", trend: "-12%" }
        ]}
      />

      <div className="max-w-2xl mx-auto">
        <BrandCallout
          type="trust"
          title="Built on Blockchain Trust"
          message="Every click, conversion, and payment is recorded on-chain for complete transparency. No more disputes, no more fraud - just pure, verifiable performance data."
        />
      </div>

      <div className="text-center">
        <WalletConnect
          onConnect={(walletId) => {
            console.log(`Connected with ${walletId}`);
            document.getElementById('role-selection')?.scrollIntoView({
              behavior: 'smooth'
            });
          }}
        />
      </div>
    </section>
  );
}