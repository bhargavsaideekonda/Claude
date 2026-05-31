/**
 * Palnadu MACS Soldiers — Color System
 * Inspired by the Palnadu Co-operative Society logo:
 *   - Magenta/Pink ring text
 *   - Blue soldier figures
 *   - Yellow figure accent
 *   - Plus orange (founder's choice) for the fantasy glow
 */
export const colors = {
  // Primary brand
  pink: '#D81B8A',
  pinkDeep: '#A30E68',
  pinkSoft: '#FFD1EA',

  // Secondary brand
  blue: '#1E6EE5',
  blueDeep: '#0E47A1',
  blueSoft: '#CFE0FF',

  // Tertiary / accent
  orange: '#FF8C29',
  orangeDeep: '#D86305',
  orangeSoft: '#FFE0C4',

  // Highlight
  yellow: '#F4B71B',
  yellowSoft: '#FFEFC2',

  // Surfaces
  deepNavy: '#0B1437',
  midnight: '#141B45',
  twilight: '#1F2766',
  cloud: '#FFF8F3',
  white: '#FFFFFF',
  ink: '#0A0A0A',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255,255,255,0.78)',
  textMuted: 'rgba(255,255,255,0.55)',
  textOnLight: '#0B1437',

  // Glass / overlay
  glass: 'rgba(255,255,255,0.10)',
  glassStrong: 'rgba(255,255,255,0.18)',
  glassBorder: 'rgba(255,255,255,0.22)',

  // Status
  success: '#2ECC71',
  warning: '#F4B71B',
  danger: '#FF4D6D',
  info: '#1E6EE5',
};

/** Signature gradients used across the app for the "fantasy" feel. */
export const gradients = {
  // Hero background: deep navy → magenta → orange (subtle aurora)
  aurora: ['#0B1437', '#3B1361', '#D81B8A', '#FF8C29'],

  // Splash: midnight → blue → magenta
  cosmic: ['#0B1437', '#1E6EE5', '#D81B8A'],

  // Soldier badge ring: orange → pink → blue
  badge: ['#FF8C29', '#D81B8A', '#1E6EE5'],

  // Buttons / CTAs
  cta: ['#FF8C29', '#D81B8A'],
  ctaBlue: ['#1E6EE5', '#0E47A1'],

  // Cards (subtle glass tint)
  glassPink: ['rgba(216,27,138,0.25)', 'rgba(30,110,229,0.15)'],
  glassOrange: ['rgba(255,140,41,0.30)', 'rgba(216,27,138,0.18)'],
  glassBlue: ['rgba(30,110,229,0.30)', 'rgba(11,20,55,0.20)'],

  // Header
  header: ['#0B1437', '#141B45', '#1F2766'],
};

export type ColorName = keyof typeof colors;
export type GradientName = keyof typeof gradients;
