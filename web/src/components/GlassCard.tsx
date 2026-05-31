import React from 'react';

interface Props {
  children: React.ReactNode;
  tint?: 'pink' | 'orange' | 'blue';
  padding?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  tint = 'pink',
  padding = 18,
  className = '',
  style,
  onClick,
}: Props) {
  return (
    <div
      className={`glass ${tint} ${className}`}
      style={{ padding, ...style }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      {children}
    </div>
  );
}
