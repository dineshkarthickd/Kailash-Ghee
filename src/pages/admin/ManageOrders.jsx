import { useState } from 'react';
import { Sidebar } from '../../components/admin/Sidebar';
import { useOrders } from '../../hooks/useOrders';
import { updateOrderStatus } from '../../firebase/orders';
import { Loader } from '../../components/common/Loader';
import { FiShoppingBag } from 'react-icons/fi';
import toast from 'react-hot-toast';

export const ManageOrders = () => {
  const { orders, loading, refetch } = useOrders();
  const [updatingId, setUpdatingId] = useState(null);
  const [filterTab, setFilterTab] = useState('All');

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, { orderStatus: newStatus });
      toast.success("Order status updated");
      refetch();
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const tabs = ['All', 'Pending', 'Confirmed', 'Shipped', 'Delivered'];
  
  const filteredOrders = filterTab === 'All' 
    ? orders 
    : orders.filter(o => o.orderStatus.toLowerCase() === filterTab.toLowerCase());

  if (loading) return <Sidebar><Loader /></Sidebar>;

  return (
    <Sidebar>
      <div className="max-w-6xl mx-auto w-full px-4 py-4 md:px-6 md:py-6">
        <div className="mb-4 animate-fadeInUp">
          <h1 className="text-lg md:text-xl font-heading font-bold text-darkbrown border-b-2 border-gold inline-block pb-1 pr-6">Manage Orders</h1>
        </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 animate-fadeInUp" style={{animationDelay: '100ms'}}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setFilterTab(tab)}
            className={`px-4 py-1.5 rounded-full font-bold text-xs md:text-sm transition-all duration-300 shadow-sm ${
              filterTab === tab 
                ? 'bg-gradient-to-r from-saffron to-gold text-white border border-transparent shadow-md' 
                : 'bg-white text-saffron border border-saffron hover:bg-yellow-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className="bg-white rounded-2xl shadow-md border border-lightgold overflow-hidden animate-fadeInUp" style={{animationDelay: '200ms'}}>
        <div className="overflow-x-auto hide-scrollbar">
          <table className="w-full text-left whitespace-nowrap border-collapse">
            <thead className="bg-[#3B1F0A] text-[#FFFDF8] uppercase tracking-wider text-xs">
              <tr>
                <th className="px-3 py-2 font-semibold sticky left-0 z-10 bg-[#3B1F0A]">Order ID</th>
                <th className="px-3 py-2 font-semibold">Date</th>
                <th className="px-3 py-2 font-semibold">Customer</th>
                <th className="px-3 py-2 font-semibold">Total</th>
                <th className="px-3 py-2 font-semibold">Payment</th>
                <th className="px-3 py-2 font-semibold">Status</th>
                <th className="px-3 py-2 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lightgold">
              {filteredOrders.map((order, index) => (
                <tr key={order.id} className={`hover:bg-yellow-50 hover:border-l-4 hover:border-l-gold transition-all duration-200 group ${index % 2 === 0 ? 'bg-white border-l-4 border-l-transparent' : 'bg-[#FFF8E7] border-l-4 border-l-transparent'}`}>
                  <td className="px-3 py-2 font-bold text-darkbrown sticky left-0 z-10 group-hover:bg-yellow-50 bg-inherit shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] transition-colors text-xs md:text-sm">{order.orderId}</td>
                  <td className="px-3 py-2 text-xs md:text-sm font-medium opacity-80">{order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : ''}</td>
                  <td className="px-3 py-2 text-xs md:text-sm">
                    <p className="font-bold text-darkbrown">{order.customer.name}</p>
                    <p className="opacity-80 mt-1">{order.customer.phone}</p>
                  </td>
                  <td className="px-3 py-2 font-bold text-saffron text-sm md:text-base">₹{order.totalAmount}</td>
                  <td className="px-3 py-2 text-xs md:text-sm font-medium">
                    <span className="px-2 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider border shadow-sm bg-green-100 text-green-800 border-green-200">
                      COD
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider border shadow-sm ${
                      order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800 border-green-200' :
                      order.orderStatus === 'shipped' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                      order.orderStatus === 'confirmed' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                      'bg-yellow-100 text-yellow-800 border-yellow-200'
                    }`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <select 
                      value={order.orderStatus}
                      onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                      disabled={updatingId === order.orderId}
                      className="text-xs md:text-sm font-bold text-darkbrown border-2 border-lightgold rounded-full px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent cursor-pointer hover:bg-cream transition-colors min-w-[120px] shadow-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center text-gold mb-4 shadow-inner border border-gold border-opacity-30">
                <FiShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-heading font-bold text-darkbrown mb-2">No orders yet</h3>
              <p className="text-sm text-darkbrown opacity-60">When customers place orders they will appear here.</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </Sidebar>
  );
};
