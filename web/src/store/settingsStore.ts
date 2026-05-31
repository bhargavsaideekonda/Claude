import { create } from 'zustand';
import i18n, { Language, persistLanguage } from '@/i18n';

interface SettingsState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  language: (i18n.language as Language) || 'en',
  setLanguage(lang) {
    i18n.changeLanguage(lang);
    persistLanguage(lang);
    set({ language: lang });
  },
}));
