import { ruTranslates } from '@/libs/translator/ru-translates';
import { enTranslates } from '@/libs/translator/en-translates';

export const translator = (key: string, language: string): string => {
  if (language === 'ru') {
    return ruTranslates[key];
  }
  if (language === 'en') {
    return enTranslates[key];
  }
};
