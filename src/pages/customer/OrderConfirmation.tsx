// @ts-nocheck
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getOrder } from '../../firebase/orders';
import { generateInvoicePDF } from '../../services/invoice';
import { Loader } from '../../components/common/Loader';
import { BotanicalDecoration } from '../../components/common/BotanicalDecoration';
import { FiCheckCircle, FiDownload, FiShoppingBag, FiMapPin, FiPhone, FiTruck } from 'react-icons/fi';

export const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { i18n } = useTranslation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrder(orderId);
        setOrder(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) return <Loader />;
  if (!order) return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <p className="font-heading text-2xl text-primary/60">Order not found.</p>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-transparent pb-24 relative overflow-hidden">
      <BotanicalDecoration position="top-right" className="scale-125 -translate-y-24 opacity-10" />
      <BotanicalDecoration position="bottom-left" className="scale-150 translate-y-32 opacity-10" />

      <div className="w-full max-w-3xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Success Header */}
        <div className="flex flex-col items-center text-center mb-12 pt-8">
          {/* Animated checkmark circle */}
          <div className="relative mb-8">
            <div className="w-24 h-24 rounded-full bg-accent-gold/10 border-[1.5px] border-accent-gold/30 flex items-center justify-center animate-[pulse_3s_ease-in-out_infinite]">
              <div className="w-16 h-16 rounded-full bg-accent-gold/20 flex items-center justify-center">
                <FiCheckCircle className="w-9 h-9 text-accent-gold stroke-[1.5]" />
              </div>
            </div>
          </div>

          <span className="font-sans text-[11px] tracking-[0.35em] uppercase text-accent-gold/80 mb-3">
            Order Confirmed
          </span>
          <h1 className="font-heading text-4xl lg:text-5xl text-primary font-normal mb-4">
            Thank You!
          </h1>
          <div className="w-12 h-[1px] bg-accent-gold/40 mb-5" />
          <p className="font-sans text-[15px] text-primary/70 max-w-sm leading-relaxed">
            Your order has been placed successfully. Please keep cash ready at the time of delivery.
          </p>
          
          {/* Order ID badge */}
          <div className="mt-6 inline-flex items-center gap-3 border-[1px] border-primary/15 px-5 py-2.5 bg-primary/5">
            <span className="font-sans text-[11px] tracking-widest uppercase text-primary/50">Order ID</span>
            <span className="font-sans text-[13px] font-medium text-primary tracking-widest">{order.orderId}</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="border-[1px] border-primary/15 bg-white/30 backdrop-blur-sm divide-y divide-primary/10">

          {/* Order Items */}
          <div className="p-8">
            <h2 className="font-sans text-[11px] tracking-[0.3em] uppercase text-primary/50 mb-6 flex items-center gap-2">
              <FiShoppingBag className="w-4 h-4" /> Order Details
            </h2>
            <div className="flex flex-col gap-4">
              {order.items.map((item, idx) => {
                const itemName = i18n.language === 'ta' && item.nameTA ? item.nameTA : item.name;
                return (
                  <div key={idx} className="flex items-center gap-5">
                    {item.imageURL && (
                      <div className="w-16 h-16 flex-shrink-0 bg-accent-peach/20 overflow-hidden">
                        <img src={item.imageURL} alt={itemName} className="w-full h-full object-cover mix-blend-multiply" />
                      </div>
                    )}
                    <div className="flex-grow">
                      <p className="font-heading text-lg text-primary">{itemName}</p>
                      <p className="font-sans text-sm text-primary/50 italic">{item.variant?.size} &bull; Qty: {item.qty}</p>
                    </div>
                    <span className="font-sans text-primary font-medium">₹{item.price * item.qty}</span>
                  </div>
                );
              })}
            </div>

            {/* Totals */}
            <div className="mt-8 pt-6 border-t-[1px] border-primary/10 flex flex-col gap-2 font-sans">
              <div className="flex justify-between text-primary/60 text-sm">
                <span>Subtotal</span>
                <span>₹{order.totalAmount}</span>
              </div>
              <div className="flex justify-between text-primary/60 text-sm">
                <span>Shipping</span>
                <span className="text-green-700 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-primary text-lg font-medium mt-2 pt-3 border-t-[1px] border-primary/10">
                <span>Total</span>
                <span>₹{order.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-8">
            <h2 className="font-sans text-[11px] tracking-[0.3em] uppercase text-primary/50 mb-4 flex items-center gap-2">
              <FiTruck className="w-4 h-4" /> Payment & Delivery
            </h2>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent-gold" />
              <span className="font-sans text-[14px] text-primary">
                {order.paymentMethod === 'COD' ? 'Cash on Delivery' : order.paymentMethod}
              </span>
            </div>
          </div>

          {/* Delivery Address */}
          {order.customer && (
            <div className="p-8">
              <h2 className="font-sans text-[11px] tracking-[0.3em] uppercase text-primary/50 mb-4 flex items-center gap-2">
                <FiMapPin className="w-4 h-4" /> Delivering To
              </h2>
              <div className="font-sans text-[14px] text-primary/80 leading-relaxed">
                <p className="font-medium text-primary text-[16px] mb-1">{order.customer.name}</p>
                <p className="flex items-center gap-2 text-primary/60 mb-1">
                  <FiPhone className="w-3.5 h-3.5" /> {order.customer.phone}
                </p>
                <p className="text-primary/70">
                  {order.customer.address}, {order.customer.city}, {order.customer.state} – {order.customer.pincode}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={() => generateInvoicePDF({
              orderId: order.orderId || order.id,
              customerName: order.customer?.name,
              customerPhone: order.customer?.phone,
              address: order.customer?.address,
              city: order.customer?.city,
              state: order.customer?.state,
              pincode: order.customer?.pincode,
              items: order.items,
              totalAmount: order.totalAmount,
              orderStatus: order.orderStatus,
              customer: order.customer
            })}
            className="flex-1 flex items-center justify-center gap-2 border-[1.5px] border-primary/30 text-primary py-4 uppercase tracking-widest text-[12px] hover:bg-primary hover:text-white transition-all duration-300"
          >
            <FiDownload className="w-4 h-4" /> Download Invoice
          </button>
          <Link
            to="/"
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-4 uppercase tracking-widest text-[12px] hover:bg-primary/90 transition-all duration-300"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Reassurance note */}
        <p className="text-center font-sans text-[12px] text-primary/40 mt-8 tracking-wide">
          A confirmation message has been sent. For support: <a href="tel:+919360282155" className="underline hover:text-primary/70">+91 9360282155</a>
        </p>

      </div>
    </div>
  );
};
