import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrder } from '../../firebase/orders';
import { generateInvoicePDF } from '../../services/invoice';
import { Loader } from '../../components/common/Loader';
import { FiCheckCircle, FiDownload } from 'react-icons/fi';

export const OrderConfirmation = () => {
  const { orderId } = useParams();
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
  if (!order) return <div className="text-center py-20 text-darkbrown">Order not found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-center">
      <FiCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
      <h1 className="text-xl md:text-2xl font-heading font-bold text-darkbrown mb-3">Order Confirmed!</h1>
      <p className="text-darkbrown opacity-80 mb-6 text-sm">
        Your order is confirmed! Please keep cash ready at the time of delivery.<br />
        Your order ID is <span className="font-bold text-saffron">{order.orderId}</span>
      </p>
      
      <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-cream mb-6 text-left max-w-lg mx-auto">
        <h2 className="font-bold text-base mb-3 text-darkbrown border-b border-cream pb-2">Order Details</h2>
        <div className="space-y-2 mb-3">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-xs md:text-sm text-darkbrown">
              <span>{item.qty}x {item.name} ({item.variant.size})</span>
              <span className="font-medium">₹{item.price * item.qty}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-bold text-base pt-2 border-t border-cream text-darkbrown">
          <span>Total</span>
          <span className="text-saffron">₹{order.totalAmount}</span>
        </div>
        <p className="text-xs md:text-sm text-darkbrown mt-3">Payment Method: <span className="font-bold">{order.paymentMethod}</span></p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
          className="flex items-center justify-center gap-2 bg-saffron text-white px-6 py-2 md:py-2.5 text-sm rounded-lg font-bold hover:bg-gold transition-colors min-h-[36px]"
        >
          <FiDownload className="w-4 h-4" /> Download Invoice
        </button>
        <Link to="/" className="bg-cream text-darkbrown border border-gold px-6 py-2 md:py-2.5 text-sm rounded-lg font-bold hover:bg-gold hover:text-white transition-colors flex items-center justify-center min-h-[36px]">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};
