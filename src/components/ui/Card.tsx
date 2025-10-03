import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ title, description, children, className, onClick }: CardProps) {
  return (
    <div
      className={cn(
        'bg-bg-default rounded-xl p-6',
        'border border-graphite-700',
        'shadow-sm hover:shadow-md',
        'transition-all duration-200 ease-in-out',
        onClick && 'cursor-pointer hover:bg-graphite-850',
        className
      )}
      onClick={onClick}
    >
      {title && (
        <h3 className="text-lg font-medium text-fg-default mb-2">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-fg-muted text-sm leading-relaxed">
          {description}
        </p>
      )}
      {children && <div className={title || description ? "mt-4" : ""}>{children}</div>}
    </div>
  );
}