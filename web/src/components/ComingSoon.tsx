import React from 'react';
import { useTranslation } from 'react-i18next';
import GlassCard from './GlassCard';
import Icon, { IconName } from './Icon';

interface Props {
  icon?: IconName;
  tint?: 'pink' | 'orange' | 'blue';
}

export default function ComingSoon({ icon = 'rocket', tint = 'orange' }: Props) {
  const { t } = useTranslation();
  return (
    <div style={{ flex: 1, display: 'grid', placeItems: 'center' }}>
      <GlassCard tint={tint} padding={28}>
        <div className="col" style={{ alignItems: 'center', textAlign: 'center' }}>
          <div
            className="icon-chip"
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              background: 'rgba(255,140,41,0.18)',
              borderColor: 'rgba(255,140,41,0.45)',
              color: 'var(--orange)',
              marginBottom: 16,
            }}
          >
            <Icon name={icon} size={38} color="var(--orange)" />
          </div>
          <div className="h2">{t('common.comingSoon')}</div>
          <div className="body mt-sm">{t('common.comingSoonHint')}</div>
        </div>
      </GlassCard>
    </div>
  );
}
