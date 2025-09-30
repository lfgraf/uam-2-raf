import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'secondary' | 'outline';
}

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  const variantStyles = {
    default: 'bg-brand text-white',
    secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white',
    outline: 'border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'
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