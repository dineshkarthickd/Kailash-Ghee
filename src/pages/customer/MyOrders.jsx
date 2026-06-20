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
    <div className="w-full min-h-screen pt-12 lg:pt-16 pb-24 px-6 lg:px-16 bg-transparent">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading text-4xl text-primary font-normal mb-12 pb-6 border-b-[1px] border-primary/10">My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-20 bg-primary/5 border-[1px] border-primary/10">
            <p className="font-sans text-[15px] text-primary/70">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {orders.map(order => (
              <div key={order.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-8 bg-white/20 backdrop-blur-md border-[1px] border-primary/10 hover:bg-white/40 transition-colors duration-300">
                <div className="flex-grow mb-6 md:mb-0">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="font-sans font-medium text-lg text-primary tracking-widest">{order.orderId}</h3>
                    <span className={`font-sans text-[11px] uppercase tracking-widest px-3 py-1 ${order.orderStatus === 'pending' ? 'bg-yellow-500/20 text-yellow-700' : 'bg-green-500/20 text-green-700'}`}>
                      {order.orderStatus}
                    </span>
                    <span className="font-sans text-xs text-primary/50">
                      {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : ''}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    {order.items.map((item, idx) => (
                      <p key={idx} className="font-sans text-sm text-primary/80 mb-1">
                        {item.qty}x {item.name} <span className="italic text-primary/50">({item.variant.size})</span>
                      </p>
                    ))}
                  </div>
                  
                  <p className="font-heading text-xl text-primary mt-2">
                    Total: ₹{order.totalAmount} <span className="font-sans text-xs text-primary/50 uppercase tracking-widest ml-2">via {order.paymentMethod}</span>
                  </p>
                </div>
                
                <div className="w-full md:w-auto border-t-[1px] md:border-t-0 border-primary/10 pt-6 md:pt-0">
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
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 border-[1px] border-primary text-primary font-sans text-[12px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    <FiDownload className="w-4 h-4" /> Download Invoice
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
