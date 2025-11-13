import { useTranslation } from 'react-i18next';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../stores/useCartStore';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

export const Header = () => {
  const { t, i18n } = useTranslation();
  const itemCount = useCartStore(state => state.getItemCount());
  const { scrollToSection } = useSmoothScroll();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'he' ? 'en' : 'he';
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'he' ? 'rtl' : 'ltr';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-dark/95 backdrop-blur-md border-b border-accent-pink/20">
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="cursor-pointer flex items-center"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="text-2xl md:text-3xl font-logo">
              <span className="text-text-primary">NIGHT</span>
              <span className="text-accent-pink ml-2">WING</span>
            </span>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('menu')}
              className="text-text-primary hover:text-accent-pink transition-colors font-medium"
            >
              {t('nav.wings')}
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="text-text-primary hover:text-accent-pink transition-colors font-medium"
            >
              {t('nav.sauces')}
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="text-text-primary hover:text-accent-pink transition-colors font-medium"
            >
              {t('nav.salads')}
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="text-text-primary hover:text-accent-pink transition-colors font-medium"
            >
              {t('nav.drinks')}
            </button>
          </nav>

          {/* Right Side - Cart & Language */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 rounded-lg bg-accent-pink/20 hover:bg-accent-pink/30 border border-accent-pink/40 transition-colors text-base md:text-lg font-body font-bold text-text-primary"
            >
              {i18n.language === 'he' ? 'English' : 'עברית'}
            </button>

            {/* Cart Icon */}
            <button id="cart-button" className="relative p-2">
              <ShoppingCart className="w-6 h-6 text-text-primary" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-pink text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

