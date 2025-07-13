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
    return (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) ? savedLanguage : 'en';
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
      document.body.classList.add('rtl');
    } else {
      document.documentElement.classList.remove('rtl');
      document.body.classList.remove('rtl');
    }

    // Update page title based on language
    document.title = language === 'ar' ? 'موفن وير - حلول تخطيط موارد المؤسسات' : 'MovinWare - ERP Solutions';
  }, [language]);

  const t = (key: string): any => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found in current language
        let fallbackValue: any = translations.en;
        for (const fallbackKey of keys) {
          if (fallbackValue && typeof fallbackValue === 'object' && fallbackKey in fallbackValue) {
            fallbackValue = fallbackValue[fallbackKey];
          } else {
            console.warn(`Translation key "${key}" not found in ${language} or English fallback`);
            return key; // Return key if not found in fallback
          }
        }
        return fallbackValue;
      }
    }
    
    return value;
  };

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    
    // Trigger a custom event for components that need to react to language changes
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: newLanguage, isRTL: newLanguage === 'ar' } 
    }));
  };

  const isRTL = language === 'ar';

  return {
    t,
    language,
    changeLanguage,
    isRTL,
  };
};