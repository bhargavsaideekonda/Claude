import React from 'react';

interface Props {
  size?: number;
  animated?: boolean;
}

/**
 * Hero badge — rotating gradient ring around a stylised "P · MACS" monogram.
 * To use the real society logo, drop logo.png in /public and replace the
 * monogram block with <img src="/logo.png" alt="logo" />.
 */
export default function SoldierBadge({ size = 180, animated = true }: Props) {
  const inner = size - 18;
  return (
    <div className="badge-wrap" style={{ width: size + 40, height: size + 40 }}>
      <span
        className="badge-glow"
        style={{ width: size + 50, height: size + 50 }}
      />
      <span
        className={`badge-ring ${animated ? '' : 'static'}`}
        style={{ width: size, height: size }}
      />
      <div className="badge-inner" style={{ width: inner, height: inner }}>
        <div className="col" style={{ alignItems: 'center' }}>
          <span className="badge-mono" style={{ fontSize: size * 0.34 }}>
            P
          </span>
          <span className="badge-sub">MACS</span>
        </div>
      </div>
    </div>
  );
}
