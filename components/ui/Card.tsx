import { HTMLAttributes } from 'react';

type GlowColor = 'blue' | 'magenta' | 'gold';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: GlowColor;
}

const glowHover: Record<GlowColor, string> = {
  blue: 'hover:shadow-[0_0_28px_rgba(0,212,255,0.2)] hover:border-neon-blue/30',
  magenta: 'hover:shadow-[0_0_28px_rgba(255,45,120,0.2)] hover:border-neon-magenta/30',
  gold: 'hover:shadow-[0_0_28px_rgba(255,184,0,0.2)] hover:border-neon-gold/30',
};

export default function Card({ glow, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={[
        'bg-bg-card rounded-2xl border border-border p-6',
        'transition-all duration-300',
        'hover:-translate-y-1',
        glow ? glowHover[glow] : 'hover:border-border-light',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
