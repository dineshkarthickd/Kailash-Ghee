import { FiShield, FiSun, FiClock, FiTruck } from 'react-icons/fi';
import { Reveal } from '../common/Reveal';

export const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <FiShield className="w-5 h-5" />,
      title: '100% Pure & Natural',
      description: 'No preservatives, no artificial colors. Just pure, wholesome goodness from our farms to your family.'
    },
    {
      id: 2,
      icon: <FiSun className="w-5 h-5" />,
      title: 'Traditional Bilona Method',
      description: 'Churned from the curd of A2 cow milk, retaining all essential nutrients and natural aroma.'
    },
    {
      id: 3,
      icon: <FiClock className="w-5 h-5" />,
      title: 'Farm Fresh Daily',
      description: 'Produced in small batches every day to ensure you receive the freshest ghee possible.'
    },
    {
      id: 4,
      icon: <FiTruck className="w-5 h-5" />,
      title: 'Fast Delivery',
      description: 'Secure packaging and swift delivery across Tamil Nadu right to your doorstep.'
    }
  ];

  return (
    <div className="bg-ivory py-8 md:py-12 relative bg-pattern-dots bg-opacity-5">
      <div className="max-w-6xl mx-auto w-full px-4 relative z-10">
        <Reveal>
          <h2 className="font-heading font-extrabold text-xl md:text-2xl lg:text-3xl text-darkbrown text-center mb-6">Why Choose Kailash Ghee</h2>
        </Reveal>
        
        <div className="mt-6 md:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {features.map((feature, index) => (
            <Reveal key={feature.id} delay={index * 100} className="h-full">
              <div className="bg-gradient-to-b from-cream to-white p-4 rounded-2xl border border-lightgold shadow-[0_4px_20px_rgba(212,175,55,0.05)] text-center flex flex-col items-center group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(212,175,55,0.2)] hover:border-gold h-full">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-saffron to-gold flex items-center justify-center text-white mb-4 transition-all duration-300 shadow-md group-hover:shadow-[0_0_20px_rgba(212,175,55,0.6)]">
                  {feature.icon}
                </div>
                <h3 className="font-heading text-sm md:text-base font-bold text-darkbrown mb-2">
                  {feature.title}
                </h3>
                <p className="text-darkbrown opacity-80 text-xs md:text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};
