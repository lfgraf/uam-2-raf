import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'secondary' | 'outline';
}

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  const variantStyles = {
    default: 'bg-acid text-graphite-950',
    secondary: 'bg-gray-100 dark:bg-graphite-850 text-gray-900 dark:text-graphite-100',
    outline: 'border border-gray-200 dark:border-graphite-700 text-gray-900 dark:text-graphite-100'
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
      variantStyles[variant],
      className
    )}>
      {children}
    </span>
  );
}