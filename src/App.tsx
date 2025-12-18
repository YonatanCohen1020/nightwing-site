import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Routes, Route } from "react-router-dom";
import { HeroSection } from "./components/hero/HeroSection";
import { MenuSection } from "./components/menu/MenuSection";
import { Footer } from "./components/layout/Footer";
import { CartButton } from "./components/cart/CartButton";
import { CartPanel } from "./components/cart/CartPanel";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  const { i18n } = useTranslation();
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    // Set initial direction based on language
    const currentLang = i18n.language;
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === "he" ? "rtl" : "ltr";
  }, [i18n.language]);

  useEffect(() => {
    // Preserve scroll position on mount
    const scrollY = sessionStorage.getItem("scrollPosition");
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY, 10));
      sessionStorage.removeItem("scrollPosition");
    }

    // Save scroll position before unload
    const handleBeforeUnload = () => {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === "he" ? "en" : "he";
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === "he" ? "rtl" : "ltr";
  };

  const Home = () => (
    <>
      <HeroSection />
      <MenuSection />
    </>
  );

  return (
    <div className="min-h-screen">
      {/* Cart Button - Top Left */}
      <CartButton onClick={() => setIsCartOpen(true)} />

      {/* Language Switcher Button - Top Right */}
      <button
        onClick={toggleLanguage}
        className="fixed top-4 right-4 z-50 px-2 py-1 rounded-lg bg-accent-pink/20 hover:bg-accent-pink/30 border border-accent-pink/40 transition-colors text-sm font-body font-bold text-text-primary shadow-lg"
      >
        {i18n.language === "he" ? "English" : "עברית"}
      </button>

      {/* Cart Panel */}
      <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
