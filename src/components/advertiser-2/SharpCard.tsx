import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SharpCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function SharpCard({ children, className, onClick }: SharpCardProps) {
  return (
    <div
      className={cn(
        'bg-[#1F2937] border border-[#374151]',
        'transition-all duration-200',
        onClick && 'cursor-pointer hover:border-[#4B5563]',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
