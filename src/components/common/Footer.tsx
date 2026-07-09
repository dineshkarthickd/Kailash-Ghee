// @ts-nocheck
import { Link } from 'react-router-dom';
import { FiInstagram, FiMail, FiPhone } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { BotanicalDecoration } from './BotanicalDecoration';

export const Footer = () => {
  const { t } = useTranslation();
  const { isAdmin } = useAuth();

  return (
    <footer className="bg-transparent text-primary/80 pt-12 pb-4 border-t-[1px] border-primary/10 relative overflow-hidden">
      
      <BotanicalDecoration position="left" className="scale-125 -translate-y-10 opacity-5" />
      <BotanicalDecoration position="right" className="scale-125 translate-y-10 opacity-5" />

      {/* Decorative Top Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/40 to-transparent"></div>

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-8 mb-8 relative z-10">
        
        {/* Column 1 - Brand */}
        <div className="flex flex-col items-start">
          <h2 className="font-heading text-3xl font-normal tracking-widest uppercase mb-6 text-primary">
            {t('footer.brand_name', 'Kailash Ghee')}
          </h2>
          <p className="font-sans text-[15px] leading-relaxed text-primary/70 mb-8 max-w-xs">
            {t('footer.description', 'Premium quality pure cow ghee, crafted with traditional Bilona methods for unparalleled taste and health benefits.')}
          </p>
          <div className="flex items-center gap-5">
            <a href="https://www.instagram.com/kailash_ghee_odc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border-[1px] border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300">
              <FiInstagram className="w-4 h-4 stroke-[1.5]" />
            </a>
          </div>
        </div>

        {/* Column 2 - Quick Links */}
        <div className="flex flex-col items-start">
          <h3 className="font-heading text-xl font-normal text-primary mb-6 tracking-wide">
            {t('footer.quick_links', 'Quick Links')}
          </h3>
          <div className="flex flex-col gap-4 font-sans text-[15px] text-primary/70">
            <Link to="/" className="hover:text-accent-gold hover:pl-2 transition-all duration-300">{t('common.home', 'Home')}</Link>
            <Link to="/products" className="hover:text-accent-gold hover:pl-2 transition-all duration-300">{t('common.products', 'Our Products')}</Link>
            <Link to="/cart" className="hover:text-accent-gold hover:pl-2 transition-all duration-300">{t('common.cart', 'Cart')}</Link>
            {isAdmin && (
              <Link to="/admin" className="hover:text-accent-gold hover:pl-2 transition-all duration-300">Admin Pannel</Link>
            )}
          </div>
        </div>

        {/* Column 4 - Contact */}
        <div className="flex flex-col items-start">
          <h3 className="font-heading text-xl font-normal text-primary mb-6 tracking-wide">
            {t('footer.contact_us', 'Contact Us')}
          </h3>
          <div className="flex flex-col gap-5 font-sans text-[15px] text-primary/70">
            <div className="flex items-center gap-3">
              <FiMail className="w-5 h-5 stroke-[1.5]" />
              <a href="mailto:kailashgheeoddanchatram@gmail.com" className="hover:text-accent-gold transition-colors">
                kailashgheeoddanchatram@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FiPhone className="w-5 h-5 stroke-[1.5]" />
              <a href="tel:+919360282155" className="hover:text-accent-gold transition-colors">
                +91 9360282155
              </a>
            </div>
            <p className="mt-2 text-sm text-primary/50">
              Oddanchatram, Tamil Nadu, India
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 pt-5 border-t-[1px] border-primary/10 text-center lg:text-left flex flex-col md:flex-row items-center justify-between font-sans text-[13px] text-primary/50 uppercase tracking-widest relative z-10">
        <p>
          © {new Date().getFullYear()} {t('footer.brand_name', 'Kailash Ghee')}. {t('footer.rights', 'All rights reserved.')}
        </p>
        <div className="mt-4 md:mt-0 flex gap-6">
          <span className="cursor-pointer hover:text-accent-gold transition-colors">CRAFTED BY DINESH KARTHICK DURGADAS ♥</span>
        </div>
      </div>
    </footer>
  );
};
