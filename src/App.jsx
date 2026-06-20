import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
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
  const { i18n } = useTranslation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    document.documentElement.lang = i18n.language || 'en';
  }, [i18n.language]);

  return (
    <div className="flex flex-col min-h-screen bg-texture">
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2500,
          style: {
            background: '#1F2922',
            color: '#F5EFE0',
            fontFamily: 'var(--font-sans, sans-serif)',
            fontSize: '13px',
            letterSpacing: '0.05em',
            borderRadius: '4px',
            padding: '12px 18px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            border: '1px solid rgba(245,239,224,0.12)',
            maxWidth: '320px',
          },
          success: {
            iconTheme: { primary: '#C8A96A', secondary: '#1F2922' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
          },
        }}
      />
      
      {!isAdminRoute && <Navbar />}
      
      <main className={`flex-grow ${(!isAdminRoute && location.pathname !== '/') ? 'pt-24 md:pt-28' : ''}`}>
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
          
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAdminRoute && <WhatsAppFloatingButton />}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
