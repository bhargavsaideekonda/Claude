import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GradientBackground from '@/components/GradientBackground';
import GlassCard from '@/components/GlassCard';
import GlowButton from '@/components/GlowButton';
import Icon from '@/components/Icon';
import { useAuthStore } from '@/store/authStore';

const LEN = 6;

export default function OtpScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const pendingPhone = useAuthStore((s) => s.pendingPhone);
  const verifyOtp = useAuthStore((s) => s.verifyOtp);

  const [digits, setDigits] = useState<string[]>(Array(LEN).fill(''));
  const [error, setError] = useState(false);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

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
  };

  const handleVerify = () => {
    const ok = verifyOtp(code);
    if (!ok) {
      setError(true);
      return;
    }
    navigate('/home', { replace: true });
  };

  return (
    <div className="screen">
      <GradientBackground variant="aurora" />
      <div className="scroll no-tab">
        <button className="back-btn fade-in" onClick={() => navigate(-1)}>
          <Icon name="chevron-left" size={20} />
          {t('common.back')}
        </button>

        <div className="fade-in d1">
          <div className="eyebrow">{t('app.tagline')}</div>
          <div className="h1 mt-sm">{t('auth.otpTitle')}</div>
          <div className="body mt-sm">
            {t('auth.otpSubtitle', { phone: `+91 ${pendingPhone ?? ''}` })}
          </div>
        </div>

        <div className="fade-in d2 mt-lg">
          <GlassCard tint="pink" padding={22}>
            <div className="caption center" style={{ marginBottom: 12 }}>
              {t('auth.otpLabel')}
            </div>
            <div className="otp-row">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => (inputs.current[i] = el)}
                  className={`otp-box ${d ? 'filled' : ''}`}
                  inputMode="numeric"
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
                Invalid code
              </div>
            )}
            <div className="caption center muted" style={{ marginTop: 12 }}>
              {t('auth.otpHint')}
            </div>
          </GlassCard>
        </div>

        <div className="col gap fade-in d3 mt-lg">
          <GlowButton
            label={t('auth.verify')}
            onClick={handleVerify}
            disabled={!complete}
            icon={<Icon name="shield" size={18} />}
          />
          <div className="caption center" style={{ color: 'var(--orange)' }}>
            {t('auth.resend')}
          </div>
        </div>
      </div>
    </div>
  );
}
