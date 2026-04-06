import { HTMLAttributes } from 'react';

type GlowColor = 'blue' | 'magenta' | 'gold';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: GlowColor;
}

const glowHover: Record<GlowColor, string> = {
  blue: 'hover:shadow-[0_0_28px_rgba(0,212,255,0.2),rgba(0,0,0,0.3)_0px_8px_24px] hover:border-neon-blue/30',
  magenta: 'hover:shadow-[0_0_28px_rgba(255,45,120,0.2),rgba(0,0,0,0.3)_0px_8px_24px] hover:border-neon-magenta/30',
  gold: 'hover:shadow-[0_0_28px_rgba(255,184,0,0.2),rgba(0,0,0,0.3)_0px_8px_24px] hover:border-neon-gold/30',
};

export default function Card({ glow, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={[
        'rounded-2xl p-6',
        'bg-[rgba(15,16,17,0.85)] border border-[rgba(255,255,255,0.06)]',
        'shadow-[rgba(0,0,0,0.3)_0px_8px_24px]',
        'transition-all duration-300 ease-in-out',
        'hover:-translate-y-0.5',
        glow
          ? glowHover[glow]
          : 'hover:border-[rgba(255,255,255,0.12)]',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
