import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BotanicalDecoration } from '../common/BotanicalDecoration';
import aboutImage from '../../assets/about.png';

export const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 lg:py-24 bg-background overflow-hidden relative">
      <BotanicalDecoration position="right" className="scale-150 translate-y-10 z-10 opacity-30" />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image (4:3 ratio as requested) */}
          <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl flex items-center justify-center">
            <img 
              src={aboutImage} 
              alt="About Kailash Ghee" 
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Text content (Restored to original grid layout) */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <span className="font-sans text-[12px] tracking-[0.3em] uppercase text-primary/50 mb-4">
              {t('home.our_story', 'Our Story')}
            </span>
            <h2 className="font-heading text-4xl lg:text-5xl text-primary font-normal leading-tight mb-8">
              {t('home.pure_tradition', 'Pure Tradition Since Generations')}
            </h2>
            <div className="w-16 h-[1px] bg-accent-gold mb-8"></div>
            <p className="font-sans text-[16px] text-primary/80 leading-relaxed mb-6">
              {t('home.about_desc_1', 'Kailash Ghee is crafted using the traditional Bilona method, where curd is churned by hand to extract the purest ghee. No shortcuts, no preservatives — just pure golden goodness for your family.')}
            </p>
            <p className="font-sans text-[16px] text-primary/80 leading-relaxed mb-10">
              {t('home.about_desc_2', 'Made fresh in small batches and delivered across Tamil Nadu with care and love.')}
            </p>
            
            <Link 
              to="/products"
              className="group relative pb-2 text-primary font-sans text-[13px] tracking-widest uppercase"
            >
              {t('home.shop_now', 'Shop Now')}
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-accent-gold scale-x-50 origin-left group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};
