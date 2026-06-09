import { useTranslation } from 'react-i18next';

export const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ta' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="px-2 py-1 text-xs font-bold border-2 border-gold text-darkbrown rounded-full hover:bg-gradient-to-r hover:from-saffron hover:to-gold hover:text-white hover:border-transparent transition-all duration-300 shadow-[0_2px_10px_rgba(212,175,55,0.15)] flex items-center gap-2"
      aria-label="Toggle Language"
    >
      <span className="w-4 h-4 flex items-center justify-center bg-cream rounded-full text-[10px] text-gold font-black">
        {i18n.language === 'en' ? 'அ' : 'A'}
      </span>
      {i18n.language === 'en' ? 'தமிழ்' : 'English'}
    </button>
  );
};
