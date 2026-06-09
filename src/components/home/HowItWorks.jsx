import { FiShoppingBag, FiShoppingCart, FiCreditCard, FiTruck } from 'react-icons/fi';
import { Reveal } from '../common/Reveal';

export const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: 'Browse Products',
      description: 'Explore our range of premium, pure A2 cow ghee products.',
      icon: <FiShoppingBag className="w-5 h-5" />
    },
    {
      id: 2,
      title: 'Add to Cart',
      description: 'Select your preferred variant size and add it to your shopping cart.',
      icon: <FiShoppingCart className="w-5 h-5" />
    },
    {
      id: 3,
      title: 'Choose Payment',
      description: 'Securely checkout using UPI or choose Cash on Delivery.',
      icon: <FiCreditCard className="w-5 h-5" />
    },
    {
      id: 4,
      title: 'Get Delivered',
      description: 'Receive fresh ghee right at your doorstep swiftly and safely.',
      icon: <FiTruck className="w-5 h-5" />
    }
  ];

  return (
    <section className="bg-ivory py-8 md:py-10 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full px-4">
        <Reveal>
          <div className="text-center mb-6 md:mb-10">
            <h2 className="font-heading font-extrabold text-xl md:text-2xl lg:text-3xl text-darkbrown">How to Order</h2>
          </div>
        </Reveal>

        <div className="relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-lightgold z-0"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10">
            {steps.map((step, index) => (
              <Reveal key={step.id} delay={index * 150}>
                <div className="flex flex-col items-center text-center group">
                  
                  {/* Icon Circle */}
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 bg-gold opacity-10 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                    <div className="absolute inset-2 bg-white border-2 border-gold rounded-full flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-colors duration-300 shadow-md">
                      {step.icon}
                    </div>
                    {/* Number Badge */}
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-saffron text-white rounded-full flex items-center justify-center font-bold text-xs border-2 border-ivory shadow-sm">
                      {step.id}
                    </div>
                  </div>

                  {/* Text Content */}
                  <h3 className="font-heading font-semibold text-sm text-darkbrown mb-2">
                    {step.title}
                  </h3>
                  <p className="text-darkbrown opacity-80 text-xs leading-relaxed px-1">
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
