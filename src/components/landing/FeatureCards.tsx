'use client';

import { Card } from "@/components/ui/Card";
import { Shield, Zap, Eye, Smartphone } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: "Blockchain Transparency",
    description: "Every click, conversion, and payment is recorded on-chain for complete transparency and fraud prevention."
  },
  {
    icon: Zap,
    title: "Real-Time Attribution",
    description: "Track conversions from click to completion with minimal delays and maximum accuracy."
  },
  {
    icon: Eye,
    title: "Complete Visibility",
    description: "See exactly where your budget goes and how your traffic performs with detailed analytics."
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Manage campaigns, check earnings, and monitor performance from any device, anywhere."
  }
];

export function FeatureCards() {
  return (
    <section id="features" className="py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-lg text-gray-900 dark:text-white/70 max-w-2xl mx-auto">
            Built for the future of digital advertising with blockchain-powered trust and transparency
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-brand/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-brand" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-sm text-gray-900 dark:text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-brand/5 rounded-2xl p-8 border border-brand/20">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-900 dark:text-white/70 mb-6 max-w-lg mx-auto">
              Join hundreds of advertisers and publishers already using our platform to drive better results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium transition-colors">
                Connect Your Wallet
              </button>
              <button className="bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}