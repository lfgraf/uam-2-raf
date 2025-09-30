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
        'bg-white dark:bg-graphite-900 rounded-xl p-6',
        'border border-gray-200 dark:border-graphite-800',
        'shadow-sm hover:shadow-md',
        'transition-all duration-200 ease-in-out',
        onClick && 'cursor-pointer hover:bg-gray-50 dark:hover:bg-graphite-850',
        className
      )}
      onClick={onClick}
    >
      {title && (
        <h3 className="text-lg font-medium text-gray-900 dark:text-graphite-100 mb-2">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-gray-600 dark:text-graphite-300 text-sm leading-relaxed">
          {description}
        </p>
      )}
      {children && <div className={title || description ? "mt-4" : ""}>{children}</div>}
    </div>
  );
}