import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GradientBackground from '@/components/GradientBackground';
import GlassCard from '@/components/GlassCard';
import ScreenHeader from '@/components/ScreenHeader';
import Icon, { IconName } from '@/components/Icon';

interface Item {
  to: string;
  titleKey: string;
  subtitleKey: string;
  icon: IconName;
  tint: 'pink' | 'orange' | 'blue';
  accent: string;
}

const ITEMS: Item[] = [
  { to: '/more/reports', titleKey: 'reports.title', subtitleKey: 'reports.subtitle', icon: 'chart', tint: 'pink', accent: '#D81B8A' },
  { to: '/more/announcements', titleKey: 'announcements.title', subtitleKey: 'announcements.subtitle', icon: 'megaphone', tint: 'orange', accent: '#FF8C29' },
  { to: '/more/attendance', titleKey: 'attendance.title', subtitleKey: 'attendance.subtitle', icon: 'finger', tint: 'blue', accent: '#1E6EE5' },
  { to: '/more/profile', titleKey: 'profile.title', subtitleKey: 'profile.subtitle', icon: 'person', tint: 'pink', accent: '#F4B71B' },
];

export default function MoreScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="screen">
      <GradientBackground variant="aurora" />
      <div className="scroll">
        <ScreenHeader title={t('more.title')} subtitle={t('app.motto')} />
        <div className="col gap">
          {ITEMS.map((item, idx) => (
            <div key={item.to} className={`fade-in d${idx + 1}`}>
              <GlassCard tint={item.tint} padding={16} onClick={() => navigate(item.to)}>
                <div className="row gap">
                  <span
                    className="activity-icon"
                    style={{ width: 48, height: 48, borderRadius: 14, background: item.accent + '26', borderColor: item.accent + '66', color: item.accent }}
                  >
                    <Icon name={item.icon} size={22} color={item.accent} />
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{t(item.titleKey)}</div>
                    <div className="caption">{t(item.subtitleKey)}</div>
                  </div>
                  <Icon name="chevron-right" size={18} color="var(--text-muted)" />
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
