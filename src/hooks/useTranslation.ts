import { useState, useEffect } from 'react';
import enTranslations from '../translations/en.json';
import arTranslations from '../translations/ar.json';

type Language = 'en' | 'ar';

const translations = {
  en: enTranslations,
  ar: arTranslations,
};

export const useTranslation = () => {
  const [language, setLanguage] = useState<Language>(() => {
    // Get language from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'en';
  });

  useEffect(() => {
    // Apply language and direction to document
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    // Save to localStorage
    localStorage.setItem('language', language);
    
    // Add/remove RTL class for additional styling if needed
    if (language === 'ar') {
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.classList.remove('rtl');
    }
  }, [language]);

  const t = (key: string): any => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if not found in fallback
          }
        }
        break;
      }
    }
    
    return value !== undefined ? value : key;
  };

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const isRTL = language === 'ar';

  return {
    t,
    language,
    changeLanguage,
    isRTL,
  };
};