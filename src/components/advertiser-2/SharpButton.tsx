import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SharpButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function SharpButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled = false
}: SharpButtonProps) {
  const baseStyles = 'font-medium transition-all duration-200 inline-flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-acid text-graphite-950 hover:bg-acid-400 disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'bg-transparent border border-graphite-600 text-graphite-100 hover:border-graphite-500 hover:bg-[#374151]',
    ghost: 'bg-transparent text-graphite-300 hover:text-graphite-100 hover:bg-[#374151]'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
