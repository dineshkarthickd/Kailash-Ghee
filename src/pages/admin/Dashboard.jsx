import { Sidebar } from '../../components/admin/Sidebar';
import { useOrders } from '../../hooks/useOrders';
import { Loader } from '../../components/common/Loader';
import { Link } from 'react-router-dom';
import { FiDollarSign, FiShoppingBag, FiClock, FiPlus, FiList, FiSettings, FiDownload } from 'react-icons/fi';

export const Dashboard = () => {
  const { orders, loading } = useOrders();

  if (loading) return <Sidebar><Loader /></Sidebar>;

  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
  const pendingOrders = orders.filter(o => o.orderStatus === 'pending').length;
  
  // Get last 5 orders for recent orders section
  const recentOrders = [...orders].sort((a, b) => b.createdAt - a.createdAt).slice(0, 5);

  return (
    <Sidebar>
      <div className="max-w-6xl mx-auto w-full px-4 py-4 md:px-6 md:py-6">
        <div className="mb-4 animate-fadeInUp">
          <h1 className="text-lg md:text-xl font-heading font-bold text-darkbrown border-b-2 border-gold inline-block pb-1 pr-6">Dashboard Overview</h1>
          <p className="text-xs text-darkbrown opacity-70 mt-1">Welcome back, Admin. Here's your store's current status.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8 animate-fadeInUp" style={{animationDelay: '100ms'}}>
          {/* Revenue Card */}
          <div className="bg-gradient-to-br from-white to-cream p-4 rounded-2xl shadow-sm border border-lightgold border-l-4 border-l-gold transition-transform duration-300 hover:-translate-y-1 hover:shadow-md flex items-center">
            <div className="w-10 h-10 rounded-xl bg-gold text-white flex items-center justify-center shadow-inner mr-4">
              <FiDollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-darkbrown uppercase tracking-wider opacity-60 mb-1">Total Revenue</p>
              <p className="text-2xl md:text-3xl font-bold font-heading text-darkbrown">₹{totalRevenue.toLocaleString()}</p>
              <p className="text-[10px] text-darkbrown opacity-70 mt-1">All time earnings</p>
            </div>
          </div>

          {/* Orders Card */}
          <div className="bg-gradient-to-br from-white to-cream p-4 rounded-2xl shadow-sm border border-lightgold border-l-4 border-l-saffron transition-transform duration-300 hover:-translate-y-1 hover:shadow-md flex items-center">
            <div className="w-10 h-10 rounded-xl bg-saffron text-white flex items-center justify-center shadow-inner mr-4">
              <FiShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-darkbrown uppercase tracking-wider opacity-60 mb-1">Total Orders</p>
              <p className="text-2xl md:text-3xl font-bold font-heading text-darkbrown">{orders.length}</p>
              <p className="text-[10px] text-darkbrown opacity-70 mt-1">Total placed</p>
            </div>
          </div>

          {/* Pending Card */}
          <div className="bg-gradient-to-br from-white to-cream p-4 rounded-2xl shadow-sm border border-lightgold border-l-4 border-l-red-500 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md flex items-center">
            <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center shadow-inner mr-4">
              <FiClock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-darkbrown uppercase tracking-wider opacity-60 mb-1">Pending Orders</p>
              <p className="text-2xl md:text-3xl font-bold font-heading text-red-600">{pendingOrders}</p>
              <p className="text-[10px] text-darkbrown opacity-70 mt-1">Needs attention</p>
            </div>
          </div>
        </div>

      {/* Quick Actions */}
      <div className="mb-8 md:mb-10 animate-fadeInUp" style={{animationDelay: '200ms'}}>
        <h2 className="text-lg md:text-xl font-heading font-bold text-darkbrown mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/products" className="btn-primary py-1.5 px-4 text-sm flex items-center gap-2">
            <FiPlus className="w-4 h-4" /> Add New Product
          </Link>
          <Link to="/admin/orders" className="bg-white border-2 border-gold text-darkbrown font-bold rounded-full py-1.5 px-4 text-sm flex items-center gap-2 hover:bg-gold hover:text-white transition-colors duration-300 shadow-sm">
            <FiList className="w-4 h-4" /> View All Orders
          </Link>
          <Link to="/admin/settings" className="bg-white border-2 border-cream text-darkbrown font-bold rounded-full py-1.5 px-4 text-sm flex items-center gap-2 hover:bg-gray-50 hover:border-gold transition-colors duration-300 shadow-sm">
            <FiSettings className="w-4 h-4" /> Store Settings
          </Link>
          <button className="bg-white border-2 border-cream text-darkbrown font-bold rounded-full py-1.5 px-4 text-sm flex items-center gap-2 hover:bg-gray-50 hover:border-gold transition-colors duration-300 shadow-sm">
            <FiDownload className="w-4 h-4" /> Download Report
          </button>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-lightgold overflow-hidden animate-fadeInUp" style={{animationDelay: '300ms'}}>
        <div className="p-4 border-b border-cream bg-[#FFFDF8]">
          <h2 className="text-lg md:text-xl font-heading font-bold text-darkbrown">Recent Orders</h2>
        </div>
        
        {recentOrders.length > 0 ? (
          <div className="divide-y divide-cream">
            {recentOrders.map(order => (
              <div key={order.id} className="p-4 hover:bg-yellow-50 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-gold border border-gold border-opacity-30">
                    <FiShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-sm md:text-base text-darkbrown">{order.customerDetails?.name || 'Guest'}</p>
                    <p className="text-[10px] md:text-xs text-darkbrown opacity-60">Order ID: {order.id.slice(0, 8)}...</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:items-end gap-1">
                  <p className="font-bold text-sm text-saffron">₹{order.totalAmount}</p>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold border ${order.orderStatus === 'pending' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
                    {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                  </span>
                </div>
              </div>
            ))}
            <div className="p-3 md:p-4 text-center bg-cream bg-opacity-30">
              <Link to="/admin/orders" className="text-xs md:text-sm font-bold text-saffron hover:text-gold transition-colors">
                View all orders &rarr;
              </Link>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center text-gold opacity-50 mb-4">
              <FiShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-darkbrown mb-1">No recent orders yet</h3>
            <p className="text-sm text-darkbrown opacity-60">When customers place orders, they will appear here.</p>
          </div>
        )}
      </div>
      </div>
    </Sidebar>
  );
};
