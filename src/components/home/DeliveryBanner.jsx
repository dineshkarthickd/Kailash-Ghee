import { Link } from 'react-router-dom';
import { Reveal } from '../common/Reveal';

export const DeliveryBanner = () => {
  return (
    <section className="bg-gradient-to-r from-[#3B1F0A] via-saffron to-[#3B1F0A] py-6 md:py-10 text-center text-ivory overflow-hidden relative">
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      <div className="max-w-6xl mx-auto w-full px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        
        <Reveal className="flex-1 text-center md:text-left">
          <h2 className="font-heading font-extrabold text-xl md:text-2xl lg:text-3xl text-white mb-2">
            <span className="mr-3">🚚</span>Free Delivery Available Across Tamil Nadu
          </h2>
          <p className="text-white opacity-90 text-xs md:text-sm font-body max-w-2xl">
            Order now and receive fresh ghee at your doorstep
          </p>
        </Reveal>

        <Reveal delay={150} className="flex-shrink-0">
          <Link 
            to="/products"
            className="inline-flex items-center justify-center px-4 py-2 md:px-6 md:py-2.5 bg-ivory text-darkbrown font-bold rounded-full text-xs md:text-sm hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-105 transition-all duration-300 whitespace-nowrap"
          >
            Order Now
          </Link>
        </Reveal>

      </div>
    </section>
  );
};
