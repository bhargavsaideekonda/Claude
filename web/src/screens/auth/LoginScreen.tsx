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
  const requestOtp = useAuthStore((s) => s.requestOtp);

  const [phone, setPhone] = useState('');
  const isValid = /^[6-9]\d{9}$/.test(phone);

  const handleSend = () => {
    if (!isValid) return;
    requestOtp(phone);
    navigate('/otp');
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
          <div className="body mt-sm">{t('auth.loginSubtitle')}</div>
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
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              {isValid && <Icon name="check-circle" size={20} color="var(--success)" />}
            </div>
          </GlassCard>
        </div>

        <div className="col gap fade-in d3 mt-lg">
          <GlowButton
            label={t('auth.sendOtp')}
            onClick={handleSend}
            disabled={!isValid}
            icon={<Icon name="send" size={18} />}
          />
          <div className="caption center muted">{t('auth.termsHint')}</div>
        </div>
      </div>
    </div>
  );
}
