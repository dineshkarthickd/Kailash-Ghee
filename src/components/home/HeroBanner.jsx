import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export const HeroBanner = () => {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 lg:pt-24 pb-12 bg-hero-gradient">
      
      {/* Desktop Background Image with Seamless Horizontal Fade */}
      <div className="hidden lg:block absolute top-0 right-0 w-[60%] h-full z-0">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: "url('/Hero.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'left center',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 35%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 35%)'
          }}
        />
      </div>

      {/* Mobile Background Image with Seamless Vertical Fade */}
      <div className="block lg:hidden absolute bottom-0 left-0 w-full h-[50%] z-0">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: "url('/Hero.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)'
          }}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 relative z-10 flex flex-col lg:flex-row items-center h-full">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left z-10 w-full lg:max-w-[50%] xl:max-w-[55%] pt-2 pb-[45vh] lg:py-0 flex flex-col justify-center"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-4"
          >
            <span className="font-heading text-lg text-primary/80">{t('home.hero_pretitle', 'Nourish Your Body & Soul')}</span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-[72px] font-heading font-normal text-primary leading-[1.2] lg:leading-[1.1] mb-6" dangerouslySetInnerHTML={{ __html: t('home.hero_title', 'Premium Organic Ghee.<br class="hidden sm:block" /> Handcrafted for Wellness.') }}>
          </h1>
          
          <p className="font-sans text-[16px] lg:text-[17px] text-muted max-w-lg mx-auto lg:mx-0 leading-relaxed mb-4 lg:mb-8">
            {t('home.hero_subtitle', 'Experience the pure, luxurious taste of traditional grass-fed ghee, sustainably sourced for radiant health.')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-4 lg:mt-0">
            <Link 
              to="/products"
              className="px-8 py-3.5 border-[1.5px] border-primary/40 hover:border-primary hover:bg-primary hover:text-background text-primary font-sans text-[13px] tracking-widest uppercase transition-all duration-300"
            >
              {t('common.shop_now', 'Shop Collection')}
            </Link>
          </div>
        </motion.div>

        {/* The image is now a seamless background element, so we remove the floating div here */}
      </div>
    </div>
  );
};


