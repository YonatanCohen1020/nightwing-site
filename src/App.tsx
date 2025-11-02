import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { HeroSection } from './components/hero/HeroSection';
import { MenuSection } from './components/menu/MenuSection';
import { Footer } from './components/layout/Footer';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set initial direction based on language
    const currentLang = i18n.language;
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'he' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'he' ? 'en' : 'he';
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'he' ? 'rtl' : 'ltr';
  };

  return (
    <div className="min-h-screen">
      {/* Language Switcher Button - Top Right */}
      <button
        onClick={toggleLanguage}
        className="fixed top-4 right-4 z-50 px-2 py-1 rounded-lg bg-accent-pink/20 hover:bg-accent-pink/30 border border-accent-pink/40 transition-colors text-sm font-body font-bold text-text-primary shadow-lg"
      >
        {i18n.language === 'he' ? 'English' : 'עברית'}
      </button>

      <HeroSection />
      <MenuSection />
      <Footer />
    </div>
  );
}

export default App;

