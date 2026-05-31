/**
 * Lightweight inline SVG icon set — no external icon dependency.
 * Each icon is drawn with currentColor so it inherits text color.
 */
import React from 'react';

export type IconName =
  | 'home'
  | 'people'
  | 'cash'
  | 'briefcase'
  | 'menu'
  | 'chart'
  | 'megaphone'
  | 'finger'
  | 'person'
  | 'shield'
  | 'send'
  | 'chevron-right'
  | 'chevron-left'
  | 'check-circle'
  | 'add-person'
  | 'logout'
  | 'globe'
  | 'rocket'
  | 'time'
  | 'star';

interface Props {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const PATHS: Record<IconName, React.ReactNode> = {
  home: <path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10" />,
  people: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 6.5a3 3 0 0 1 0 5.8M17 20a6 6 0 0 0-3-5" />
    </>
  ),
  cash: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="2.5" />
      <circle cx="12" cy="12" r="2.8" />
      <path d="M6 9.5v.01M18 14.5v.01" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7.5" width="18" height="12" rx="2.5" />
      <path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5M3 12.5h18" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  chart: (
    <>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <rect x="7" y="11" width="3" height="6" />
      <rect x="12.5" y="7" width="3" height="10" />
      <rect x="18" y="13" width="2.5" height="4" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3 11v2a1 1 0 0 0 1 1h2l8 4V6l-8 4H4a1 1 0 0 0-1 1Z" />
      <path d="M18 9a3 3 0 0 1 0 6" />
    </>
  ),
  finger: (
    <>
      <path d="M6 11a6 6 0 0 1 12 0" />
      <path d="M9 11a3 3 0 0 1 6 0v3a6 6 0 0 1-1.5 4" />
      <path d="M9 12v3a8 8 0 0 0 .8 3.5" />
      <path d="M12 12v4" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  send: <path d="M4 12l16-7-7 16-2.5-6.5L4 12Z" />,
  'chevron-right': <path d="M9 6l6 6-6 6" />,
  'chevron-left': <path d="M15 6l-6 6 6 6" />,
  'check-circle': (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-6" />
    </>
  ),
  'add-person': (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.5 20a6.5 6.5 0 0 1 12 0" />
      <path d="M18 8v6M15 11h6" />
    </>
  ),
  logout: (
    <>
      <path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
      <path d="M10 12H3m0 0l3-3m-3 3l3 3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </>
  ),
  rocket: (
    <>
      <path d="M5 15c-1 1-1.5 4-1.5 4s3-.5 4-1.5" />
      <path d="M9 15l-3-3c2-5 6-9 12-9 0 6-4 10-9 12Z" />
      <circle cx="14.5" cy="9.5" r="1.5" />
    </>
  ),
  time: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  star: <path d="M12 3l2.6 5.6 6.1.8-4.5 4.2 1.2 6L12 17l-5.4 2.6 1.2-6L3.3 9.4l6.1-.8L12 3Z" />,
};

export default function Icon({ name, size = 22, color = 'currentColor', strokeWidth = 1.9 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
