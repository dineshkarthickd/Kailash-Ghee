import { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from '../../components/products/ProductCard';
import { Loader } from '../../components/common/Loader';
import { Reveal } from '../../components/common/Reveal';
import { FiSearch } from 'react-icons/fi';

export const Products = () => {
  const { products, loading } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on search query (checks English and Tamil names)
  const filteredProducts = products.filter(product => {
    const searchLower = searchQuery.toLowerCase();
    const nameMatch = product.name?.toLowerCase().includes(searchLower);
    const nameTAMatch = product.nameTA?.includes(searchLower);
    return nameMatch || nameTAMatch;
  });

  return (
    <div className="bg-texture min-h-[calc(100vh-96px)] pb-10 md:pb-14">
      
      {/* Top Banner */}
      {!loading && products.length > 0 && (
        <div className="bg-cream py-3 border-b border-lightgold text-center animate-fadeInUp">
          <p className="font-heading font-bold text-darkbrown uppercase tracking-widest text-sm flex items-center justify-center gap-4">
            <span className="w-8 h-px bg-gold"></span>
            Our Premium Collection
            <span className="w-8 h-px bg-gold"></span>
          </p>
        </div>
      )}

      <div className="max-w-6xl mx-auto w-full px-4 py-6 md:py-10">
        <Reveal>
          <div className="text-center mb-6 md:mb-10">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-extrabold text-darkbrown mb-4 md:mb-8">Our Products</h1>
            <p className="text-darkbrown opacity-80 max-w-2xl mx-auto font-body text-xs md:text-sm leading-relaxed mb-6 md:mb-10">
              Discover our range of pure, traditional ghee products. We ensure the highest quality by following age-old Bilona methods.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative mb-6 md:mb-8">
              <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                <FiSearch className="h-4 w-4 text-gold" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2 text-sm border-2 border-gold rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
        </Reveal>

        {loading ? (
          <Loader />
        ) : products.length > 0 ? (
          <>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                {filteredProducts.map((product, index) => (
                  <Reveal key={product.id} delay={index * 100}>
                    <ProductCard product={product} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-lightgold shadow-sm">
                <p className="text-xl font-heading font-bold text-darkbrown">No products found</p>
                <p className="text-darkbrown opacity-70 mt-2">Try adjusting your search terms.</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-6 text-gold font-bold hover:underline"
                >
                  Clear Search
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <Reveal>
            <div className="bg-white p-12 md:p-20 rounded-3xl border border-lightgold shadow-lg text-center max-w-3xl mx-auto flex flex-col items-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gold rounded-full opacity-20 blur-xl animate-pulse"></div>
                <svg className="w-24 h-24 text-gold relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 6V4C7 2.89543 7.89543 2 9 2H15C16.1046 2 17 2.89543 17 4V6M5 6H19V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6Z" />
                  <path d="M9 10H15M9 14H15M9 18H12" />
                </svg>
              </div>
              <h2 className="text-3xl font-heading font-extrabold text-darkbrown mb-4">Our products are coming soon!</h2>
              <p className="text-darkbrown opacity-70 text-lg mb-8 max-w-md mx-auto">
                Check back shortly for our premium ghee collection. We are preparing the freshest batches just for you.
              </p>
              <button className="btn-primary py-4 px-10 text-lg shadow-xl animate-pop">
                Notify Me
              </button>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
};
