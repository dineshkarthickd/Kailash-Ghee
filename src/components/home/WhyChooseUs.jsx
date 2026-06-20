import React from 'react';
import { FiShield, FiSun, FiClock, FiTruck } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { BotanicalDecoration } from '../common/BotanicalDecoration';

export const WhyChooseUs = () => {
  const { t } = useTranslation();

  const features = [
    {
      id: 1,
      icon: <FiShield className="" />,
      title: t('why_choose_us.feature1.title', '100% Pure & Natural'),
      description: t('why_choose_us.feature1.description', 'No preservatives, no artificial colors. Just pure, wholesome goodness from our farms to your family.')
    },
    {
      id: 2,
      icon: <FiSun className="" />,
      title: t('why_choose_us.feature2.title', 'Traditional Bilona Method'),
      description: t('why_choose_us.feature2.description', 'Churned from the curd of A2 cow milk, retaining all essential nutrients and natural aroma.')
    },
    {
      id: 3,
      icon: <FiClock className="" />,
      title: t('why_choose_us.feature3.title', 'Farm Fresh Daily'),
      description: t('why_choose_us.feature3.description', 'Produced in small batches every day to ensure you receive the freshest ghee possible.')
    },
    {
      id: 4,
      icon: <FiTruck className="" />,
      title: t('why_choose_us.feature4.title', 'Fast Delivery'),
      description: t('why_choose_us.feature4.description', 'Secure packaging and swift delivery across Tamil Nadu right to your doorstep.')
    }
  ];

  return (
    <div className="py-12 lg:py-16 bg-background relative overflow-hidden">
      <BotanicalDecoration position="left" className="scale-125 -translate-y-20" />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl lg:text-5xl text-primary font-normal">
            {t('home.why_choose_us', 'Why Choose Kailash Ghee')}
          </h2>
          <div className="w-16 h-[1px] bg-accent-gold mx-auto mt-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature) => (
            <div key={feature.id} className="flex flex-col items-center text-center group">
              <div className="p-4 rounded-full bg-accent-peach/30 text-primary mb-6 group-hover:bg-primary group-hover:text-background transition-colors duration-300">
                {/* Clone icon to set standard size/stroke */}
                {React.cloneElement(feature.icon, { className: "w-8 h-8 stroke-[1]" })}
              </div>
              <h3 className="font-heading text-2xl text-primary mb-4 font-normal">
                {feature.title}
              </h3>
              <p className="font-sans text-[15px] text-muted leading-relaxed max-w-[280px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
