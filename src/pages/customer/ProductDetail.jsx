import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getProduct } from '../../firebase/products';
import { useCart } from '../../hooks/useCart';
import { Loader } from '../../components/common/Loader';
import { FiShare2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { i18n } = useTranslation();
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

  if (loading) return <Loader />;
  if (!product) return <div className="text-center py-20 text-darkbrown">Product not found</div>;

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
      text: 'Check out this ghee from Kailash Ghee!',
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 lg:py-14">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        <div className="w-full md:w-1/2">
          <div className="aspect-square rounded-2xl overflow-hidden bg-cream border border-gold border-opacity-30 shadow-md">
            <img 
              src={product.imageURL || 'https://via.placeholder.com/600x600?text=Ghee'} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-darkbrown mb-3">{name}</h1>
          <p className="text-lg text-saffron font-bold mb-4">₹{selectedVariant?.price}</p>
          
          <div className="mb-4">
            <p className="text-darkbrown opacity-80 text-xs md:text-sm leading-relaxed whitespace-pre-line">{description}</p>
          </div>

          <div className="mb-4 md:mb-6">
            <h3 className="text-xs md:text-sm font-semibold text-darkbrown mb-2 uppercase tracking-wider">Select Size</h3>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {product.variants.map((v, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedVariant(v)}
                  className={`px-4 py-2 text-xs md:text-sm rounded-lg border-2 font-medium transition-all ${
                    selectedVariant?.size === v.size 
                      ? 'border-saffron bg-saffron bg-opacity-10 text-saffron' 
                      : 'border-cream bg-white text-darkbrown hover:border-gold'
                  }`}
                >
                  {v.size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 flex items-center gap-4">
            <h3 className="text-xs md:text-sm font-semibold text-darkbrown uppercase tracking-wider">Quantity</h3>
            <div className="flex items-center border border-cream rounded-lg bg-white overflow-hidden text-sm">
              <button 
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-8 h-8 flex items-center justify-center text-darkbrown hover:bg-cream"
              >-</button>
              <span className="w-8 text-center font-medium">{qty}</span>
              <button 
                onClick={() => setQty(qty + 1)}
                className="w-8 h-8 flex items-center justify-center text-darkbrown hover:bg-cream"
              >+</button>
            </div>
          </div>

          <div className="flex gap-3 mt-auto">
            <button 
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`flex-1 px-4 py-2 text-sm md:px-6 md:py-2.5 rounded-xl font-bold transition-transform ${
                product.inStock 
                  ? 'bg-gradient-to-r from-saffron to-gold text-white shadow-md hover:shadow-lg' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button
              onClick={handleShare}
              className="w-10 h-10 md:w-11 md:h-11 rounded-xl border-2 border-gold flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-colors shadow-sm"
              aria-label="Share product"
            >
              <FiShare2 className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
