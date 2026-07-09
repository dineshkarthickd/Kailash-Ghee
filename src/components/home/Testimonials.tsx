// @ts-nocheck
import { FiStar } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { BotanicalDecoration } from '../common/BotanicalDecoration';

export const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      id: 1,
      name: t('reviews.r1.name', 'Priya Sharma'),
      location: t('reviews.r1.location', 'Chennai'),
      text: t('reviews.r1.text', 'Best ghee I have ever tasted. Pure and aromatic!'),
      stars: 5
    },
    {
      id: 2,
      name: t('reviews.r2.name', 'Rajesh Kumar'),
      location: t('reviews.r2.location', 'Coimbatore'),
      text: t('reviews.r2.text', "Traditional taste that reminds me of my grandmother's kitchen."),
      stars: 5
    },
    {
      id: 3,
      name: t('reviews.r3.name', 'Meena Devi'),
      location: t('reviews.r3.location', 'Madurai'),
      text: t('reviews.r3.text', 'Ordered twice already. Fast delivery and excellent quality.'),
      stars: 5
    }
  ];

  return (
    <section className="py-12 lg:py-16 bg-transparent relative overflow-hidden">
      <BotanicalDecoration position="left" className="scale-125 -translate-y-10" />
      
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl lg:text-5xl text-primary font-normal mb-6">
            {t('headings.testimonials', 'What Our Customers Say')}
          </h2>
          <div className="w-16 h-[1px] bg-accent-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((review) => (
            <div key={review.id} className="bg-white p-10 rounded-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border-[1px] border-primary/5 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-500">
              
              <div className="flex gap-1 text-accent-gold mb-6">
                {[...Array(review.stars)].map((_, i) => (
                  <FiStar key={i} className="fill-current w-4 h-4" />
                ))}
              </div>

              <p className="font-sans text-[15px] lg:text-[16px] text-primary/80 leading-relaxed italic mb-8 flex-grow">
                "{review.text}"
              </p>

              <div className="mt-auto">
                <h4 className="font-heading text-xl text-primary font-medium">
                  {review.name}
                </h4>
                <p className="font-sans text-[12px] text-primary/40 tracking-widest uppercase mt-1">
                  {review.location}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
