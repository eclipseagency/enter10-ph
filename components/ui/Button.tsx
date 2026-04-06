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
    'bg-neon-gold text-black font-bold text-[14px] uppercase tracking-[1.4px]',
    'hover:brightness-110 hover:shadow-[0_4px_16px_rgba(255,184,0,0.25)]',
    'active:brightness-90',
    'disabled:opacity-40 disabled:shadow-none',
  ].join(' '),
  secondary: [
    'border border-[rgba(0,212,255,0.4)] text-[#00D4FF] bg-transparent',
    'hover:border-[#00D4FF] hover:shadow-[0_4px_16px_rgba(0,212,255,0.15)]',
    'active:bg-neon-blue/10',
    'disabled:opacity-40 disabled:shadow-none',
  ].join(' '),
  ghost: [
    'text-[#b3b3b3] bg-transparent',
    'hover:text-white hover:bg-[rgba(255,255,255,0.05)]',
    'active:bg-[rgba(255,255,255,0.08)]',
    'disabled:opacity-40',
  ].join(' '),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-base',
  lg: 'px-8 py-3.5 text-lg',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth, className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={[
          'inline-flex items-center justify-center gap-2 rounded-full',
          'transition-all duration-250 ease-in-out cursor-pointer',
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
