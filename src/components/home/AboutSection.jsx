import { Reveal } from '../common/Reveal';
import { Link } from 'react-router-dom';

export const AboutSection = () => {
  return (
    <section className="bg-white py-8 md:py-12 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full px-4">
        <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-10">
          
          {/* Left: Decorative Mandala / Image */}
          <Reveal className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-full border-2 border-gold p-4 flex items-center justify-center">
              {/* Spinning subtle dashed border */}
              <div className="absolute inset-2 rounded-full border border-dashed border-gold opacity-40 animate-[spin_40s_linear_infinite]"></div>
              
              <div className="relative w-full h-full bg-ivory rounded-full overflow-hidden flex items-center justify-center">
                <svg className="w-[80%] h-[80%] text-gold opacity-20" viewBox="0 0 100 100" fill="currentColor">
                  {/* Mandala-like geometric shape */}
                  <path d="M50 0 L55 35 L90 10 L65 45 L100 50 L65 55 L90 90 L55 65 L50 100 L45 65 L10 90 L35 55 L0 50 L35 45 L10 10 L45 35 Z" />
                  <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                {/* Central Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-saffron rounded-full shadow-[0_0_30px_rgba(212,175,55,0.4)] border-4 border-white flex items-center justify-center text-white font-heading font-extrabold text-xl tracking-wider">
                    KG
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start">
            <Reveal delay={150}>
              <span className="text-gold uppercase font-bold tracking-widest text-xs mb-3 block">Our Story</span>
              <h2 className="font-heading font-extrabold text-xl md:text-2xl lg:text-3xl text-darkbrown mb-4">
                Pure Tradition Since Generations
              </h2>
              <p className="text-darkbrown opacity-80 text-xs md:text-sm leading-relaxed mb-4 font-body">
                Kailash Ghee is crafted using the traditional Bilona method, where curd is churned by hand to extract the purest ghee. No shortcuts, no preservatives — just pure golden goodness for your family.
              </p>
              <p className="text-darkbrown opacity-80 text-xs md:text-sm leading-relaxed mb-8 font-body">
                Made fresh in small batches and delivered across Tamil Nadu with care and love.
              </p>
              
              <Link 
                to="/products"
                className="inline-block border-2 border-gold text-gold font-bold px-4 py-2 text-xs md:px-6 md:py-2.5 md:text-sm rounded-full hover:bg-gold hover:text-white transition-colors duration-300 shadow-sm"
              >
                Learn More
              </Link>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};
