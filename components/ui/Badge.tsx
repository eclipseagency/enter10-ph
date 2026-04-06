import { HTMLAttributes } from 'react';

type BadgeStatus = 'pending' | 'confirmed' | 'cancelled';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: BadgeStatus;
}

const statusStyles: Record<BadgeStatus, string> = {
  pending: 'bg-neon-gold/15 text-neon-gold border-neon-gold/25',
  confirmed: 'bg-success/15 text-success border-success/25',
  cancelled: 'bg-error/15 text-error border-error/25',
};

export default function Badge({ status, className = '', children, ...props }: BadgeProps) {
  const label = children || status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span
      className={[
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        statusStyles[status],
        className,
      ].join(' ')}
      {...props}
    >
      {label}
    </span>
  );
}
