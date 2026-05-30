import { create } from 'zustand';
import i18n, { Language, setLanguage } from '@/i18n';

interface SettingsState {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  language: (i18n.language as Language) || 'en',
  async setLanguage(lang) {
    await setLanguage(lang);
    set({ language: lang });
  },
}));
