'use client';

import { useState, useEffect } from 'react';
import { AdvertiserDashboard } from '@/components/dashboard/advertiser/AdvertiserDashboard';
import { OnboardingTour } from '@/components/dashboard/shared/OnboardingTour';

export default function AdvertiserPage() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem('onboarding-complete-advertiser');
    if (!completed) {
      setShowOnboarding(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('onboarding-complete-advertiser', 'true');
    setShowOnboarding(false);
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding-complete-advertiser', 'true');
    setShowOnboarding(false);
  };

  return (
    <>
      <AdvertiserDashboard />
      {showOnboarding && (
        <OnboardingTour
          role="advertiser"
          onComplete={handleComplete}
          onSkip={handleSkip}
        />
      )}
    </>
  );
}