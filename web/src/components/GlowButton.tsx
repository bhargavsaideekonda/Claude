import React from 'react';

interface Props {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'pink' | 'blue';
  icon?: React.ReactNode;
}

export default function GlowButton({
  label,
  onClick,
  disabled,
  loading,
  variant = 'pink',
  icon,
}: Props) {
  return (
    <button
      className={`glow-btn ${variant === 'blue' ? 'blue' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <span>…</span>
      ) : (
        <>
          {icon}
          {label}
        </>
      )}
    </button>
  );
}
