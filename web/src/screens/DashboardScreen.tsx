import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GradientBackground from '@/components/GradientBackground';
import GlassCard from '@/components/GlassCard';
import StatCard from '@/components/StatCard';
import Icon, { IconName } from '@/components/Icon';
import { useAuthStore } from '@/store/authStore';

function greetingKey() {
  const h = new Date().getHours();
  if (h < 12) return 'dashboard.greetingMorning';
  if (h < 17) return 'dashboard.greetingAfternoon';
  return 'dashboard.greetingEvening';
}

interface Action {
  labelKey: string;
  icon: IconName;
  tint: 'pink' | 'orange' | 'blue';
  accent: string;
  to: string;
}

const ACTIONS: Action[] = [
  { labelKey: 'members.addMember', icon: 'add-person', tint: 'pink', accent: '#D81B8A', to: '/members' },
  { labelKey: 'collections.newCollection', icon: 'cash', tint: 'orange', accent: '#FF8C29', to: '/collections' },
  { labelKey: 'loans.newLoan', icon: 'briefcase', tint: 'blue', accent: '#1E6EE5', to: '/loans' },
  { labelKey: 'reports.title', icon: 'chart', tint: 'pink', accent: '#F4B71B', to: '/more/reports' },
];

const ACTIVITY = [
  { icon: 'cash' as IconName, color: '#FF8C29', title: '₹2,500 collected', sub: 'Lakshmi Devi · 09:42' },
  { icon: 'add-person' as IconName, color: '#D81B8A', title: 'Member enlisted', sub: 'Ramesh Naidu · 10:15' },
  { icon: 'briefcase' as IconName, color: '#1E6EE5', title: 'Loan approved', sub: '₹50,000 · Suresh Kumar · 11:03' },
];

export default function DashboardScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  return (
    <div className="screen">
      <GradientBackground variant="aurora" />
      <div className="scroll">
        {/* Greeting */}
        <div className="fade-in">
          <div className="eyebrow">{t('app.tagline').toUpperCase()}</div>
          <div className="h1 mt-sm">
            {t(greetingKey())},{' '}
            <span style={{ color: 'var(--orange)' }}>{user?.name?.split(' ')[0] ?? 'Soldier'}</span>
          </div>
          <div className="row gap-sm mt-sm">
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                background: 'var(--success)',
                boxShadow: '0 0 8px var(--success)',
              }}
            />
            <span className="caption">
              {user?.rank ?? t('profile.rankSoldier')} · {user?.branch ?? 'Palnadu'}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid-2 fade-in d1 mt-lg">
          <StatCard label={t('dashboard.stats.members')} value="1,284" icon="people" tint="pink" accent="#D81B8A" delta="+12 this week" />
          <StatCard label={t('dashboard.stats.collectionToday')} value="₹48,650" icon="cash" tint="orange" accent="#FF8C29" delta="62% of target" />
          <StatCard label={t('dashboard.stats.pendingLoans')} value="7" icon="time" tint="blue" accent="#1E6EE5" delta="2 to approve" />
          <StatCard label={t('dashboard.stats.attendance')} value={t('dashboard.onDuty')} icon="shield" tint="pink" accent="#2ECC71" delta={t('dashboard.inSince')} />
        </div>

        {/* Quick actions */}
        <div className="fade-in d2 mt-lg">
          <div className="section-title">{t('dashboard.quickActions')}</div>
          <div className="grid-2">
            {ACTIONS.map((a) => (
              <GlassCard key={a.labelKey} tint={a.tint} padding={16} onClick={() => navigate(a.to)}>
                <div
                  className="icon-chip"
                  style={{ background: a.accent + '26', borderColor: a.accent + '66', color: a.accent, width: 44, height: 44 }}
                >
                  <Icon name={a.icon} size={22} color={a.accent} />
                </div>
                <div style={{ fontWeight: 600, marginTop: 12 }}>{t(a.labelKey)}</div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="fade-in d3 mt-lg">
          <div className="section-title">{t('dashboard.recentActivity')}</div>
          <GlassCard tint="blue" padding={4}>
            {ACTIVITY.map((item, idx) => (
              <div key={item.title} className={`list-row ${idx !== ACTIVITY.length - 1 ? 'divider' : ''}`}>
                <span className="activity-icon" style={{ background: item.color + '26', borderColor: item.color + '55', color: item.color }}>
                  <Icon name={item.icon} size={16} color={item.color} />
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{item.title}</div>
                  <div className="caption">{item.sub}</div>
                </div>
                <Icon name="chevron-right" size={16} color="var(--text-muted)" />
              </div>
            ))}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
