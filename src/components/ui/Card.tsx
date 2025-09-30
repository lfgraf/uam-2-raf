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
        'bg-white dark:bg-gray-900 rounded-xl p-6',
        'border border-gray-200 dark:border-gray-700',
        'shadow-sm hover:shadow-md',
        'transition-all duration-200 ease-in-out',
        onClick && 'cursor-pointer hover:scale-[1.01] active:scale-[0.99]',
        className
      )}
      onClick={onClick}
    >
      {title && (
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
      )}
      {children && <div className={title || description ? "mt-4" : ""}>{children}</div>}
    </div>
  );
}