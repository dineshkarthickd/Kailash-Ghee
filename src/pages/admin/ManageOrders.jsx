import React, { useState } from 'react';
import { Sidebar } from '../../components/admin/Sidebar';
import { useOrders } from '../../hooks/useOrders';
import { updateOrderStatus } from '../../firebase/orders';
import { Loader } from '../../components/common/Loader';
import { FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp, FiPrinter } from 'react-icons/fi';
import { generatePackingSlip } from '../../services/packingSlip';
import toast from 'react-hot-toast';

export const ManageOrders = () => {
  const { orders, loading, refetch } = useOrders();
  const [, setUpdatingId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);

  const ITEMS_PER_PAGE = 5;

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

  const handleFilterChange = (f) => {
    setFilter(f);
    setCurrentPage(1);
    setExpandedRow(null);
  };

  const toggleRow = (orderId) => {
    if (expandedRow === orderId) setExpandedRow(null);
    else setExpandedRow(orderId);
  };

  const handlePrint = (order, format) => {
    try {
      generatePackingSlip(order, format);
      toast.success(`Downloading ${format.toUpperCase()} packing slip...`);
    } catch (err) {
      toast.error('Failed to generate PDF');
      console.error(err);
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.orderStatus.toLowerCase() === filter.toLowerCase());

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (loading) return <Sidebar><div className="flex items-center justify-center h-full"><Loader /></div></Sidebar>;

  return (
    <Sidebar>
      <div className="flex flex-col gap-8 h-full min-h-[80vh]">
        
        {/* Header */}
        <div className="flex justify-between items-end border-b-[1px] border-primary/10 pb-4">
          <div>
            <h1 className="font-heading text-3xl text-primary mb-2">Manage Orders</h1>
            <p className="font-sans text-primary/60">View and update customer orders.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 border-b-[1px] border-primary/10 pb-6">
          {['all', 'pending', 'confirmed', 'shipped', 'delivered'].map(f => (
            <button 
              key={f}
              onClick={() => handleFilterChange(f)}
              className={`px-6 py-2 rounded-full font-sans text-xs uppercase tracking-widest transition-all duration-300 ${
                filter === f 
                ? 'bg-primary text-white' 
                : 'bg-primary/5 text-primary hover:bg-primary/10'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="flex-1 bg-white/20 backdrop-blur-md border-[1px] border-primary/20 overflow-hidden flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left font-sans border-collapse">
              <thead className="bg-primary/5 border-b-[1px] border-primary/20 text-xs uppercase tracking-widest text-primary/70">
                <tr>
                  <th className="p-4 font-medium">Order ID</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Total</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10 text-sm text-primary">
                {paginatedOrders.map(order => (
                  <React.Fragment key={order.id}>
                    <tr 
                      className={`hover:bg-white/40 transition-colors duration-300 cursor-pointer ${expandedRow === order.id ? 'bg-primary/5' : ''}`}
                      onClick={() => toggleRow(order.id)}
                    >
                      <td className="p-4 font-medium tracking-wide flex items-center gap-2">
                        {expandedRow === order.id ? <FiChevronUp className="text-primary/50" /> : <FiChevronDown className="text-primary/50" />}
                        {order.orderId || order.id.slice(0,8)}
                      </td>
                      <td className="p-4 text-primary/60">
                        {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : ''}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-medium">{order.customer?.name || order.customerDetails?.name || '—'}</span>
                          <span className="text-xs text-primary/50">{order.customer?.phone || order.customerDetails?.phone || ''}</span>
                        </div>
                      </td>
                      <td className="p-4">₹{order.totalAmount}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs tracking-widest uppercase ${
                          order.orderStatus === 'pending' ? 'bg-yellow-500/20 text-yellow-700' :
                          order.orderStatus === 'confirmed' ? 'bg-blue-500/20 text-blue-700' :
                          order.orderStatus === 'shipped' ? 'bg-indigo-500/20 text-indigo-700' :
                          'bg-green-500/20 text-green-700'
                        }`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <select 
                          value={order.orderStatus}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="bg-transparent border-[1px] border-primary/30 text-primary text-xs uppercase tracking-widest p-2 outline-none focus:border-primary transition-colors cursor-pointer"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                    
                    {/* Expanded Details Row */}
                    {expandedRow === order.id && (
                      <tr className="bg-white/60">
                        <td colSpan="6" className="p-6 border-l-[3px] border-primary/40">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            
                            {/* Shipping Details */}
                            <div>
                              <h4 className="font-heading text-lg text-primary border-b-[1px] border-primary/10 pb-2 mb-3">Shipping Details</h4>
                              <div className="font-sans text-sm text-primary/80 space-y-1">
                                <p className="font-medium text-primary">{order.customer?.name || order.customerDetails?.name || 'Valued Customer'}</p>
                                <p>{order.customer?.address?.street || order.customer?.address?.line1 || ''}</p>
                                <p>{order.customer?.address?.area || order.customer?.address?.line2 || ''}</p>
                                <p>
                                  {order.customer?.address?.city || ''} 
                                  {order.customer?.address?.state ? `, ${order.customer?.address?.state}` : ''} 
                                  {order.customer?.address?.zip || order.customer?.address?.pincode ? ` - ${order.customer?.address?.zip || order.customer?.address?.pincode}` : ''}
                                </p>
                                <p className="pt-1">Phone: <span className="font-medium">{order.customer?.phone || order.customerDetails?.phone || '—'}</span></p>
                              </div>
                              
                              <div className="mt-6 flex gap-3">
                                <button 
                                  onClick={() => handlePrint(order, 'a4')}
                                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-[11px] font-sans uppercase tracking-widest hover:bg-primary/90 transition-colors"
                                >
                                  <FiPrinter /> Print A4 Label
                                </button>
                                <button 
                                  onClick={() => handlePrint(order, 'thermal')}
                                  className="flex items-center gap-2 px-4 py-2 border-[1px] border-primary text-primary text-[11px] font-sans uppercase tracking-widest hover:bg-primary/5 transition-colors"
                                >
                                  <FiPrinter /> Thermal 4x6
                                </button>
                              </div>
                            </div>
                            
                            {/* Items Ordered */}
                            <div>
                              <h4 className="font-heading text-lg text-primary border-b-[1px] border-primary/10 pb-2 mb-3">Items Ordered</h4>
                              <div className="bg-primary/5 rounded-md border-[1px] border-primary/10 p-3 space-y-3">
                                {(order.items || []).map((item, idx) => (
                                  <div key={idx} className="flex items-center justify-between font-sans text-sm">
                                    <div className="flex items-center gap-3">
                                      <span className="font-bold text-primary w-6 text-right">{item.qty}x</span>
                                      <div>
                                        <p className="font-medium text-primary">{item.name}</p>
                                        <p className="text-[11px] text-primary/60 uppercase tracking-widest">{item.size}</p>
                                      </div>
                                    </div>
                                    <span className="font-medium text-primary">₹{item.price * item.qty}</span>
                                  </div>
                                ))}
                                <div className="border-t-[1px] border-primary/20 pt-2 mt-2 flex justify-between font-bold text-primary">
                                  <span>Total</span>
                                  <span>₹{order.totalAmount}</span>
                                </div>
                              </div>
                            </div>
                            
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            
            {filteredOrders.length === 0 && (
              <div className="flex flex-col items-center justify-center p-12 text-primary/50">
                <p>No orders found matching the filter.</p>
              </div>
            )}
          </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="border-t-[1px] border-primary/10 bg-white/40 p-4 flex items-center justify-between font-sans text-sm text-primary">
              <span className="opacity-70">
                Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredOrders.length)} of {filteredOrders.length}
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border-[1px] border-primary/20 bg-white hover:bg-primary/5 disabled:opacity-50 transition-colors"
                >
                  <FiChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 flex items-center justify-center border-[1px] transition-colors ${
                        currentPage === i + 1 
                        ? 'bg-primary text-white border-primary' 
                        : 'border-primary/20 bg-white hover:bg-primary/5 text-primary'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border-[1px] border-primary/20 bg-white hover:bg-primary/5 disabled:opacity-50 transition-colors"
                >
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Sidebar>
  );
};
