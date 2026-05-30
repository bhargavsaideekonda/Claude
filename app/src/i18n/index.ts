import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './en.json';
import te from './te.json';

export const SUPPORTED_LANGUAGES = ['en', 'te'] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

const STORAGE_KEY = '@palnadu/lang';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    te: { translation: te },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  compatibilityJSON: 'v4',
});

// Restore the user's saved language on startup.
AsyncStorage.getItem(STORAGE_KEY)
  .then((saved) => {
    if (saved && SUPPORTED_LANGUAGES.includes(saved as Language)) {
      i18n.changeLanguage(saved);
    }
  })
  .catch(() => {
    // Silent fail — keep default English.
  });

export async function setLanguage(lang: Language) {
  await i18n.changeLanguage(lang);
  await AsyncStorage.setItem(STORAGE_KEY, lang);
}

export default i18n;
