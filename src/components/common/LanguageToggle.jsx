import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ta' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="flex items-center gap-2 group"
    >
      <span className="text-[13px] tracking-widest font-heading text-primary hover:text-accent-gold transition-colors">
        {i18n.language === 'en' ? 'TA' : 'EN'}
      </span>
    </motion.button>
  );
};


