'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-neon-gold text-black font-semibold',
    'hover:shadow-[0_0_24px_rgba(255,184,0,0.45)]',
    'active:brightness-90',
    'disabled:opacity-40 disabled:shadow-none',
  ].join(' '),
  secondary: [
    'border border-neon-blue text-neon-blue bg-transparent',
    'hover:bg-neon-blue/10 hover:shadow-[0_0_24px_rgba(0,212,255,0.35)]',
    'active:bg-neon-blue/20',
    'disabled:opacity-40 disabled:shadow-none',
  ].join(' '),
  ghost: [
    'text-text-muted bg-transparent',
    'hover:text-white hover:bg-white/5',
    'active:bg-white/10',
    'disabled:opacity-40',
  ].join(' '),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth, className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={[
          'inline-flex items-center justify-center gap-2 font-medium',
          'transition-all duration-200 cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth ? 'w-full' : '',
          className,
        ].filter(Boolean).join(' ')}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
