'use client';

import { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  value: number | string;
  duration?: number;
  format?: 'currency' | 'percentage' | 'number';
  decimals?: number;
}

export function AnimatedCounter({ value, duration = 1000, format = 'number', decimals = 0 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);

  // Extract numeric value if string
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g, '')) : value;

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = numericValue * easeOutQuart;

      setDisplayValue(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [numericValue, duration]);

  const formatValue = (val: number): string => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        }).format(val);
      case 'percentage':
        return `${val.toFixed(decimals)}%`;
      case 'number':
        return val.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        });
    }
  };

  return <span>{formatValue(displayValue)}</span>;
}