import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GradientBackground from '@/components/GradientBackground';
import GlassCard from '@/components/GlassCard';
import GlowButton from '@/components/GlowButton';
import ScreenHeader from '@/components/ScreenHeader';
import SoldierBadge from '@/components/SoldierBadge';
import Icon from '@/components/Icon';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settingsStore';
import type { Language } from '@/i18n';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const language = useSettingsStore((s) => s.language);
  const setLanguage = useSettingsStore((s) => s.setLanguage);

  const options: { code: Language; label: string }[] = [
    { code: 'en', label: t('profile.languageEnglish') },
    { code: 'te', label: t('profile.languageTelugu') },
  ];

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="screen">
      <GradientBackground variant="aurora" />
      <div className="scroll">
        <ScreenHeader title={t('profile.title')} subtitle={t('profile.subtitle')} />

        <div className="col fade-in" style={{ alignItems: 'center', gap: 10 }}>
          <SoldierBadge size={110} animated={false} />
          <div className="h2">{user?.name ?? 'Soldier'}</div>
          <span className="pill" style={{ background: 'rgba(255,140,41,0.18)', border: '1px solid rgba(255,140,41,0.45)', color: 'var(--orange)' }}>
            <Icon name="star" size={14} color="var(--orange)" />
            {user?.rank ?? t('profile.rankSoldier')}
          </span>
          <div className="caption">+91 {user?.phone ?? ''} · {user?.branch ?? ''}</div>
        </div>

        <div className="fade-in d2 mt-lg">
          <div className="section-title">{t('common.language')}</div>
          <GlassCard tint="blue" padding={6}>
            {options.map((opt, idx) => {
              const active = language === opt.code;
              return (
                <div
                  key={opt.code}
                  className={`list-row ${idx !== options.length - 1 ? 'divider' : ''}`}
                  onClick={() => setLanguage(opt.code)}
                  role="button"
                >
                  <Icon name={active ? 'check-circle' : 'globe'} size={20} color={active ? 'var(--orange)' : 'var(--text-muted)'} />
                  <div style={{ flex: 1, fontWeight: 600, color: active ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                    {opt.label}
                  </div>
                  {active && (
                    <span className="pill" style={{ background: 'rgba(46,204,113,0.15)', border: '1px solid rgba(46,204,113,0.45)', color: 'var(--success)', fontSize: 9, letterSpacing: 1 }}>
                      ON DUTY
                    </span>
                  )}
                </div>
              );
            })}
          </GlassCard>
        </div>

        <div className="col gap fade-in d3 mt-lg">
          <GlowButton label={t('common.logout')} variant="blue" onClick={handleLogout} icon={<Icon name="logout" size={18} />} />
          <div className="caption center muted">{t('profile.version')} 1.0.0 · web build</div>
        </div>
      </div>
    </div>
  );
}
