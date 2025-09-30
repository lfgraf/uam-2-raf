import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const buttonVariants = {
  primary: 'bg-acid text-graphite-950 hover:bg-acid-400 active:bg-acid-600 focus:ring-acid/30 shadow-sm hover:shadow-md',
  secondary: 'bg-gray-100 dark:bg-graphite-850 text-gray-900 dark:text-graphite-100 hover:bg-gray-200 dark:hover:bg-graphite-800 active:bg-gray-300 dark:active:bg-graphite-700 focus:ring-graphite-500',
  outline: 'border border-gray-200 dark:border-graphite-700 text-gray-900 dark:text-graphite-100 hover:border-gray-300 dark:hover:border-graphite-600 hover:bg-gray-50 dark:hover:bg-graphite-850/50 active:bg-gray-100 dark:active:bg-graphite-850 focus:ring-graphite-500',
  ghost: 'text-gray-700 dark:text-graphite-300 hover:bg-gray-100 dark:hover:bg-graphite-850 hover:text-gray-900 dark:hover:text-graphite-100 active:bg-gray-200 dark:active:bg-graphite-800 focus:ring-graphite-500'
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium',
        'transition-all duration-200 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-graphite-850',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none',
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}