export const translations = {
  en: {
    // Navbar
    home: "Home",
    value: "360° Value",
    platform: "Platform", 
    industries: "Industries",
    solutions: "Solutions",
    services: "Services",
    contact: "Contact",
    
    // Hero Section
    heroTitle: "Transform Your Business with Intelligent",
    heroSubtitle: "ERP Solutions",
    heroDescription: "Streamline operations, boost productivity, and drive growth with our cutting-edge ERP platform designed for modern businesses.",
    getStarted: "Get Started",
    learnMore: "Learn More",
    
    // Contact Section
    contactTitle: "Get in Touch",
    contactSubtitle: "Ready to transform your business? Let's discuss your needs.",
    name: "Name",
    email: "Email",
    company: "Company",
    message: "Message",
    sendMessage: "Send Message",
    namePlaceholder: "Your name",
    emailPlaceholder: "your.email@company.com",
    companyPlaceholder: "Your company name",
    messagePlaceholder: "Tell us about your project...",
    
    // Value Section
    valueTitle: "360° Business Value",
    valueSubtitle: "Comprehensive solutions that transform every aspect of your business operations",
    cultureTitle: "Built for Arabic businesses",
    cultureFeatures: [
      "• Bilingual Support",
      "• Native RTL Interfaces", 
      "• Local Compliance",
      "• Cultural Alignment"
    ],
    
    // Services
    servicesTitle: "Our Services",
    servicesSubtitle: "Comprehensive solutions to accelerate your digital transformation",
    
    // Footer
    footerDescription: "Transforming businesses through intelligent ERP solutions and innovative technology.",
    quickLinks: "Quick Links",
    servicesFooter: "Services",
    support: "Support",
    documentation: "Documentation",
    community: "Community",
    helpCenter: "Help Center",
    contactUs: "Contact Us",
    followUs: "Follow Us",
    allRightsReserved: "All rights reserved.",
    
    // Common
    learnMoreBtn: "Learn More",
    getStartedBtn: "Get Started",
    contactBtn: "Contact Us",
    
    // Industries
    industriesTitle: "Industries We Serve",
    industriesSubtitle: "Tailored ERP solutions for diverse business sectors",
    
    // Platform
    platformTitle: "Our Platform",
    platformSubtitle: "Powerful features designed for modern business needs",
    
    // Features
    featuresTitle: "Platform Features",
    featuresSubtitle: "Everything you need to run your business efficiently"
  },
  
  ar: {
    // Navbar
    home: "الرئيسية",
    value: "القيمة الشاملة",
    platform: "المنصة",
    industries: "الصناعات", 
    solutions: "الحلول",
    services: "الخدمات",
    contact: "تواصل معنا",
    
    // Hero Section
    heroTitle: "حوّل أعمالك بحلول",
    heroSubtitle: "تخطيط الموارد الذكية", 
    heroDescription: "قم بتبسيط العمليات وزيادة الإنتاجية ودفع النمو مع منصة تخطيط الموارد المتطورة المصممة للأعمال الحديثة.",
    getStarted: "ابدأ الآن",
    learnMore: "اعرف المزيد",
    
    // Contact Section
    contactTitle: "تواصل معنا",
    contactSubtitle: "مستعد لتحويل أعمالك؟ دعنا نناقش احتياجاتك.",
    name: "الاسم",
    email: "البريد الإلكتروني",
    company: "الشركة", 
    message: "الرسالة",
    sendMessage: "إرسال الرسالة",
    namePlaceholder: "اسمك",
    emailPlaceholder: "your.email@company.com",
    companyPlaceholder: "اسم شركتك",
    messagePlaceholder: "أخبرنا عن مشروعك...",
    
    // Value Section
    valueTitle: "قيمة أعمال شاملة ٣٦٠°",
    valueSubtitle: "حلول شاملة تحوّل كل جانب من جوانب عمليات أعمالك",
    cultureTitle: "مصمم للأعمال العربية",
    cultureFeatures: [
      "• دعم ثنائي اللغة",
      "• واجهات أصلية من اليمين لليسار",
      "• امتثال محلي", 
      "• توافق ثقافي"
    ],
    
    // Services
    servicesTitle: "خدماتنا",
    servicesSubtitle: "حلول شاملة لتسريع التحول الرقمي لأعمالك",
    
    // Footer
    footerDescription: "نحوّل الأعمال من خلال حلول تخطيط الموارد الذكية والتكنولوجيا المبتكرة.",
    quickLinks: "روابط سريعة",
    servicesFooter: "الخدمات",
    support: "الدعم",
    documentation: "التوثيق",
    community: "المجتمع", 
    helpCenter: "مركز المساعدة",
    contactUs: "تواصل معنا",
    followUs: "تابعنا",
    allRightsReserved: "جميع الحقوق محفوظة.",
    
    // Common
    learnMoreBtn: "اعرف المزيد",
    getStartedBtn: "ابدأ الآن", 
    contactBtn: "تواصل معنا",
    
    // Industries
    industriesTitle: "الصناعات التي نخدمها",
    industriesSubtitle: "حلول تخطيط موارد مخصصة لقطاعات الأعمال المتنوعة",
    
    // Platform
    platformTitle: "منصتنا",
    platformSubtitle: "ميزات قوية مصممة لاحتياجات الأعمال الحديثة",
    
    // Features
    featuresTitle: "ميزات المنصة",
    featuresSubtitle: "كل ما تحتاجه لإدارة أعمالك بكفاءة"
  }
};

export const useTranslation = () => {
  const getCurrentLanguage = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'en';
    }
    return 'en';
  };

  const t = (key: string): string => {
    const currentLang = getCurrentLanguage() as keyof typeof translations;
    const translation = translations[currentLang];
    
    if (!translation) return key;
    
    // Handle nested keys (e.g., "hero.title")
    const keys = key.split('.');
    let result: any = translation;
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof result === 'string' ? result : key;
  };

  return { t, currentLanguage: getCurrentLanguage() };
};