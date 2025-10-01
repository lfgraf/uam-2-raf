import * as React from 'react';
import { cn } from '@/lib/utils';

export type SliderProps = React.InputHTMLAttributes<HTMLInputElement>;

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="range"
        className={cn(
          // Base styles
          'w-full h-2 rounded-lg appearance-none cursor-pointer',
          // Track styling
          'bg-gray-200 dark:bg-graphite-800',
          // Thumb styling (webkit)
          '[&::-webkit-slider-thumb]:appearance-none',
          '[&::-webkit-slider-thumb]:w-5',
          '[&::-webkit-slider-thumb]:h-5',
          '[&::-webkit-slider-thumb]:rounded-full',
          '[&::-webkit-slider-thumb]:bg-acid',
          '[&::-webkit-slider-thumb]:border-2',
          '[&::-webkit-slider-thumb]:border-graphite-950',
          '[&::-webkit-slider-thumb]:cursor-pointer',
          '[&::-webkit-slider-thumb]:shadow-md',
          '[&::-webkit-slider-thumb]:transition-all',
          '[&::-webkit-slider-thumb]:hover:scale-110',
          // Thumb styling (firefox)
          '[&::-moz-range-thumb]:w-5',
          '[&::-moz-range-thumb]:h-5',
          '[&::-moz-range-thumb]:rounded-full',
          '[&::-moz-range-thumb]:bg-acid',
          '[&::-moz-range-thumb]:border-2',
          '[&::-moz-range-thumb]:border-graphite-950',
          '[&::-moz-range-thumb]:cursor-pointer',
          '[&::-moz-range-thumb]:shadow-md',
          '[&::-moz-range-thumb]:transition-all',
          '[&::-moz-range-thumb]:hover:scale-110',
          // Track styling (firefox)
          '[&::-moz-range-track]:bg-gray-200',
          '[&::-moz-range-track]:dark:bg-graphite-800',
          '[&::-moz-range-track]:rounded-lg',
          // Focus states
          'focus:outline-none',
          'focus:ring-2',
          'focus:ring-acid/30',
          // Disabled state
          'disabled:opacity-50',
          'disabled:cursor-not-allowed',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Slider.displayName = 'Slider';

export { Slider };
