import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../hooks/useCart';
import toast from 'react-hot-toast';

export const ProductCard = ({ product }) => {
  const { t, i18n } = useTranslation();
  const { addToCart } = useCart();
  const name = i18n.language === 'ta' && product.nameTA ? product.nameTA : product.name;
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    if (product.variants && product.variants.length > 0) {
      addToCart(product, product.variants[0], 1);
      toast.success(`${name} added to cart!`);
    }
  };

  return (
    <div className="w-full max-w-[320px] mx-auto bg-transparent border-[1px] border-primary/20 flex flex-col group hover:border-primary/40 transition-colors duration-500">
      
      {/* Full Width Image Area */}
      <Link to={`/products/${product.id}`} className="relative block w-full aspect-square overflow-hidden bg-transparent border-b-[1px] border-primary/10">
        
        {product.isOffer && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-accent-gold text-white font-sans text-[10px] tracking-widest uppercase px-3 py-1.5 shadow-md">
              {product.offerType === 'combo' ? 'Combo Offer' : 'Special Offer'}
            </span>
          </div>
        )}

        <img 
          src={product.imageURL || 'https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?q=80&w=800&auto=format&fit=crop'} 
          alt={name} 
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?q=80&w=800&auto=format&fit=crop';
          }}
          className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      {/* Content Area */}
      <div className="p-8 flex flex-col items-center justify-center text-center bg-transparent">
        
        <Link to={`/products/${product.id}`} className="hover:opacity-70 transition-opacity mb-1">
          <h3 className="font-heading text-2xl text-primary font-normal leading-tight">
            {name}
          </h3>
        </Link>
        
        <span className="font-sans italic text-[14px] text-primary/60 mb-3">
          {product.variants?.[0]?.size || 'Jar'}
        </span>
        
        <div className="flex items-center justify-center gap-3 mb-6">
          {product.isOffer && product.variants?.[0]?.originalPrice && (
            <span className="font-sans text-[14px] text-primary/40 line-through">
              ₹{product.variants[0].originalPrice}
            </span>
          )}
          <span className="font-sans text-[16px] text-primary font-medium">
            ₹{product.variants?.[0]?.price || 0}
          </span>
        </div>

        <button 
          className="w-full border-[1px] border-primary/30 text-primary py-2.5 px-6 uppercase tracking-widest text-[12px] hover:bg-primary hover:text-white transition-all duration-300"
          onClick={handleAddToCart}
        >
          {t('common.add_to_cart', 'Add to Cart')}
        </button>

      </div>
    </div>
  );
};
