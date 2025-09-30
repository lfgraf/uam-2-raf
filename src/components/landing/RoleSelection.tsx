'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TrendingUp, Globe, Settings } from 'lucide-react';

const roles = [
  {
    id: 'advertiser',
    title: 'I\'m an Advertiser',
    description: 'Launch campaigns, track conversions, and optimize spending with real-time blockchain attribution.',
    icon: TrendingUp,
    features: [
      'Campaign creation & management',
      'Real-time conversion tracking',
      'Fraud prevention & transparency',
      'ROI optimization tools'
    ],
    cta: 'Start Advertising'
  },
  {
    id: 'publisher',
    title: 'I\'m a Publisher',
    description: 'Monetize your traffic with guaranteed payouts and transparent revenue sharing.',
    icon: Globe,
    features: [
      'Property management dashboard',
      'Campaign marketplace access',
      'Automated revenue tracking',
      'Instant blockchain payouts'
    ],
    cta: 'Start Publishing'
  },
  {
    id: 'admin',
    title: 'I\'m an Admin',
    description: 'Oversee platform operations, resolve disputes, and maintain system integrity.',
    icon: Settings,
    features: [
      'Platform oversight tools',
      'Dispute resolution workflows',
      'User & role management',
      'System health monitoring'
    ],
    cta: 'Admin Access'
  }
];

export function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <section id="role-selection" className="py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 dark:text-white mb-4">
            Choose Your Role
          </h2>
          <p className="text-lg text-gray-900 dark:text-white/70 max-w-2xl mx-auto">
            Select how you want to participate in the decentralized advertising ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;

            return (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  isSelected
                    ? 'ring-2 ring-brand shadow-lg transform scale-105'
                    : 'hover:border-brand/50'
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-brand/10 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-brand" />
                  </div>

                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                    {role.title}
                  </h3>

                  <p className="text-gray-900 dark:text-white/70 mb-6">
                    {role.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {role.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-900 dark:text-white/60">
                        <div className="w-2 h-2 bg-brand rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Button
                    variant={isSelected ? "primary" : "secondary"}
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Navigate to role-specific dashboard
                      window.location.href = `/dashboard/${role.id}`;
                    }}
                  >
                    {role.cta}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {selectedRole && (
          <div className="text-center mt-8">
            <p className="text-gray-900 dark:text-white/60 text-sm">
              Selected: <span className="font-medium text-brand">
                {roles.find(r => r.id === selectedRole)?.title}
              </span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}