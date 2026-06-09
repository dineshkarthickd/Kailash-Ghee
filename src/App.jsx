import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { WhatsAppFloatingButton } from './components/common/WhatsAppFloatingButton';
import { ProtectedRoute } from './components/common/ProtectedRoute';

import { Home } from './pages/customer/Home';
import { Products } from './pages/customer/Products';
import { ProductDetail } from './pages/customer/ProductDetail';
import { Cart } from './pages/customer/Cart';
import { Checkout } from './pages/customer/Checkout';
import { OrderConfirmation } from './pages/customer/OrderConfirmation';
import { MyOrders } from './pages/customer/MyOrders';

import { AdminLogin } from './pages/admin/AdminLogin';
import { Dashboard } from './pages/admin/Dashboard';
import { ManageOrders } from './pages/admin/ManageOrders';
import { ManageProducts } from './pages/admin/ManageProducts';
import { Settings } from './pages/admin/Settings';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-texture">
      <Toaster position="top-center" />
      
      {!isAdminRoute && <Navbar />}
      
      <main className={`flex-grow ${!isAdminRoute ? 'pt-16 md:pt-20' : ''}`}>
        <ScrollToTop />
        <Routes>
          {/* Customer Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route path="/my-orders" element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute requireAdmin><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute requireAdmin><ManageOrders /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute requireAdmin><ManageProducts /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute requireAdmin><Settings /></ProtectedRoute>} />
        </Routes>
      </main>

      {!isAdminRoute && <WhatsAppFloatingButton />}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
