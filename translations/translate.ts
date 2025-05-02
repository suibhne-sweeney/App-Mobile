import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// Import translations
import en from './en/translations.json';
import pl from './pl/translations.json';

const i18nInstance = i18n.createInstance();

// Configure i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pl: { translation: pl }
      // Add more languages as needed
    },
    lng: Localization.locale.split('-')[0], // Use device language
    fallbackLng: 'en', // Fallback to English
    interpolation: {
      escapeValue: false // React already escapes values
    },
    compatibilityJSON: 'v4' as any // Handle JSON compatibility
  });

  if (i18nInstance.services && i18nInstance.services.pluralResolver) {
  i18n.services.pluralResolver.addRule('pl', {
    numbers: [1, 2, 5],
    plurals: function(n: number) {
      if (n === 1) return 0;
      if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return 1;
      return 2;
    }
  });
  }

export default i18n;