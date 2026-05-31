import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GradientBackground from '@/components/GradientBackground';
import SoldierBadge from '@/components/SoldierBadge';
import GlowButton from '@/components/GlowButton';

export default function SplashScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="screen">
      <GradientBackground variant="cosmic" />
      <div
        className="scroll no-tab"
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 72 }}
      >
        <div className="col fade-in" style={{ alignItems: 'center', gap: 4 }}>
          <div className="pulse">
            <SoldierBadge size={200} />
          </div>
        </div>

        <div className="fade-in d2" style={{ textAlign: 'center' }}>
          <div className="eyebrow">{t('app.society')}</div>
          <div className="display mt-sm">{t('auth.splashWelcome')}</div>
          <div className="body mt">{t('auth.splashSubtitle')}</div>
        </div>

        <div className="col gap fade-in d3" style={{ marginTop: 24 }}>
          <GlowButton label={t('common.continue')} onClick={() => navigate('/login')} />
          <div className="caption center muted">{t('app.motto')}</div>
        </div>
      </div>
    </div>
  );
}
