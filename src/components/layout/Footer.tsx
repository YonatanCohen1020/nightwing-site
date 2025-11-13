import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-bg-dark py-8 md:py-12 border-t border-accent-pink/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          {/* Contact Info */}
          <div className="text-center md:text-right space-y-2">
            <p className="text-text-primary/70 text-lg md:text-xl font-body font-bold">
              <span className="text-accent-pink">{t('footer.phone')}:</span> 058-6230849
            </p>
            <p className="text-text-primary/70 text-lg md:text-xl font-body font-bold">
              <span className="text-accent-pink">{t('footer.hours')}:</span> {t('hero.hoursValue')}
            </p>
            <p className="text-text-primary/70 text-lg md:text-xl font-body font-bold">
              <span className="text-accent-pink">{t('footer.location')}:</span> {t('hero.location')}
            </p>
          </div>

          {/* Disclaimer */}
          <div className="text-center md:text-left text-text-primary/60 text-base md:text-lg font-body font-bold max-w-md">
            <p>{t('footer.pickup')}</p>
            <p>{t('footer.delivery')}</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-accent-pink/10 text-center text-text-primary/40 text-xs">
          © {new Date().getFullYear()} Night Wing PH. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

