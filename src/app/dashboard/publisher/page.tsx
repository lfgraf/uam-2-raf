'use client';

import { useState, useEffect } from 'react';
import { PublisherDashboard } from '@/components/dashboard/publisher/PublisherDashboard';
import { OnboardingTour } from '@/components/dashboard/shared/OnboardingTour';

export default function PublisherPage() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem('onboarding-complete-publisher');
    if (!completed) {
      setShowOnboarding(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('onboarding-complete-publisher', 'true');
    setShowOnboarding(false);
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding-complete-publisher', 'true');
    setShowOnboarding(false);
  };

  return (
    <>
      <PublisherDashboard />
      {showOnboarding && (
        <OnboardingTour
          role="publisher"
          onComplete={handleComplete}
          onSkip={handleSkip}
        />
      )}
    </>
  );
}