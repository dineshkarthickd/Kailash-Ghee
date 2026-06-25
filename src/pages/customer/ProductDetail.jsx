import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getProduct } from '../../firebase/products';
import { useCart } from '../../hooks/useCart';
import { Loader } from '../../components/common/Loader';
import { FiShare2, FiMinus, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        if (data) {
          setProduct(data);
          if (data.variants && data.variants.length > 0) {
            setSelectedVariant(data.variants[0]);
          }
        }
      } catch (error) {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="">
      <div className=""></div>
    </div>
  );
  
  if (!product) return <div className="">Product not found</div>;

  const name = i18n.language === 'ta' && product.nameTA ? product.nameTA : product.name;
  const description = i18n.language === 'ta' && product.descriptionTA ? product.descriptionTA : product.description;

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addToCart(product, selectedVariant, qty);
    toast.success(`${name} added to cart!`);
  };

  const handleShare = async () => {
    const shareData = {
      title: name,
      text: 'Check out this pure ghee from Kailash Ghee!',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-background pt-8 lg:pt-12 pb-24">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Image Box */}
          <div className="relative w-full aspect-[4/5] lg:aspect-square rounded-[2rem] overflow-hidden shadow-2xl flex items-center justify-center">
            
            {product.isOffer && (
              <div className="absolute top-6 right-6 z-20">
                <span className="bg-accent-gold text-white font-sans text-[11px] tracking-widest uppercase px-4 py-2 shadow-lg">
                  {product.offerType === 'combo' ? 'Combo Offer' : 'Special Offer'}
                </span>
              </div>
            )}

            <img 
              src={product.imageURL || 'https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?q=80&w=800&auto=format&fit=crop'} 
              alt={name} 
              loading="lazy"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?q=80&w=800&auto=format&fit=crop'; }}
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>

          {/* Right: Details Box */}
          <div className="flex flex-col">
            
            <p className="font-sans text-[12px] text-primary/50 tracking-[0.3em] uppercase mb-3">
              {i18n.language === 'ta' && product.categoryTA ? product.categoryTA : (product.category || 'Premium Collection')}
            </p>
            
            <h1 className="font-heading text-4xl lg:text-5xl text-primary font-normal leading-tight mb-4">
              {name}
            </h1>
            
            <div className="flex items-center gap-4 mb-2">
              {product.isOffer && selectedVariant?.originalPrice && (
                <p className="font-sans text-xl text-primary/40 line-through">
                  ₹{selectedVariant.originalPrice}
                </p>
              )}
              <p className="font-sans text-3xl text-primary font-medium">
                ₹{selectedVariant?.price}
              </p>
            </div>
            
            {product.isOffer && selectedVariant?.originalPrice && selectedVariant.price < selectedVariant.originalPrice ? (
              <div className="mb-8">
                <span className="inline-block bg-[#E8F3E8] text-[#2C5E2E] border-[1px] border-[#C3E2C4] font-sans text-xs tracking-wider uppercase px-3 py-1.5 rounded-sm">
                  You Save ₹{selectedVariant.originalPrice - selectedVariant.price} ({Math.round(((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100)}%)
                </span>
              </div>
            ) : (
              <div className="mb-8"></div>
            )}
            
            <div className="w-16 h-[1px] bg-accent-gold mb-8"></div>
            
            <div className="mb-10">
              <p className="font-sans text-[15px] lg:text-[16px] text-primary/80 leading-relaxed">
                {description || "Experience the pure, luxurious taste of traditional grass-fed ghee, sustainably sourced for radiant health."}
              </p>
            </div>

            {/* Variants Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-8">
                <h3 className="font-sans text-[11px] text-primary/60 tracking-[0.2em] uppercase mb-4">{t('product.select_size', 'Select Size')}</h3>
                <div className="flex flex-wrap gap-4">
                  {product.variants.map((v, idx) => {
                    const isSelected = selectedVariant?.id === v.id;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-6 py-3 rounded-full border-[1.5px] font-sans text-[13px] tracking-widest transition-all duration-300 ${
                          isSelected 
                            ? 'border-primary bg-primary text-white shadow-md' 
                            : 'border-primary/20 text-primary hover:border-primary/50'
                        }`}
                      >
                        {v.size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity and Actions Container */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              
              {/* Quantity Selector */}
              <div className="flex items-center justify-between border-[1.5px] border-primary/20 rounded-full px-6 py-4 sm:w-40 bg-white/50 backdrop-blur-sm">
                <button 
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="text-primary hover:text-accent-gold transition-colors p-1"
                >
                  <FiMinus className="w-4 h-4" />
                </button>
                <span className="font-sans text-[16px] font-medium text-primary w-8 text-center">{qty}</span>
                <button 
                  onClick={() => setQty(qty + 1)}
                  className="text-primary hover:text-accent-gold transition-colors p-1"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-grow flex items-center justify-center py-4 rounded-full font-sans text-[13px] tracking-[0.2em] uppercase transition-all duration-300 ${
                  product.inStock 
                    ? 'bg-primary text-background hover:bg-primary/90 hover:shadow-lg' 
                    : 'bg-primary/10 text-primary/40 cursor-not-allowed'
                }`}
              >
                {product.inStock ? t('common.add_to_cart', 'Add to Cart') : t('common.out_of_stock', 'Out of Stock')}
              </button>
              
              {/* Share Button */}
              <button
                onClick={handleShare}
                className="flex items-center justify-center p-4 border-[1.5px] border-primary/20 rounded-full text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300"
                aria-label="Share product"
                title="Share this product"
              >
                <FiShare2 className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
