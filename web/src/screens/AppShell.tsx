import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon, { IconName } from '@/components/Icon';

interface Tab {
  to: string;
  labelKey: string;
  icon: IconName;
}

const TABS: Tab[] = [
  { to: '/home', labelKey: 'tabs.dashboard', icon: 'home' },
  { to: '/members', labelKey: 'tabs.members', icon: 'people' },
  { to: '/collections', labelKey: 'tabs.collections', icon: 'cash' },
  { to: '/loans', labelKey: 'tabs.loans', icon: 'briefcase' },
  { to: '/more', labelKey: 'tabs.more', icon: 'menu' },
];

export default function AppShell() {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  // Highlight "More" tab for any /more/* sub-route.
  const isActive = (to: string) =>
    to === '/more' ? pathname.startsWith('/more') : pathname === to;

  return (
    <>
      <Outlet />
      <nav className="tabbar">
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={`tab ${isActive(tab.to) ? 'active' : ''}`}
          >
            <span className="tab-icon">
              <Icon name={tab.icon} size={20} />
            </span>
            {t(tab.labelKey)}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
