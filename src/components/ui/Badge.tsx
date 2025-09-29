import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
      className
    )}>
      {children}
    </span>
  );
}