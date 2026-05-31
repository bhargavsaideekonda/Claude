import React from 'react';

interface Props {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}

export default function ScreenHeader({ title, subtitle, right }: Props) {
  return (
    <div className="row" style={{ alignItems: 'flex-end', gap: 12, marginBottom: 20 }}>
      <div style={{ flex: 1 }}>
        <div className="eyebrow">PALNADU MACS</div>
        <div className="h1" style={{ marginTop: 4 }}>
          {title}
        </div>
        {subtitle && (
          <div className="body" style={{ marginTop: 4 }}>
            {subtitle}
          </div>
        )}
      </div>
      {right}
    </div>
  );
}
