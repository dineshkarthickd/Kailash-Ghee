import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { FiTrash2 } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

export const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center">
        <h2 className="text-xl font-heading font-bold text-darkbrown mb-4">Your Cart is Empty</h2>
        <Link to="/products" className="inline-block bg-saffron text-white px-6 py-2 text-sm md:px-8 md:py-3 rounded-md font-medium hover:bg-gold transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between pb-20 max-w-6xl mx-auto px-4 py-4 w-full">
      <div className="w-full">
        <h1 className="text-lg font-heading font-bold text-darkbrown mb-4">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <div className="flex-1 px-4 pt-4 space-y-3">
          {cartItems.map((item) => {
            const name = i18n.language === 'ta' && item.nameTA ? item.nameTA : item.name;
            return (
              <div key={`${item.productId}-${item.variant.size}`} className="bg-white rounded-xl p-3 shadow-sm border border-amber-100 flex flex-row items-center gap-3">
                <img src={item.imageURL || 'https://via.placeholder.com/150'} alt={name} className="w-14 h-14 md:w-16 md:h-16 rounded-lg object-cover" />
                
                <div className="flex-1">
                  <h3 className="text-xs md:text-sm font-semibold text-darkbrown">{name}</h3>
                  <p className="text-xs md:text-sm text-gray-500">Size: {item.variant.size}</p>
                  <p className="text-xs md:text-sm font-bold text-saffron mt-1">₹{item.price}</p>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <button 
                      onClick={() => updateQuantity(item.productId, item.variant.size, item.qty - 1)}
                      className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-100 text-darkbrown"
                    >-</button>
                    <span className="text-sm w-6 text-center font-medium">{item.qty}</span>
                    <button 
                      onClick={() => updateQuantity(item.productId, item.variant.size, item.qty + 1)}
                      className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-100 text-darkbrown"
                    >+</button>
                    
                    <button 
                      onClick={() => removeFromCart(item.productId, item.variant.size)}
                      className="ml-auto text-red-400 w-4 h-4 hover:text-red-600 flex items-center justify-center"
                      title="Remove item"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          </div>

          <div className="hidden lg:block w-full lg:w-72 bg-white p-5 rounded-xl shadow-sm border border-cream h-fit sticky top-24">
          <h3 className="font-heading font-bold text-lg mb-4 text-darkbrown">Order Summary</h3>
          <div className="flex justify-between mb-3 text-sm text-darkbrown">
            <span>Subtotal</span>
            <span className="font-bold">₹{cartTotal}</span>
          </div>
          <div className="flex justify-between mb-4 text-sm text-darkbrown">
            <span>Shipping</span>
            <span className="text-xs opacity-80">Calculated at checkout</span>
          </div>
          <div className="border-t border-cream pt-3 mb-5 flex justify-between items-center">
            <span className="font-bold text-base text-darkbrown">Total</span>
            <span className="font-bold text-xl text-saffron">₹{cartTotal}</span>
          </div>
          <button 
            onClick={() => navigate('/checkout')}
            className="w-full bg-gradient-to-r from-saffron to-gold text-white py-2 md:py-2.5 text-sm md:text-base rounded-lg font-bold hover:shadow-lg transition-all"
          >
            Proceed to Checkout
          </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-amber-200 px-4 py-3 flex items-center justify-between shadow-lg lg:hidden">
        <div>
          <p className="text-xs text-gray-500 uppercase mb-0">Total</p>
          <p className="text-lg font-bold text-darkbrown leading-tight">₹{cartTotal}</p>
        </div>
        <button 
          onClick={() => navigate('/checkout')}
          className="bg-gradient-to-r from-saffron to-gold text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-md active:scale-95 transition-transform"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
