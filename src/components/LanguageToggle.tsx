import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle = ({ className = "" }: LanguageToggleProps) => {
  const { language, changeLanguage, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    {
      code: 'en' as const,
      name: 'English',
      nativeName: 'English'
    },
    {
      code: 'ar' as const,
      name: 'Arabic',
      nativeName: 'العربية'
    }
  ];

  const currentLang = languages.find(lang => lang.code === language) || languages[0];

  const handleLanguageChange = (langCode: 'en' | 'ar') => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('common.language')}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 text-pulse-500 min-w-[120px] justify-between"
      >
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">{currentLang.nativeName}</span>
        </div>
        <ChevronDown 
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          
          {/* Dropdown */}
          <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[150px] z-50 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={cn(
                  "w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between",
                  lang.code === language ? 'bg-pulse-50 text-pulse-600 font-medium' : 'text-gray-700'
                )}
                dir={lang.code === 'ar' ? 'rtl' : 'ltr'}
              >
                <span>{lang.nativeName}</span>
                <span className="text-xs text-gray-500">{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageToggle;