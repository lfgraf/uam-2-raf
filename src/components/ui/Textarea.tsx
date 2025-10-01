import * as React from 'react';
import { cn } from '@/lib/utils';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
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
          // Resize
          'resize-none',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
