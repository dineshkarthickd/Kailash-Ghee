import { FiStar } from 'react-icons/fi';
import { Reveal } from '../common/Reveal';

export const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Chennai",
      text: "Best ghee I have ever tasted. Pure and aromatic!",
      stars: 5
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Coimbatore",
      text: "Traditional taste that reminds me of my grandmother's kitchen.",
      stars: 5
    },
    {
      id: 3,
      name: "Meena Devi",
      location: "Madurai",
      text: "Ordered twice already. Fast delivery and excellent quality.",
      stars: 5
    }
  ];

  return (
    <section className="bg-[#FFF3E0] py-8 md:py-12 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full px-4">
        <Reveal>
          <div className="text-center mb-6 md:mb-10">
            <h2 className="font-heading font-extrabold text-xl md:text-2xl lg:text-3xl text-darkbrown">What Our Customers Say</h2>
          </div>
        </Reveal>

        {/* Mobile: Horizontal Scroll Snap | Desktop: Grid */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-3 md:gap-5 pb-8 md:pb-0 hide-scrollbar snap-x snap-mandatory">
          {testimonials.map((review, index) => (
            <Reveal key={review.id} delay={index * 150} className="min-w-[85vw] sm:min-w-[300px] md:min-w-0 snap-center flex">
              <div className="bg-cream rounded-2xl p-4 md:p-5 border border-lightgold shadow-sm relative flex flex-col w-full">
                
                {/* Large Quote Mark */}
                <div className="absolute top-2 left-3 text-gold opacity-30 font-serif text-3xl leading-none select-none">
                  "
                </div>
                
                <div className="relative z-10 flex-1 flex flex-col pt-4">
                  {/* Stars */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(review.stars)].map((_, i) => (
                      <FiStar key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>

                  <p className="font-body italic text-darkbrown opacity-90 text-xs md:text-sm mb-4 flex-1 leading-relaxed">
                    "{review.text}"
                  </p>

                  <div>
                    <h4 className="font-heading font-bold text-sm text-darkbrown">
                      {review.name}
                    </h4>
                    <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">
                      {review.location}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
