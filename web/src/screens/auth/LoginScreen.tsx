import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GradientBackground from '@/components/GradientBackground';
import GlassCard from '@/components/GlassCard';
import GlowButton from '@/components/GlowButton';
import SoldierBadge from '@/components/SoldierBadge';
import Icon from '@/components/Icon';
import { useAuthStore } from '@/store/authStore';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const setPendingPhone = useAuthStore((s) => s.setPendingPhone);

  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false);
  const isValid = /^[6-9]\d{9}$/.test(phone);

  const handleContinue = () => {
    if (!isValid) return;
    const registered = setPendingPhone(phone);
    if (!registered) {
      setError(true);
      return;
    }
    navigate('/pin');
  };

  return (
    <div className="screen">
      <GradientBackground variant="aurora" />
      <div className="scroll no-tab">
        <div className="col fade-in" style={{ alignItems: 'center', marginBottom: 8 }}>
          <SoldierBadge size={110} animated={false} />
        </div>

        <div className="fade-in d1">
          <div className="eyebrow">{t('app.tagline')}</div>
          <div className="h1 mt-sm">{t('auth.loginTitle')}</div>
          <div className="body mt-sm">{t('auth.loginSubtitlePin')}</div>
        </div>

        <div className="fade-in d2 mt-lg">
          <GlassCard tint="blue" padding={20}>
            <div className="caption" style={{ marginBottom: 10 }}>
              {t('auth.phoneLabel')}
            </div>
            <div className="input-row">
              <span className="flag">+91</span>
              <input
                inputMode="numeric"
                placeholder={t('auth.phonePlaceholder')}
                value={phone}
                onChange={(e) => {
                  setError(false);
                  setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
              />
              {isValid && <Icon name="check-circle" size={20} color="var(--success)" />}
            </div>
            {error && (
              <div className="caption" style={{ color: 'var(--danger)', marginTop: 10 }}>
                {t('auth.phoneNotRegistered')}
              </div>
            )}
          </GlassCard>
        </div>

        <div className="col gap fade-in d3 mt-lg">
          <GlowButton
            label={t('common.continue')}
            onClick={handleContinue}
            disabled={!isValid}
            icon={<Icon name="send" size={18} />}
          />
          <div className="caption center muted">{t('auth.termsHint')}</div>
        </div>

        {/* Demo credentials so you and your dad can try it right away */}
        <div className="fade-in d4 mt-lg">
          <GlassCard tint="orange" padding={16}>
            <div className="row gap-sm" style={{ alignItems: 'center', marginBottom: 8 }}>
              <Icon name="star" size={16} color="var(--orange)" />
              <span className="caption" style={{ color: 'var(--orange)', fontWeight: 700, letterSpacing: 1 }}>
                {t('auth.demoTitle')}
              </span>
            </div>
            <div className="caption" style={{ lineHeight: 1.8 }}>
              <strong style={{ color: 'var(--text-primary)' }}>Captain:</strong> 9876543210 · PIN 1234
              <br />
              <strong style={{ color: 'var(--text-primary)' }}>Soldier:</strong> 9123456780 · PIN 1111
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
