import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './translations/en';
import { sr } from './translations/sr';

const resources = {
  en: {
    translation: en
  },
  sr: {
    translation: sr
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'sr', // default language
    fallbackLng: 'sr',
    interpolation: {
      escapeValue: false
    }
  });

export const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
};

export default i18n; 