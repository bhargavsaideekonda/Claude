import React from 'react';
import GlassCard from './GlassCard';
import Icon, { IconName } from './Icon';

interface Props {
  label: string;
  value: string;
  icon: IconName;
  tint?: 'pink' | 'orange' | 'blue';
  accent: string;
  delta?: string;
}

export default function StatCard({ label, value, icon, tint = 'pink', accent, delta }: Props) {
  return (
    <GlassCard tint={tint} padding={16}>
      <div
        className="icon-chip"
        style={{ background: accent + '26', borderColor: accent + '66', color: accent }}
      >
        <Icon name={icon} size={20} color={accent} />
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {delta && (
        <div className="stat-delta" style={{ color: accent }}>
          {delta}
        </div>
      )}
    </GlassCard>
  );
}
