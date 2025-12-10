import { defineStore } from 'pinia';

type Locale = 'ru' | 'en';
interface LocalizationState {
  locale: Locale;
}
export const useLocalizationStore = defineStore('localization', {
  state: (): LocalizationState => {
    return {
      locale: 'ru',
    };
  },
  actions: {
    setLocale(lang: Locale) {
      this.locale = lang;
    },
  },
});
