import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import pt from './pt';

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'pt',
  resources: {
    en: en,
    pt: pt,
  },
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
