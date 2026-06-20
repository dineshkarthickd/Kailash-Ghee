import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProducts } from '../../hooks/useProducts';
import { useAutoTranslateProducts } from '../../hooks/useAutoTranslateProducts';
import { ProductCard } from '../products/ProductCard';
import { BotanicalDecoration } from '../common/BotanicalDecoration';

export const FeaturedProducts = () => {
  const { t } = useTranslation();
  const { products, loading } = useProducts();
  useAutoTranslateProducts(products);
  const featured = products.slice(0, 4);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <BotanicalDecoration position="top-right" className="scale-125 -translate-y-24" />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl lg:text-5xl text-primary font-normal">
            {t('headings.featured', 'Our Premium Products')}
          </h2>
          <div className="w-16 h-[1px] bg-accent-gold mx-auto mt-6"></div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <Link 
            to="/products"
            className="inline-block px-10 py-3.5 border-[1.5px] border-primary/40 hover:border-primary text-primary font-sans text-[13px] tracking-widest uppercase hover:bg-primary hover:text-background transition-all duration-300"
          >
            {t('headings.view_all', 'View All Products')}
          </Link>
        </div>

      </div>
    </section>
  );
};
