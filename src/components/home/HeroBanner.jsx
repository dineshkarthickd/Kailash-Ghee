import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const HeroBanner = () => {
  const { t } = useTranslation();
  
  return (
    <div className="relative bg-texture-dark overflow-hidden min-h-[75vh] md:min-h-[85vh] flex items-center">
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-4 h-4 rounded-full bg-gold opacity-50 blur-[2px] animate-pulse"></div>
      <div className="absolute bottom-40 left-20 w-3 h-3 rounded-full bg-saffron opacity-60 blur-[1px]"></div>
      <div className="absolute top-40 right-20 w-6 h-6 rounded-full bg-lightgold opacity-40 blur-[3px]"></div>
      <div className="absolute bottom-20 right-1/4 w-4 h-4 rounded-full bg-gold opacity-30 animate-bounce"></div>

      <div className="max-w-6xl mx-auto w-full px-4 py-6 md:py-10 lg:py-14 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
          
          {/* Image Content (Stacked above text on mobile) */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
              {/* Outer glowing rings */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-gold opacity-50 animate-[spin_30s_linear_infinite]"></div>
              <div className="absolute inset-2 rounded-full border-4 border-gold opacity-30 animate-[spin_40s_linear_infinite_reverse]"></div>
              
              {/* The image container */}
              <div className="absolute inset-6 rounded-full overflow-hidden border-4 border-gold shadow-[0_0_50px_rgba(212,175,55,0.5)] bg-white">
                <img
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  src="/Screenshot%202026-06-08%20142247.png"
                  alt="Premium Golden Ghee"
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start">
            <h1 className="text-2xl md:text-3xl lg:text-4xl tracking-tight font-extrabold font-heading text-white leading-tight">
              <span className="block mb-2">Experience the pure</span>
              <span className="block text-xl md:text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200">
                Taste of Tradition
              </span>
            </h1>
            <p className="mt-4 text-xs md:text-sm text-ivory opacity-90 max-w-xl mx-auto lg:mx-0 font-body font-light leading-relaxed">
              Premium A2 Cow Ghee crafted with the traditional Bilona method. Rich in aroma, perfect in texture, and wholesomely golden for your family.
            </p>
            <div className="mt-8">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-5 py-2 border-2 border-gold text-sm font-bold rounded-full text-darkbrown bg-gold hover:bg-transparent hover:text-gold transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:-translate-y-1"
              >
                Shop Now
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Wavy Divider at bottom */}
      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none mb-0">
        <svg className="relative block w-full h-[50px] sm:h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.3,194.5,108.96c53.3-8.68,104.2-28.18,155-44.57Z" className="fill-ivory"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-gold opacity-30"></path>
        </svg>
      </div>
    </div>
  );
};
