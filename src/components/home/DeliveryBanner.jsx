import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Reveal } from '../common/Reveal';

export const DeliveryBanner = () => {
  const { t } = useTranslation();
  return (
    <section className="relative py-8 lg:py-12 bg-transparent overflow-hidden">
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#1F2922 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 relative z-10 flex flex-col lg:flex-row items-center justify-between text-center lg:text-left gap-8">
        
        <Reveal className="flex-1">
          <h2 className="font-heading text-3xl lg:text-4xl text-primary font-normal mb-3 flex items-center justify-center lg:justify-start gap-3">
            <span className="text-4xl">🚚</span>{t('home.delivery_title', 'Free Delivery Across Tamil Nadu')}
          </h2>
          <p className="font-sans text-[16px] text-primary/70">
            {t('home.delivery_subtitle', 'Order now and receive fresh ghee at your doorstep')}
          </p>
        </Reveal>

        <Reveal delay={150} className="flex-shrink-0">
          <Link 
            to="/products"
            className="inline-block px-10 py-4 bg-primary text-background font-sans text-[13px] tracking-[0.2em] uppercase hover:bg-primary/90 hover:shadow-lg transition-all duration-300 rounded-full"
          >
            {t('home.order_now', 'Order Now')}
          </Link>
        </Reveal>

      </div>
    </section>
  );
};
