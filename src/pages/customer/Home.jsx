import { HeroBanner } from '../../components/home/HeroBanner';
import { FeaturedProducts } from '../../components/home/FeaturedProducts';
import { WhyChooseUs } from '../../components/home/WhyChooseUs';
import { HowItWorks } from '../../components/home/HowItWorks';
import { Testimonials } from '../../components/home/Testimonials';
import { AboutSection } from '../../components/home/AboutSection';
import { DeliveryBanner } from '../../components/home/DeliveryBanner';

export const Home = () => {
  return (
    <div className="bg-cream min-h-screen flex flex-col">
      <HeroBanner />
      <FeaturedProducts />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <AboutSection />
      <DeliveryBanner />
    </div>
  );
};
