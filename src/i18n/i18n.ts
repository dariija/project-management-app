import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en_lang from './locales/en/translation.json';
import ru_lang from './locales/ru/translation.json';

const resources = {
  en: { translation: en_lang },
  ru: { translation: ru_lang },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    supportedLngs: ['en', 'ru'],
    fallbackLng: 'en',
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
