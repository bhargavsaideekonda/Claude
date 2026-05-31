import React, { useRef, useState } from 'react';
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

  const [digits, setDigits] = useState<string[]>(Array(LEN).fill(''));
  const [error, setError] = useState(false);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  // If the user lands here without a phone (e.g. page refresh), go back to login.
  if (!pendingPhone) {
    return <Navigate to="/login" replace />;
  }

  const code = digits.join('');
  const complete = code.length === LEN;

  const setAt = (i: number, v: string) => {
    const c = v.replace(/\D/g, '').slice(0, 1);
    setDigits((prev) => {
      const next = [...prev];
      next[i] = c;
      return next;
    });
    if (c && i < LEN - 1) inputs.current[i + 1]?.focus();
  };

  const onKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) inputs.current[i - 1]?.focus();
    if (e.key === 'Enter' && complete) handleLogin();
  };

  const handleLogin = () => {
    const ok = login(code);
    if (!ok) {
      setError(true);
      setDigits(Array(LEN).fill(''));
      inputs.current[0]?.focus();
      return;
    }
    navigate('/home', { replace: true });
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
            <div className="caption center" style={{ marginBottom: 12 }}>
              {t('auth.pinLabel')}
            </div>
            <div className="otp-row" style={{ justifyContent: 'center', maxWidth: 280, margin: '0 auto' }}>
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => (inputs.current[i] = el)}
                  className={`otp-box ${d ? 'filled' : ''}`}
                  inputMode="numeric"
                  type="password"
                  maxLength={1}
                  value={d}
                  onChange={(e) => {
                    setError(false);
                    setAt(i, e.target.value);
                  }}
                  onKeyDown={(e) => onKeyDown(i, e)}
                />
              ))}
            </div>
            {error && (
              <div className="caption center" style={{ color: 'var(--danger)', marginTop: 10 }}>
                {t('auth.invalidPin')}
              </div>
            )}
          </GlassCard>
        </div>

        <div className="col gap fade-in d3 mt-lg">
          <GlowButton
            label={t('auth.signIn')}
            onClick={handleLogin}
            disabled={!complete}
            icon={<Icon name="shield" size={18} />}
          />
        </div>
      </div>
    </div>
  );
}
