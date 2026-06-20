import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { createOrder } from '../../firebase/orders';
import { getSettings } from '../../firebase/settings';
import { sendAdminNotification } from '../../services/notification';
import { generateOrderId } from '../../utils/generateOrderId';
import { validateAddressForm } from '../../utils/validateForm';
import { FiTruck, FiArrowLeft, FiLock } from 'react-icons/fi';
import toast from 'react-hot-toast';

export const Checkout = () => {
  const { user, loginWithGoogle } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '', phone: '', address: '', city: '', state: '', pincode: ''
  });
  const [errors, setErrors] = useState({});
  const [paymentMethod] = useState('COD');
  const [settings, setSettings] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getSettings();
      setSettings(data);
    };
    fetchSettings();
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 bg-transparent">
        <h2 className="font-heading text-3xl text-primary font-normal mb-4">{t('cart.empty', 'Your cart is empty')}</h2>
        <Link to="/products" className="border-[1px] border-primary/30 text-primary py-3 px-8 uppercase tracking-widest text-[13px] hover:bg-primary hover:text-white transition-all duration-300">{t('cart.continue_shopping', 'Continue Shopping')}</Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 bg-transparent">
        <div className="flex flex-col items-center text-center max-w-md mx-auto p-12 border-[1px] border-primary/20 bg-white/10 backdrop-blur-md">
          <FiLock className="w-8 h-8 text-primary/60 mb-6" />
          <h2 className="font-heading text-3xl text-primary font-normal mb-4">{t('checkout.sign_in', 'Sign in to Continue')}</h2>
          <p className="font-sans text-primary/70 mb-8">{t('checkout.sign_in_desc', 'Please log in to complete your purchase securely.')}</p>
          <button 
            onClick={loginWithGoogle}
            className="flex items-center gap-3 bg-white text-gray-800 border-[1px] border-gray-200 px-6 py-3 shadow-sm hover:shadow-md transition-all font-sans"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            {t('checkout.sign_in_google', 'Sign in with Google')}
          </button>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    const validationErrors = validateAddressForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    setIsSubmitting(true);
    try {
      const orderId = generateOrderId();
      const orderData = {
        orderId,
        customer: { ...formData, email: user.email },
        items: cartItems,
        totalAmount: cartTotal,
        paymentMethod: 'COD',
        transactionId: null,
        paymentStatus: 'pending',
        orderStatus: 'pending',
        userId: user.uid,
        customerEmail: user.email
      };

      await createOrder(orderData);
      
      await sendAdminNotification({
        orderId: orderData.orderId,
        customerName: formData.name,
        customerPhone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        items: cartItems,
        totalAmount: cartTotal
      });
      
      clearCart();
      navigate(`/order-confirmation/${orderId}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const inputClasses = "w-full bg-transparent border-0 border-b-[1px] border-primary/20 focus:border-primary focus:ring-0 px-0 py-3 font-sans text-primary placeholder-primary/40 transition-colors rounded-none";

  return (
    <div className="w-full min-h-screen pb-20 px-6 lg:px-16 bg-transparent">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-center gap-4 mb-12">
          <Link to="/cart" className="text-primary/60 hover:text-primary transition-colors">
            <FiArrowLeft className="w-6 h-6 stroke-[1.5]" />
          </Link>
          <h1 className="font-heading text-4xl text-primary font-normal">{t('checkout.title', 'Checkout')}</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Form */}
          <div className="lg:col-span-7 flex flex-col gap-12">
            
            <div>
              <h2 className="font-heading text-2xl text-primary mb-8 pb-4 border-b-[1px] border-primary/10">{t('checkout.delivery_address', 'Delivery Address')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="md:col-span-2">
                  <input type="text" name="name" placeholder={t('checkout.full_name', 'Full Name')} value={formData.name} onChange={handleChange} className={inputClasses} />
                  {errors.name && <p className="text-red-500 text-sm mt-1 font-sans">{errors.name}</p>}
                </div>
                <div className="md:col-span-2">
                  <input type="text" name="phone" placeholder={t('checkout.phone', 'Phone Number (10 digits)')} value={formData.phone} onChange={handleChange} className={inputClasses} />
                  {errors.phone && <p className="text-red-500 text-sm mt-1 font-sans">{errors.phone}</p>}
                </div>
                <div className="md:col-span-2">
                  <textarea name="address" rows="2" placeholder={t('checkout.address', 'Complete Address (House No, Street, Landmark)')} value={formData.address} onChange={handleChange} className={`${inputClasses} resize-none`}></textarea>
                  {errors.address && <p className="text-red-500 text-sm mt-1 font-sans">{errors.address}</p>}
                </div>
                <div>
                  <input type="text" name="city" placeholder={t('checkout.city', 'City')} value={formData.city} onChange={handleChange} className={inputClasses} />
                  {errors.city && <p className="text-red-500 text-sm mt-1 font-sans">{errors.city}</p>}
                </div>
                <div>
                  <input type="text" name="state" placeholder={t('checkout.state', 'State')} value={formData.state} onChange={handleChange} className={inputClasses} />
                  {errors.state && <p className="text-red-500 text-sm mt-1 font-sans">{errors.state}</p>}
                </div>
                <div className="md:col-span-2">
                  <input type="text" name="pincode" placeholder={t('checkout.pincode', 'Pincode (6 digits)')} value={formData.pincode} onChange={handleChange} className={inputClasses} />
                  {errors.pincode && <p className="text-red-500 text-sm mt-1 font-sans">{errors.pincode}</p>}
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-primary mb-8 pb-4 border-b-[1px] border-primary/10">{t('checkout.payment_method', 'Payment Method')}</h2>
              <div className="border-[1px] border-primary flex items-center gap-4 p-6 bg-primary/5">
                <FiTruck className="w-6 h-6 text-primary stroke-[1.5]" />
                <div>
                  <h3 className="font-sans font-medium text-primary tracking-wide uppercase text-sm mb-1">{t('checkout.cod', 'Cash on Delivery')}</h3>
                  <p className="font-sans text-sm text-primary/70">{t('checkout.cod_desc', 'Pay when your order arrives at your doorstep')}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Summary */}
          <div className="lg:col-span-5">
            <div className="border-[1px] border-primary/20 p-8 sticky top-32 bg-white/10 backdrop-blur-md">
              <h3 className="font-heading text-2xl text-primary mb-8 border-b-[1px] border-primary/10 pb-4">{t('checkout.order_summary', 'Order Summary')}</h3>
              
              <div className="flex flex-col gap-6 mb-8 border-b-[1px] border-primary/10 pb-8">
                {cartItems.map((item, idx) => {
                  const itemName = i18n.language === 'ta' && item.nameTA ? item.nameTA : item.name;
                  return (
                    <div key={idx} className="flex gap-4 items-center">
                      <img src={item.imageURL} alt={itemName} className="w-16 h-16 object-cover border-[1px] border-primary/10" />
                      <div className="flex-grow">
                        <p className="font-heading text-lg text-primary">{itemName}</p>
                        <p className="font-sans text-sm text-primary/60 italic">{item.variant.size} • {t('checkout.qty', 'Qty')}: {item.qty}</p>
                      </div>
                      <span className="font-sans text-primary font-medium">₹{item.price * item.qty}</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex flex-col gap-4 font-sans mb-8">
                <div className="flex justify-between text-primary/80">
                  <span>{t('cart.subtotal', 'Subtotal')}</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-primary/80">
                  <span>{t('cart.shipping', 'Shipping')}</span>
                  <span>{t('checkout.free', 'Free')}</span>
                </div>
                <div className="flex justify-between text-primary text-xl mt-4 pt-4 border-t-[1px] border-primary/10">
                  <span>{t('cart.total', 'Total')}</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-4 uppercase tracking-widest text-[13px] hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : t('checkout.place_order', 'Place Order')}
              </button>
              
              <p className="font-sans text-xs text-primary/50 text-center mt-6">
                {t('checkout.privacy_note', 'Your personal data will be used to process your order and support your experience throughout this website.')}
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
