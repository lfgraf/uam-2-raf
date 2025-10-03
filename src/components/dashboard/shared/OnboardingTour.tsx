'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Rocket,
  Target,
  TrendingUp,
  Store,
  Home,
  DollarSign,
  Users,
  Settings,
  X,
  ArrowRight,
  type LucideIcon
} from 'lucide-react';

export interface OnboardingStep {
  title: string;
  description: string;
  icon: LucideIcon;
  ctaText?: string;
  ctaLink?: string;
}

interface OnboardingTourProps {
  role: 'advertiser' | 'publisher' | 'admin';
  onComplete: () => void;
  onSkip: () => void;
}

const tourSteps: Record<'advertiser' | 'publisher' | 'admin', OnboardingStep[]> = {
  advertiser: [
    {
      title: 'Welcome to Your Campaign Hub',
      description: 'Create and manage advertising campaigns to reach your target audience across premium publisher properties.',
      icon: Rocket,
    },
    {
      title: 'Create Your First Campaign',
      description: 'Launch campaigns with our step-by-step wizard. Set your budget, define your audience, and upload creative assets.',
      icon: Target,
      ctaText: 'Create Campaign',
      ctaLink: '/dashboard/advertiser/create',
    },
    {
      title: 'Browse the Marketplace',
      description: 'Discover available publisher inventory and bid on campaigns that match your target audience.',
      icon: Store,
      ctaText: 'Explore Marketplace',
      ctaLink: '/dashboard/advertiser/marketplace',
    },
    {
      title: 'Track Your Performance',
      description: 'Monitor campaign metrics, analyze ROI, and optimize your advertising strategy with real-time analytics.',
      icon: TrendingUp,
      ctaText: 'View Analytics',
      ctaLink: '/dashboard/advertiser/analytics',
    },
  ],
  publisher: [
    {
      title: 'Welcome to Your Publisher Dashboard',
      description: 'Monetize your properties by connecting with advertisers looking to reach your audience.',
      icon: Rocket,
    },
    {
      title: 'Register Your First Property',
      description: 'Add your websites, apps, or digital properties to start accepting campaigns and earning revenue.',
      icon: Home,
      ctaText: 'Add Property',
      ctaLink: '/dashboard/publisher/properties',
    },
    {
      title: 'Discover Campaigns',
      description: 'Browse available campaigns in the marketplace and submit bids to monetize your traffic.',
      icon: Store,
      ctaText: 'Browse Campaigns',
      ctaLink: '/dashboard/publisher/marketplace',
    },
    {
      title: 'Monitor Your Revenue',
      description: 'Track earnings, view attribution details, and manage payouts from your publisher dashboard.',
      icon: DollarSign,
      ctaText: 'View Revenue',
      ctaLink: '/dashboard/publisher/revenue',
    },
  ],
  admin: [
    {
      title: 'Welcome to Admin Control Center',
      description: 'Manage platform operations, oversee users, and configure system settings.',
      icon: Rocket,
    },
    {
      title: 'Manage Users & Permissions',
      description: 'Oversee advertiser and publisher accounts, manage roles, and monitor platform activity.',
      icon: Users,
      ctaText: 'User Management',
      ctaLink: '/dashboard/admin/users',
    },
    {
      title: 'Configure Platform Settings',
      description: 'Adjust platform fees, security settings, and system parameters to optimize operations.',
      icon: Settings,
      ctaText: 'Platform Settings',
      ctaLink: '/dashboard/admin/settings',
    },
  ],
};

export function OnboardingTour({ role, onComplete, onSkip }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = tourSteps[role];
  const isLastStep = currentStep === steps.length - 1;
  const step = steps[currentStep];

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleCTA = () => {
    if (step.ctaLink) {
      onComplete();
      window.location.href = step.ctaLink;
    }
  };

  const Icon = step.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-graphite-950/80 backdrop-blur-sm animate-in fade-in">
      <Card className="w-full max-w-lg mx-4 p-8 relative bg-graphite-900 border-graphite-700">
        {/* Close Button */}
        <button
          onClick={onSkip}
          className="absolute top-4 right-4 p-2 text-graphite-400 hover:text-graphite-100 transition-colors"
          aria-label="Skip tour"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-acid rounded-2xl flex items-center justify-center">
            <Icon className="w-8 h-8 text-graphite-950" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium text-graphite-100 mb-3">
            {step.title}
          </h2>
          <p className="text-graphite-300 leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentStep
                  ? 'w-8 bg-acid'
                  : index < currentStep
                  ? 'w-2 bg-acid/50'
                  : 'w-2 bg-graphite-700'
              }`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={onSkip}
            className="text-graphite-300 hover:text-graphite-100"
          >
            Skip Tour
          </Button>

          <div className="flex items-center gap-3">
            {step.ctaText && step.ctaLink && (
              <Button variant="outline" onClick={handleCTA}>
                {step.ctaText}
              </Button>
            )}
            <Button onClick={handleNext}>
              {isLastStep ? (
                'Got it!'
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
