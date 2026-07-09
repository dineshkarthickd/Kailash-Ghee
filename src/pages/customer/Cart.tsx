// @ts-nocheck
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useProducts } from '../../hooks/useProducts';
import { FiTrash2, FiShoppingBag, FiMinus, FiPlus, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { ProductCard } from '../../components/products/ProductCard';
import { BotanicalDecoration } from '../../components/common/BotanicalDecoration';

export const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { products } = useProducts();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    const featuredProducts = products.slice(0, 3);
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center pt-8 pb-20 px-6 bg-transparent relative overflow-hidden">
        <BotanicalDecoration position="left" className="scale-125 -translate-y-10" />
        <BotanicalDecoration position="right" className="scale-125 translate-y-10" />
        
        <div className="flex flex-col items-center text-center max-w-md mx-auto z-10">
          <div className="w-20 h-20 rounded-full border-[1px] border-primary/20 flex items-center justify-center mb-8">
            <FiShoppingBag className="w-8 h-8 text-primary/60 stroke-[1.5]" />
          </div>
          <h2 className="font-heading text-3xl text-primary font-normal mb-4">{t('cart.empty', 'Your Cart is Empty')}</h2>
          <p className="font-sans text-primary/60 mb-8">{t('cart.empty_desc', "Looks like you haven't added any pure ghee to your cart yet.")}</p>
          <Link 
            to="/products" 
            className="border-[1px] border-primary/30 text-primary py-3 px-8 uppercase tracking-widest text-[13px] hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2"
          >
            {t('cart.continue_shopping', 'Continue Shopping')}
            <FiArrowRight />
          </Link>
        </div>

        {/* You Might Also Like */}
        {featuredProducts.length > 0 && (
          <div className="w-full max-w-7xl mx-auto mt-32 relative z-10">
            <h3 className="font-heading text-2xl text-center text-primary mb-12">{t('cart.you_might_like', 'You Might Also Like')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-transparent pt-32 pb-24 relative overflow-hidden">
      <BotanicalDecoration position="top-right" className="scale-125 -translate-y-24 opacity-5" />
      <BotanicalDecoration position="bottom-left" className="scale-150 translate-y-32 opacity-5" />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        
        <div className="flex items-center gap-4 mb-12">
          <Link to="/products" className="text-primary/60 hover:text-primary transition-colors">
            <FiArrowLeft className="w-6 h-6 stroke-[1.5]" />
          </Link>
          <h1 className="font-heading text-4xl text-primary font-normal">{t('cart.title', 'Shopping Cart')}</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b-[1px] border-primary/20 text-sm font-sans tracking-widest uppercase text-primary/60">
              <div className="col-span-6">{t('cart.product', 'Product')}</div>
              <div className="col-span-3 text-center">{t('cart.quantity', 'Quantity')}</div>
              <div className="col-span-3 text-right">{t('cart.total', 'Total')}</div>
            </div>

            {cartItems.map((item) => {
              const name = i18n.language === 'ta' && item.nameTA ? item.nameTA : item.name;
              return (
                <div key={`${item.productId}-${item.variant.size}`} className="grid grid-cols-1 md:grid-cols-12 gap-6 py-6 border-b-[1px] border-primary/10 items-center">
                  
                  <div className="col-span-1 md:col-span-6 flex gap-6 items-center">
                    <img src={item.imageURL || 'https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?q=80&w=800&auto=format&fit=crop'} alt={name} loading="lazy" className="w-24 h-24 object-cover border-[1px] border-primary/10" />
                    <div className="flex flex-col">
                      <h3 className="font-heading text-xl text-primary mb-1">{name}</h3>
                      <p className="font-sans italic text-primary/60 text-sm mb-2">{item.variant.size}</p>
                      <p className="font-sans text-primary">₹{item.price}</p>
                    </div>
                  </div>
                  
                  <div className="col-span-1 md:col-span-3 flex justify-start md:justify-center items-center">
                    <div className="flex items-center border-[1px] border-primary/20">
                      <button 
                        onClick={() => updateQuantity(item.productId, item.variant.size, item.qty - 1)}
                        className="w-10 h-10 flex items-center justify-center text-primary hover:bg-primary/5 transition-colors"
                      ><FiMinus className="w-4 h-4" /></button>
                      <span className="w-10 text-center font-sans text-primary">{item.qty}</span>
                      <button 
                        onClick={() => updateQuantity(item.productId, item.variant.size, item.qty + 1)}
                        className="w-10 h-10 flex items-center justify-center text-primary hover:bg-primary/5 transition-colors"
                      ><FiPlus className="w-4 h-4" /></button>
                    </div>
                  </div>
                  
                  <div className="col-span-1 md:col-span-3 flex justify-between md:justify-end items-center">
                    <span className="font-sans text-lg text-primary md:hidden">{t('cart.total', 'Total')}: </span>
                    <div className="flex items-center gap-6">
                      <span className="font-sans text-lg text-primary font-medium">₹{item.price * item.qty}</span>
                      <button 
                        onClick={() => removeFromCart(item.productId, item.variant.size)}
                        className="text-primary/40 hover:text-red-500 transition-colors"
                        title="Remove item"
                      >
                        <FiTrash2 className="w-5 h-5 stroke-[1.5]" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border-[1px] border-primary/20 p-8 sticky top-32">
              <h3 className="font-heading text-2xl text-primary mb-8 border-b-[1px] border-primary/10 pb-4">{t('cart.order_summary', 'Order Summary')}</h3>
              
              <div className="flex flex-col gap-4 font-sans mb-8">
                <div className="flex justify-between text-primary/80">
                  <span>{t('cart.subtotal', 'Subtotal')}</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-primary/80">
                  <span>{t('cart.shipping', 'Shipping')}</span>
                  <span>{t('cart.shipping_calc', 'Calculated at checkout')}</span>
                </div>
                <div className="flex justify-between text-primary text-xl mt-4 pt-4 border-t-[1px] border-primary/10">
                  <span>{t('cart.total', 'Total')}</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-primary text-white py-4 uppercase tracking-widest text-[13px] hover:bg-primary/90 transition-colors"
              >
                {t('cart.proceed_checkout', 'Proceed to Checkout')}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
