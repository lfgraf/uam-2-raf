import * as React from 'react';
import { cn } from '@/lib/utils';

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          // Base styles
          'w-full px-4 py-2 rounded-lg',
          // Background and border
          'bg-white dark:bg-graphite-900',
          'border border-gray-200 dark:border-graphite-700',
          // Text colors
          'text-gray-900 dark:text-graphite-100',
          // Focus states
          'focus:outline-none focus:ring-2 focus:ring-acid/30 focus:border-acid',
          // Disabled state
          'disabled:opacity-50 disabled:cursor-not-allowed',
          // Cursor
          'cursor-pointer',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';

export { Select };
