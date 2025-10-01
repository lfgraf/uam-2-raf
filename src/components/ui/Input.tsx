import * as React from 'react';
import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base styles
          'w-full px-4 py-2 rounded-lg',
          // Background and border
          'bg-white dark:bg-graphite-900',
          'border border-gray-200 dark:border-graphite-700',
          // Text colors
          'text-gray-900 dark:text-graphite-100',
          // Placeholder
          'placeholder:text-gray-500 dark:placeholder:text-graphite-500',
          // Focus states
          'focus:outline-none focus:ring-2 focus:ring-acid/30 focus:border-acid',
          // Disabled state
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
