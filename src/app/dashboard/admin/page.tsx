'use client';

import { useState, useEffect } from 'react';
import { AdminDashboard } from '@/components/dashboard/admin/AdminDashboard';
import { OnboardingTour } from '@/components/dashboard/shared/OnboardingTour';

export default function AdminPage() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem('onboarding-complete-admin');
    if (!completed) {
      setShowOnboarding(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('onboarding-complete-admin', 'true');
    setShowOnboarding(false);
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding-complete-admin', 'true');
    setShowOnboarding(false);
  };

  return (
    <>
      <AdminDashboard />
      {showOnboarding && (
        <OnboardingTour
          role="admin"
          onComplete={handleComplete}
          onSkip={handleSkip}
        />
      )}
    </>
  );
}