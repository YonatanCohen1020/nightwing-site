import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FloatingWings } from "./FloatingWings";
import { StarField } from "./StarField";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";

export const HeroSection = () => {
  const { t } = useTranslation();
  const { scrollToSection } = useSmoothScroll();

  const handleOrderClick = () => {
    scrollToSection("menu");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary">
      {/* Background Animations */}
      <StarField />
      <FloatingWings />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          {/* Title - Logo Style */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-logo mb-4 md:mb-6 leading-tight"
          >
            <div className="text-7xl md:text-9xl lg:text-[12rem] font-logo font-bold text-text-primary mb-1 md:mb-2">
              NIGHT
            </div>
            <div className="text-7xl md:text-9xl lg:text-[12rem] font-logo font-bold outlined-text wing-flicker">
              WING
            </div>
          </motion.h1>

          {/* Subtitle - Disabled */}
          {/* <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl md:text-4xl lg:text-5xl text-text-primary font-body font-bold mb-2 md:mb-3"
          >
            {t('hero.subtitle')}
          </motion.p> */}

          {/* Description - Disabled */}
          {/* <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl md:text-3xl lg:text-4xl text-text-primary/80 font-body font-bold mb-6 md:mb-8"
          >
            {t('hero.description')}
          </motion.p> */}

          {/* Hours & Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mb-8 md:mb-12 text-accent-peach text-3xl md:text-4xl lg:text-5xl font-body font-bold hours-glow"
          >
            <span>
              {t("hero.day")} {t("hero.hoursValue")}
            </span>
            <span className="hidden md:inline">•</span>
            <span>{t("hero.location")}</span>
          </motion.div>

          {/* ORDER Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleOrderClick}
            className="btn-primary text-xl md:text-2xl px-6 md:px-8 py-3 md:py-4 min-h-[48px] md:min-h-[56px] animate-pulse-glow-light"
          >
            {t("hero.order")}
          </motion.button>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-12 md:mt-16"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-text-primary/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
