import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getUserOrders } from '../../firebase/orders';
import { generateInvoicePDF } from '../../services/invoice';
import { Loader } from '../../components/common/Loader';
import { FiDownload } from 'react-icons/fi';

export const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      const userOrders = await getUserOrders();
      setOrders(userOrders);
      setLoading(false);
    };
    fetchOrders();
  }, [user]);

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <h1 className="text-xl md:text-2xl font-heading font-bold text-darkbrown mb-6">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-cream text-center text-sm md:text-base">
          <p className="text-darkbrown opacity-80">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4 md:space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-cream flex flex-col md:flex-row justify-between gap-4 md:gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="font-bold text-base text-darkbrown">{order.orderId}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold uppercase ${
                    order.orderStatus === 'delivered' ? 'bg-green-100 text-green-700' :
                    order.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {order.orderStatus}
                  </span>
                  <span className="text-xs md:text-sm text-darkbrown opacity-60">
                    {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : ''}
                  </span>
                </div>
                
                <div className="space-y-1 mb-3">
                  {order.items.map((item, idx) => (
                    <p key={idx} className="text-xs md:text-sm text-darkbrown">
                      {item.qty}x {item.name} ({item.variant.size})
                    </p>
                  ))}
                </div>
                
                <p className="font-bold text-saffron text-sm md:text-base">Total: ₹{order.totalAmount} <span className="text-xs font-normal text-darkbrown opacity-80">via {order.paymentMethod}</span></p>
              </div>
              
              <div className="flex items-center md:items-start md:justify-end">
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
                  className="flex items-center justify-center gap-1.5 text-xs md:text-sm text-saffron hover:text-gold font-semibold transition-colors min-h-[36px]"
                >
                  <FiDownload /> Invoice
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
