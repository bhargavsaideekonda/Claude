import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GradientBackground from '@/components/GradientBackground';
import GlassCard from '@/components/GlassCard';
import GlowButton from '@/components/GlowButton';
import Icon from '@/components/Icon';
import { useAuthStore } from '@/store/authStore';

const LEN = 4;

export default function PinScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const pendingPhone = useAuthStore((s) => s.pendingPhone);
  const login = useAuthStore((s) => s.login);

  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const hiddenInput = useRef<HTMLInputElement | null>(null);

  // Focus the (invisible) input so the keyboard opens immediately.
  useEffect(() => {
    hiddenInput.current?.focus();
  }, []);

  // If the user lands here without a phone (e.g. page refresh), go back to login.
  if (!pendingPhone) {
    return <Navigate to="/login" replace />;
  }

  const complete = pin.length === LEN;

  const handleLogin = (code: string = pin) => {
    const ok = login(code);
    if (!ok) {
      setError(true);
      setPin('');
      hiddenInput.current?.focus();
      return;
    }
    navigate('/home', { replace: true });
  };

  const onChange = (raw: string) => {
    const next = raw.replace(/\D/g, '').slice(0, LEN);
    setError(false);
    setPin(next);
    // Auto-submit the moment all 4 digits are entered.
    if (next.length === LEN) handleLogin(next);
  };

  return (
    <div className="screen">
      <GradientBackground variant="aurora" />
      <div className="scroll no-tab">
        <button className="back-btn fade-in" onClick={() => navigate('/login')}>
          <Icon name="chevron-left" size={20} />
          {t('common.back')}
        </button>

        <div className="fade-in d1">
          <div className="eyebrow">{t('app.tagline')}</div>
          <div className="h1 mt-sm">{t('auth.pinTitle')}</div>
          <div className="body mt-sm">
            {t('auth.pinSubtitle', { phone: `+91 ${pendingPhone ?? ''}` })}
          </div>
        </div>

        <div className="fade-in d2 mt-lg">
          <GlassCard tint="pink" padding={22}>
            <div className="caption center" style={{ marginBottom: 14 }}>
              {t('auth.pinLabel')}
            </div>

            {/* Tapping the dots focuses the single hidden input. This is far
                more reliable on mobile keyboards than 4 separate boxes. */}
            <label
              htmlFor="pin-field"
              className="otp-row"
              style={{ justifyContent: 'center', gap: 14, cursor: 'text' }}
            >
              {Array.from({ length: LEN }).map((_, i) => (
                <span key={i} className={`pin-dot ${i < pin.length ? 'filled' : ''}`}>
                  {i < pin.length ? '•' : ''}
                </span>
              ))}
            </label>

            <input
              id="pin-field"
              ref={hiddenInput}
              className="pin-hidden-input"
              inputMode="numeric"
              autoComplete="one-time-code"
              type="tel"
              value={pin}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && complete && handleLogin()}
            />

            {error && (
              <div className="caption center" style={{ color: 'var(--danger)', marginTop: 14 }}>
                {t('auth.invalidPin')}
              </div>
            )}
          </GlassCard>
        </div>

        <div className="col gap fade-in d3 mt-lg">
          <GlowButton
            label={t('auth.signIn')}
            onClick={() => handleLogin()}
            disabled={!complete}
            icon={<Icon name="shield" size={18} />}
          />
        </div>
      </div>
    </div>
  );
}
