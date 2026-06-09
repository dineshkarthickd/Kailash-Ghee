import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { createOrder } from '../../firebase/orders';
import { getSettings } from '../../firebase/settings';
import { sendAdminNotification } from '../../services/notification';
import { generateOrderId } from '../../utils/generateOrderId';
import { validateAddressForm } from '../../utils/validateForm';
import { Loader } from '../../components/common/Loader';
import toast from 'react-hot-toast';

export const Checkout = () => {
  const { user, loginWithGoogle } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
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
    return <div className="p-8 md:p-12 text-center text-darkbrown font-bold text-lg">Your cart is empty.</div>;
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-12 md:my-20 p-6 bg-white rounded-2xl shadow-lg border border-cream text-center">
        <h2 className="text-xl md:text-2xl font-heading font-bold text-darkbrown mb-4">Sign in to Continue</h2>
        <p className="text-sm text-darkbrown opacity-80 mb-6">Please log in to complete your purchase securely.</p>
        <button 
          onClick={loginWithGoogle}
          className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 font-bold py-2.5 px-4 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all min-h-[44px] text-sm"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>
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

  return (
    <div className="max-w-6xl mx-auto w-full px-4 py-4 md:px-8 md:py-8 flex flex-col lg:flex-row gap-4 md:gap-6">
      <div className="flex-1 space-y-4 md:space-y-6">
        
        <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-cream">
          <h2 className="text-sm md:text-base font-heading font-bold text-darkbrown mb-4 md:mb-6">Delivery Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="col-span-1 md:col-span-2">
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full h-10 md:h-11 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div className="col-span-1 md:col-span-2">
              <input type="text" name="phone" placeholder="Phone Number (10 digits)" value={formData.phone} onChange={handleChange} className="w-full h-10 md:h-11 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron" />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div className="col-span-1 md:col-span-2">
              <textarea name="address" placeholder="Complete Address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron min-h-[80px]"></textarea>
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
            <div>
              <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full h-10 md:h-11 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron" />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
            <div>
              <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} className="w-full h-10 md:h-11 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron" />
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
            </div>
            <div>
              <input type="text" name="pincode" placeholder="Pincode (6 digits)" value={formData.pincode} onChange={handleChange} className="w-full h-10 md:h-11 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron" />
              {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-cream">
          <h2 className="text-sm md:text-base font-heading font-bold text-darkbrown mb-4 md:mb-6">Payment Method</h2>
          <div style={{
            backgroundColor: '#FFF8E7',
            border: '1px solid #D4AF37',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>🚚</span>
            <h3 style={{ fontWeight: 'bold', color: '#3B1F0A', marginBottom: '4px' }}>Cash on Delivery</h3>
            <p style={{ fontSize: '12px', color: '#3B1F0A', opacity: 0.8 }}>Pay when your order arrives at your doorstep</p>
          </div>
        </div>

      </div>

      <div className="w-full lg:w-80">
        <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-cream sticky top-24">
          <h2 className="text-sm md:text-base font-heading font-bold text-darkbrown mb-4 md:mb-6">Order Summary</h2>
          <div className="space-y-3 mb-4 max-h-60 overflow-y-auto hide-scrollbar">
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs md:text-sm text-darkbrown">
                <span className="flex-1 truncate pr-3">{item.qty}x {item.name} ({item.variant.size})</span>
                <span className="font-semibold">₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-cream pt-3 mb-4 md:mb-6">
            <div className="flex justify-between items-center text-base md:text-lg font-bold text-darkbrown">
              <span>Total to Pay</span>
              <span className="text-saffron">₹{cartTotal}</span>
            </div>
          </div>

          <button 
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center bg-gradient-to-r from-saffron to-gold text-white py-2.5 md:py-3 rounded-xl font-bold text-sm md:text-base hover:shadow-lg transition-all disabled:opacity-70 min-h-[44px]"
          >
            {isSubmitting ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div> : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};
