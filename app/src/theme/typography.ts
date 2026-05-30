/**
 * Typography scale — Poppins family (loaded in App.tsx).
 * Rounded, modern, and renders well in both English and Telugu.
 */
export const fonts = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semibold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
  extrabold: 'Poppins_800ExtraBold',
};

export const typography = {
  display: {
    fontFamily: fonts.extrabold,
    fontSize: 36,
    lineHeight: 42,
    letterSpacing: -0.5,
  },
  h1: {
    fontFamily: fonts.bold,
    fontSize: 28,
    lineHeight: 34,
  },
  h2: {
    fontFamily: fonts.bold,
    fontSize: 22,
    lineHeight: 28,
  },
  h3: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    lineHeight: 24,
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
  },
  bodyStrong: {
    fontFamily: fonts.medium,
    fontSize: 15,
    lineHeight: 22,
  },
  caption: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  overline: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.2,
    textTransform: 'uppercase' as const,
  },
  button: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    letterSpacing: 0.4,
  },
};
