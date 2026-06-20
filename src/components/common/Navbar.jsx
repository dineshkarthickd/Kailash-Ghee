import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiPackage, FiLogOut, FiLogIn, FiHome, FiGrid } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { LanguageToggle } from './LanguageToggle';
import { cn } from '../../lib/utils';

export const Navbar = () => {
  const { t } = useTranslation();
  const { user: currentUser, logout, loginWithGoogle, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const navLinks = [
    { name: t('common.home'), path: '/' },
    { name: t('common.products'), path: '/products' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out border-b",
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm border-primary/10" : "bg-transparent border-transparent"
      )}
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-3 items-center px-8 lg:px-16 py-6">

        {/* Left: Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 justify-start">
          {navLinks.map((link, index) => (
            <div key={link.name} className="flex items-center gap-6 xl:gap-8">
              <Link
                to={link.path}
                className="font-sans text-[13px] uppercase tracking-[0.15em] text-primary hover:text-accent-gold transition-colors"
              >
                {link.name}
              </Link>
              {index !== navLinks.length - 1 && (
                <span className="text-primary/20 text-xs">|</span>
              )}
            </div>
          ))}
          {/* My Orders — shown only when logged in and not admin */}
          {currentUser && !isAdmin && (
            <>
              <span className="text-primary/20 text-xs">|</span>
              <Link
                to="/my-orders"
                className="font-sans text-[13px] uppercase tracking-[0.15em] text-primary hover:text-accent-gold transition-colors"
              >
                {t('common.my_orders', 'My Orders')}
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <div className="flex lg:hidden items-center justify-start">
          <button
            className="p-2 -ml-2 text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX className="w-6 h-6" strokeWidth={1.5} /> : <FiMenu className="w-6 h-6" strokeWidth={1.5} />}
          </button>
        </div>

        {/* Center: Logo */}
        <div className="flex items-center justify-center">
          <Link to="/" className="group">
            <span className="font-heading font-normal text-xl sm:text-2xl lg:text-3xl tracking-widest lg:tracking-[0.1em] text-primary uppercase whitespace-nowrap">
              {t('common.brand_name_first', 'Kailash')} <span className="opacity-70">{t('common.brand_name_second', 'Ghee')}</span>
            </span>
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-5">
          <div className="hidden lg:block">
            <LanguageToggle />
          </div>

          {/* Admin Panel link */}
          {currentUser && isAdmin && (
            <Link
              to="/admin/dashboard"
              className="hidden lg:block font-sans text-[12px] uppercase tracking-widest text-primary hover:text-accent-gold transition-colors font-medium"
            >
              {t('common.admin_panel', 'Admin Panel')}
            </Link>
          )}

          {/* Login / Logout icon — desktop */}
          <div className="hidden lg:flex items-center">
            {currentUser ? (
              <button
                onClick={logout}
                title="Logout"
                className="group flex items-center gap-1.5 text-primary hover:text-accent-gold transition-colors"
              >
                <FiUser className="w-[18px] h-[18px]" strokeWidth={1.5} />
                <FiLogOut className="w-[14px] h-[14px] opacity-0 group-hover:opacity-100 transition-opacity -ml-0.5" strokeWidth={1.5} />
              </button>
            ) : (
              <button
                onClick={loginWithGoogle}
                title="Login"
                className="text-primary hover:text-accent-gold transition-colors"
              >
                <FiUser className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </button>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="flex items-center gap-1 group hover:text-accent-gold transition-colors">
            <FiShoppingCart className="w-[18px] h-[18px] text-primary group-hover:text-accent-gold transition-colors" strokeWidth={1.5} />
            <span className="font-sans text-sm text-primary group-hover:text-accent-gold transition-colors">
              ({cartCount})
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute top-[72px] left-0 right-0 z-50 md:hidden"
            style={{ background: 'var(--color-background, #FAF7F2)' }}
          >
            {/* Solid opaque panel */}
            <div className="mx-4 mb-4 rounded-2xl border border-primary/10 shadow-2xl overflow-hidden"
              style={{ backgroundColor: '#FAF7F2' }}
            >
              {/* Nav Links */}
              <nav className="flex flex-col">
                {/* Home */}
                <Link
                  to="/"
                  className="flex items-center gap-3 px-5 py-4 border-b border-primary/8 hover:bg-primary/5 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <FiHome className="w-4 h-4 text-accent-gold flex-shrink-0" strokeWidth={1.5} />
                  <span className="font-heading text-base font-medium text-primary">{t('common.home', 'Home')}</span>
                </Link>

                {/* Products */}
                <Link
                  to="/products"
                  className="flex items-center gap-3 px-5 py-4 border-b border-primary/8 hover:bg-primary/5 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <FiGrid className="w-4 h-4 text-accent-gold flex-shrink-0" strokeWidth={1.5} />
                  <span className="font-heading text-base font-medium text-primary">{t('common.products', 'Products')}</span>
                </Link>

                {/* My Orders — logged in, non-admin only */}
                {currentUser && !isAdmin && (
                  <Link
                    to="/my-orders"
                    className="flex items-center gap-3 px-5 py-4 border-b border-primary/8 hover:bg-primary/5 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiPackage className="w-4 h-4 text-accent-gold flex-shrink-0" strokeWidth={1.5} />
                    <span className="font-heading text-base font-medium text-primary">{t('common.my_orders', 'My Orders')}</span>
                  </Link>
                )}

                {/* Cart */}
                <Link
                  to="/cart"
                  className="flex items-center gap-3 px-5 py-4 border-b border-primary/8 hover:bg-primary/5 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <FiShoppingCart className="w-4 h-4 text-accent-gold flex-shrink-0" strokeWidth={1.5} />
                  <span className="font-heading text-base font-medium text-primary">{t('common.cart', 'Cart')}</span>
                  {cartCount > 0 && (
                    <span className="ml-auto bg-accent-gold text-white text-[11px] px-2 py-0.5 rounded-full font-bold">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Admin Panel — admin only */}
                {currentUser && isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-3 px-5 py-4 border-b border-primary/8 hover:bg-primary/5 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiUser className="w-4 h-4 text-accent-gold flex-shrink-0" strokeWidth={1.5} />
                    <span className="font-heading text-base font-medium text-primary">{t('common.admin_panel', 'Admin Panel')}</span>
                  </Link>
                )}
              </nav>

              {/* Bottom Actions */}
              <div className="px-5 py-4 flex flex-col gap-3 bg-primary/3">
                <LanguageToggle />

                {currentUser ? (
                  <button
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="w-full py-3 rounded-xl border border-primary/20 text-primary font-sans text-[12px] tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-300"
                  >
                    <FiLogOut className="w-4 h-4" />
                    {t('common.logout', 'Logout')}
                  </button>
                ) : (
                  <button
                    onClick={() => { loginWithGoogle(); setIsOpen(false); }}
                    className="w-full py-3 rounded-xl bg-primary text-white font-sans text-[12px] tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-primary/90 transition-all duration-300"
                  >
                    <FiLogIn className="w-4 h-4" />
                    {t('common.login', 'Login')}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
