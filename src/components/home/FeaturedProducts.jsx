import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from '../products/ProductCard';
import { Reveal } from '../common/Reveal';

export const FeaturedProducts = () => {
  const { products, loading } = useProducts();
  const featured = products.slice(0, 4);

  return (
    <section className="bg-[#FFF8E7] py-8 md:py-12">
      <div className="max-w-6xl mx-auto w-full px-4">
        
        <Reveal>
          <div className="text-center mb-6">
            <h2 className="font-heading font-extrabold text-xl md:text-2xl lg:text-3xl text-darkbrown mb-2">Our Premium Products</h2>
            <p className="font-heading italic text-saffron text-xs md:text-sm font-semibold tracking-wide">Pure &bull; Natural &bull; Traditional</p>
          </div>
        </Reveal>

        {loading ? (
          <div className="flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div></div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 mb-6 md:mb-8">
            {featured.map((product, index) => (
              <Reveal key={product.id} delay={index * 100}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        )}

        <Reveal delay={200}>
          <div className="text-center">
            <Link 
              to="/products"
              className="inline-flex items-center justify-center px-4 py-2 text-xs md:px-6 md:py-2.5 md:text-sm border-2 border-gold font-bold rounded-full text-white bg-gradient-to-r from-saffron to-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:-translate-y-1"
            >
              View All Products
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
