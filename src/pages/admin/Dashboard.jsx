import { Sidebar } from '../../components/admin/Sidebar';
import { useOrders } from '../../hooks/useOrders';
import { Loader } from '../../components/common/Loader';
import { Link } from 'react-router-dom';
import { FiDollarSign, FiShoppingBag, FiClock, FiPlus, FiList, FiSettings, FiDownload } from 'react-icons/fi';
import { generateReportPDF } from '../../services/report';

export const Dashboard = () => {
  const { orders, loading } = useOrders();

  if (loading) return <Sidebar><div className="flex justify-center py-20"><Loader /></div></Sidebar>;

  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
  const pendingOrders = orders.filter(o => o.orderStatus === 'pending').length;
  
  // Get last 5 orders for recent orders section
  const recentOrders = [...orders].sort((a, b) => b.createdAt - a.createdAt).slice(0, 5);

  return (
    <Sidebar>
      <div className="flex flex-col gap-8">
        
        {/* Header */}
        <div>
          <h1 className="font-heading text-3xl text-primary mb-2">Dashboard Overview</h1>
          <p className="font-sans text-primary/60">Welcome back. Here's your store's current status.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Revenue Card */}
          <div className="p-6 border-[1px] border-primary/20 bg-white/40 flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <FiDollarSign className="w-6 h-6 text-primary stroke-[1.5]" />
            </div>
            <div>
              <p className="font-sans text-primary/60 text-sm uppercase tracking-widest mb-1">Total Revenue</p>
              <p className="font-heading text-2xl text-primary">₹{totalRevenue.toLocaleString()}</p>
            </div>
          </div>

          {/* Orders Card */}
          <div className="p-6 border-[1px] border-primary/20 bg-white/40 flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <FiShoppingBag className="w-6 h-6 text-primary stroke-[1.5]" />
            </div>
            <div>
              <p className="font-sans text-primary/60 text-sm uppercase tracking-widest mb-1">Total Orders</p>
              <p className="font-heading text-2xl text-primary">{orders.length}</p>
            </div>
          </div>

          {/* Pending Card */}
          <div className="p-6 border-[1px] border-primary/20 bg-white/40 flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <FiClock className="w-6 h-6 text-primary stroke-[1.5]" />
            </div>
            <div>
              <p className="font-sans text-primary/60 text-sm uppercase tracking-widest mb-1">Pending Orders</p>
              <p className="font-heading text-2xl text-primary">{pendingOrders}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="font-heading text-xl text-primary mb-6 border-b-[1px] border-primary/10 pb-2">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link to="/admin/products" className="flex items-center gap-2 px-6 py-3 border-[1px] border-primary/20 bg-white/40 hover:bg-primary/5 transition-colors font-sans text-sm text-primary">
              <FiPlus className="stroke-[2]" /> Add New Product
            </Link>
            <Link to="/admin/orders" className="flex items-center gap-2 px-6 py-3 border-[1px] border-primary/20 bg-white/40 hover:bg-primary/5 transition-colors font-sans text-sm text-primary">
              <FiList className="stroke-[2]" /> View All Orders
            </Link>
            <Link to="/admin/settings" className="flex items-center gap-2 px-6 py-3 border-[1px] border-primary/20 bg-white/40 hover:bg-primary/5 transition-colors font-sans text-sm text-primary">
              <FiSettings className="stroke-[2]" /> Store Settings
            </Link>
            <button
              onClick={() => generateReportPDF(orders)}
              className="flex items-center gap-2 px-6 py-3 border-[1px] border-primary/20 bg-white/40 hover:bg-primary/5 transition-colors font-sans text-sm text-primary"
            >
              <FiDownload className="stroke-[2]" /> Download Report
            </button>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-6 border-b-[1px] border-primary/10 pb-2">
            <h2 className="font-heading text-xl text-primary">Recent Orders</h2>
          </div>
          
          {recentOrders.length > 0 ? (
            <div className="flex flex-col gap-4">
              {recentOrders.map(order => (
                <div key={order.id} className="flex justify-between items-center p-6 border-[1px] border-primary/10 bg-white/20 hover:bg-white/40 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center">
                      <FiShoppingBag className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-sans font-medium text-primary">{order.customer?.name || order.customerDetails?.name || 'Guest'}</p>
                      <p className="font-sans text-xs text-primary/50">Order ID: {order.orderId || order.id?.slice(0, 8)}...</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-sans text-primary">₹{order.totalAmount}</p>
                    <span className={`font-sans text-xs px-3 py-1 rounded-full ${order.orderStatus === 'pending' ? 'bg-yellow-500/20 text-yellow-700' : 'bg-green-500/20 text-green-700'}`}>
                      {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-center">
                <Link to="/admin/orders" className="font-sans text-sm text-primary border-b-[1px] border-primary pb-1 hover:text-primary/60 transition-colors">
                  View all orders &rarr;
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-12 border-[1px] border-primary/20 bg-white/20 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-4">
                <FiShoppingBag className="w-8 h-8 text-primary/40 stroke-[1.5]" />
              </div>
              <h3 className="font-heading text-xl text-primary mb-2">No recent orders yet</h3>
              <p className="font-sans text-primary/60">When customers place orders, they will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </Sidebar>
  );
};
