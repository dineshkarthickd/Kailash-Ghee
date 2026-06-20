import { HeroBanner } from '../../components/home/HeroBanner';
import { TrustBadges } from '../../components/home/TrustBadges';
import { FeaturedProducts } from '../../components/home/FeaturedProducts';
import { WhyChooseUs } from '../../components/home/WhyChooseUs';
import { HowItWorks } from '../../components/home/HowItWorks';
import { Testimonials } from '../../components/home/Testimonials';
import { AboutSection } from '../../components/home/AboutSection';
import { DeliveryBanner } from '../../components/home/DeliveryBanner';

export const Home = () => {
  return (
    <div className="">
      <HeroBanner />
      <TrustBadges />
      <FeaturedProducts />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <AboutSection />
      <DeliveryBanner />
    </div>
  );
};
