// @ts-nocheck
import { useState, useMemo } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useAutoTranslateProducts } from '../../hooks/useAutoTranslateProducts';
import { ProductCard } from '../../components/products/ProductCard';
import { useTranslation } from 'react-i18next';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { BotanicalDecoration } from '../../components/common/BotanicalDecoration';

export const Products = () => {
  const { t } = useTranslation();
  const { products, loading } = useProducts();
  useAutoTranslateProducts(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default'); // 'default', 'price-low', 'price-high'

  const filteredAndSortedProducts = useMemo(() => {
    let result = products;

    // Filter by search
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      result = result.filter(product => {
        const nameMatch = product.name?.toLowerCase().includes(searchLower);
        const nameTAMatch = product.nameTA?.includes(searchLower);
        return nameMatch || nameTAMatch;
      });
    }

    // Sort by price
    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0));
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => (b.variants[0]?.price || 0) - (a.variants[0]?.price || 0));
    }

    return result;
  }, [products, searchQuery, sortBy]);

  return (
    <div className="w-full min-h-screen bg-transparent pb-24 relative overflow-hidden">
      <BotanicalDecoration position="top-right" className="scale-125 -translate-y-24 opacity-5" />
      <BotanicalDecoration position="bottom-left" className="scale-150 translate-y-32 opacity-5" />
      
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        
        {/* Header & Description */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl lg:text-5xl text-primary font-normal mb-6">
            {t('common.products', 'Our Products')}
          </h1>
          <div className="w-16 h-[1px] bg-primary/20 mx-auto mb-6"></div>
          <p className="font-sans text-[15px] lg:text-[16px] text-primary/70 max-w-2xl mx-auto leading-relaxed">
            {t('products.description', 'Discover our range of pure, traditional ghee products. We ensure the highest quality by following age-old Bilona methods.')}
          </p>
        </div>

        {/* Toolbar: Search and Filter/Sort */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 border-b-[1px] border-primary/10 pb-6">
          
          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50 w-4 h-4 stroke-[2]" />
            <input
              type="text"
              placeholder={t('products.search', 'Search products...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-transparent border-[1px] border-primary/20 focus:border-primary/50 outline-none font-sans text-[13px] text-primary placeholder:text-primary/40 transition-colors duration-300"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/50 hover:text-primary transition-colors"
                title="Clear search"
              >
                <FiX className="w-4 h-4 stroke-[2]" />
              </button>
            )}
          </div>

          <div className="relative w-full md:w-auto flex items-center">
            <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50 w-4 h-4 stroke-[2] pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-auto pl-10 pr-10 py-3 bg-transparent border-[1px] border-primary/20 focus:border-primary/50 outline-none font-sans text-[12px] uppercase tracking-widest text-primary appearance-none cursor-pointer transition-colors duration-300"
              style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%233D4A3E' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
            >
              <option value="default">{t('products.sort_none', 'Sort by: None')}</option>
              <option value="price-low">{t('products.sort_low_high', 'Price: Low to High')}</option>
              <option value="price-high">{t('products.sort_high_low', 'Price: High to Low')}</option>
            </select>
          </div>

        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-primary/5 border-[1px] border-primary/10">
            <h3 className="font-heading text-2xl text-primary mb-3">{t('products.no_products', 'No products found')}</h3>
            <p className="font-sans text-[15px] text-primary/70 mb-6">{t('products.no_products_desc', 'Try adjusting your search terms or filters.')}</p>
            <button 
              onClick={() => { setSearchQuery(''); setSortBy('default'); }}
              className="px-8 py-3 border-[1px] border-primary text-primary font-sans text-[12px] tracking-widest uppercase hover:bg-primary hover:text-white transition-colors duration-300"
            >
              {t('products.clear_filters', 'Clear Filters')}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
