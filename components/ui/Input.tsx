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
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none">
              {icon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            className={[
              'w-full rounded-[12px] bg-[#0f1011] border px-4 py-3 text-[#f7f8f8] text-sm',
              'placeholder:text-[#62666d]',
              'transition-colors duration-200',
              'focus:outline-none',
              icon ? 'pl-11' : '',
              error
                ? 'border-error focus:border-error'
                : 'border-[rgba(255,255,255,0.1)] focus:border-[#00D4FF]',
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
