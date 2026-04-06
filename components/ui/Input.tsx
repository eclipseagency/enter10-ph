'use client';

import { InputHTMLAttributes, ReactNode, forwardRef, useId } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', id: externalId, ...props }, ref) => {
    const autoId = useId();
    const id = externalId || autoId;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-text-muted">
            {label}
          </label>
        )}

        <div className="relative">
          {icon && (
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none">
              {icon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            className={[
              'w-full rounded-xl bg-bg-card border px-4 py-3 text-white text-sm',
              'placeholder:text-text-dim',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-bg',
              icon ? 'pl-11' : '',
              error
                ? 'border-error focus:ring-error/40'
                : 'border-border-light focus:border-neon-blue/50 focus:ring-neon-blue/30',
              className,
            ].filter(Boolean).join(' ')}
            {...props}
          />
        </div>

        {error && (
          <p className="text-xs text-error mt-0.5">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
