import { MD3DarkTheme, configureFonts } from 'react-native-paper';
import { DarkTheme as NavDarkTheme } from '@react-navigation/native';
import { colors } from './colors';
import { fonts } from './typography';

const baseFont = {
  fontFamily: fonts.regular,
};

const fontConfig = {
  displayLarge: { ...baseFont, fontFamily: fonts.extrabold },
  displayMedium: { ...baseFont, fontFamily: fonts.bold },
  displaySmall: { ...baseFont, fontFamily: fonts.bold },
  headlineLarge: { ...baseFont, fontFamily: fonts.bold },
  headlineMedium: { ...baseFont, fontFamily: fonts.bold },
  headlineSmall: { ...baseFont, fontFamily: fonts.semibold },
  titleLarge: { ...baseFont, fontFamily: fonts.semibold },
  titleMedium: { ...baseFont, fontFamily: fonts.semibold },
  titleSmall: { ...baseFont, fontFamily: fonts.medium },
  bodyLarge: baseFont,
  bodyMedium: baseFont,
  bodySmall: baseFont,
  labelLarge: { ...baseFont, fontFamily: fonts.medium },
  labelMedium: { ...baseFont, fontFamily: fonts.medium },
  labelSmall: { ...baseFont, fontFamily: fonts.medium },
};

export const paperTheme = {
  ...MD3DarkTheme,
  dark: true,
  roundness: 16,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.pink,
    onPrimary: colors.white,
    primaryContainer: colors.pinkDeep,
    onPrimaryContainer: colors.white,

    secondary: colors.blue,
    onSecondary: colors.white,
    secondaryContainer: colors.blueDeep,
    onSecondaryContainer: colors.white,

    tertiary: colors.orange,
    onTertiary: colors.white,
    tertiaryContainer: colors.orangeDeep,
    onTertiaryContainer: colors.white,

    background: colors.deepNavy,
    onBackground: colors.textPrimary,

    surface: colors.midnight,
    onSurface: colors.textPrimary,
    surfaceVariant: colors.twilight,
    onSurfaceVariant: colors.textSecondary,

    outline: colors.glassBorder,
    outlineVariant: 'rgba(255,255,255,0.12)',

    error: colors.danger,
    onError: colors.white,
  },
  navigationTheme: {
    ...NavDarkTheme,
    colors: {
      ...NavDarkTheme.colors,
      primary: colors.pink,
      background: colors.deepNavy,
      card: colors.midnight,
      text: colors.textPrimary,
      border: 'transparent',
      notification: colors.orange,
    },
  },
};

export type AppTheme = typeof paperTheme;
