// @ts-nocheck
import { FiShoppingBag, FiShoppingCart, FiCreditCard, FiTruck } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { Reveal } from '../common/Reveal';
import { BotanicalDecoration } from '../common/BotanicalDecoration';

export const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    {
      id: 1,
      title: t('how_it_works.step1.title', 'Browse Products'),
      description: t('how_it_works.step1.description', 'Explore our range of premium, pure A2 cow ghee products.'),
      icon: <FiShoppingBag className="w-6 h-6 stroke-[1.5]" />
    },
    {
      id: 2,
      title: t('how_it_works.step2.title', 'Add to Cart'),
      description: t('how_it_works.step2.description', 'Select your preferred variant size and add it to your shopping cart.'),
      icon: <FiShoppingCart className="w-6 h-6 stroke-[1.5]" />
    },
    {
      id: 3,
      title: t('how_it_works.step3.title', 'Choose Payment'),
      description: t('how_it_works.step3.description', 'Securely checkout using UPI or choose Cash on Delivery.'),
      icon: <FiCreditCard className="w-6 h-6 stroke-[1.5]" />
    },
    {
      id: 4,
      title: t('how_it_works.step4.title', 'Get Delivered'),
      description: t('how_it_works.step4.description', 'Receive fresh ghee right at your doorstep swiftly and safely.'),
      icon: <FiTruck className="w-6 h-6 stroke-[1.5]" />
    }
  ];

  return (
    <section className="py-12 lg:py-16 bg-transparent text-primary overflow-hidden relative">

      <BotanicalDecoration position="right" className="scale-125 translate-y-20" />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        <Reveal>
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl lg:text-5xl font-normal mb-6">{t('home.how_to_order', 'How to Order')}</h2>
            <div className="w-16 h-[1px] bg-accent-gold mx-auto"></div>
          </div>
        </Reveal>

        <div className="relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-[45px] left-[10%] right-[10%] h-[1px] border-t border-dashed border-primary/20 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {steps.map((step, index) => (
              <Reveal key={step.id} delay={index * 150}>
                <div className="flex flex-col items-center text-center group">
                  
                  {/* Icon Circle */}
                  <div className="relative mb-8">
                    <div className="w-24 h-24 rounded-full border border-primary/10 flex items-center justify-center bg-white text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm">
                      {step.icon}
                    </div>
                    {/* Number Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent-gold text-white font-sans font-bold flex items-center justify-center text-sm shadow-md">
                      {step.id}
                    </div>
                  </div>

                  {/* Text Content */}
                  <h3 className="font-heading text-2xl font-normal mb-4">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[15px] text-primary/70 leading-relaxed max-w-[260px]">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
