import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FloatingWings } from './FloatingWings';
import { StarField } from './StarField';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

export const HeroSection = () => {
  const { t } = useTranslation();
  const { scrollToSection } = useSmoothScroll();

  const handleOrderClick = () => {
    scrollToSection('menu');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary">
      {/* Background Animations */}
      <StarField />
      <FloatingWings />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
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
            <div className="text-7xl md:text-9xl lg:text-[12rem] font-black text-text-primary mb-1 md:mb-2">
              NIGHT
            </div>
            <div className="text-7xl md:text-9xl lg:text-[12rem] font-black outlined-text">
              WING
            </div>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl text-text-primary font-hebrew mb-2 md:mb-3"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg text-text-primary/80 mb-6 md:mb-8"
          >
            {t('hero.description')}
          </motion.p>

          {/* Hours & Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mb-8 md:mb-12 text-accent-peach text-sm md:text-base"
          >
            <span>{t('hero.hours')}: {t('hero.hoursValue')}</span>
            <span className="hidden md:inline">•</span>
            <span>{t('hero.location')}</span>
          </motion.div>

          {/* ORDER Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOrderClick}
            className="btn-primary text-2xl md:text-4xl px-12 md:px-16 py-4 md:py-6 min-h-[64px] md:min-h-[80px] animate-pulse-glow"
          >
            {t('hero.order')}
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
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
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

