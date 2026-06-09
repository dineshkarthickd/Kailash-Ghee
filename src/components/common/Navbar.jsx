import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiHome, FiShoppingBag, FiPackage, FiSettings } from 'react-icons/fi';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { LanguageToggle } from './LanguageToggle';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount } = useCart();
  const { user, isAdmin, loginWithGoogle, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link to={to} className="relative group text-darkbrown text-sm font-medium px-1 py-2">
        <span className="relative z-10 group-hover:text-saffron transition-colors">{children}</span>
        <span className={`absolute bottom-0 left-0 h-0.5 bg-saffron transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
      </Link>
    );
  };

  const DrawerLink = ({ to, children, icon }) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        onClick={() => setIsOpen(false)} 
        className={`flex items-center h-[48px] px-6 text-sm font-heading font-medium transition-colors ${isActive ? 'text-saffron bg-yellow-50 border-l-4 border-gold' : 'text-darkbrown hover:bg-cream border-l-4 border-transparent'}`}
      >
        <span className="mr-4 text-lg">{icon}</span>
        {children}
      </Link>
    );
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-in-out ${isScrolled ? 'bg-white bg-opacity-95 backdrop-blur-md shadow-[0_4px_20px_rgba(212,175,55,0.15)] py-2 border-b-2 border-gold' : 'bg-ivory py-2 md:py-3 border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-12 md:h-14 items-center relative">
            
            {/* Mobile Left: Hamburger */}
            <div className="flex items-center md:hidden w-1/3">
              <button onClick={toggleMenu} className="text-darkbrown hover:text-saffron focus:outline-none flex items-center justify-center w-[44px] h-[44px]">
                <FiMenu className="h-6 w-6" />
              </button>
            </div>

            {/* Desktop Left: Logo */}
            <div className="hidden md:flex flex-1 justify-start">
              <Link to="/" className="flex-shrink-0 flex items-center group">
                <span className="font-heading text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-saffron to-gold tracking-wide group-hover:scale-105 transition-transform">
                  Kailash Ghee
                </span>
              </Link>
            </div>

            {/* Mobile Center: Logo */}
            <div className="flex md:hidden flex-1 justify-center w-1/3">
              <Link to="/" className="flex-shrink-0 flex items-center group">
                <span className="font-heading text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-saffron to-gold tracking-wide">
                  Kailash Ghee
                </span>
              </Link>
            </div>

            {/* Desktop Center: Nav Links */}
            <div className="hidden md:flex md:space-x-8 items-center flex-1 justify-center">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/products">Products</NavLink>
              {user && !isAdmin && <NavLink to="/my-orders">My Orders</NavLink>}
              {isAdmin && (
                <Link to="/admin/dashboard" className="text-saffron font-bold hover:text-gold transition-colors">
                  Admin Panel
                </Link>
              )}
            </div>

            {/* Right: Actions (Language, User, Cart) */}
            <div className="flex items-center justify-end space-x-2 md:space-x-4 w-1/3 md:flex-1">
              <div className="hidden md:block">
                <LanguageToggle />
              </div>
              <div className="hidden md:flex items-center">
                <button 
                  onClick={user ? logout : loginWithGoogle}
                  className="flex items-center gap-1.5 text-darkbrown hover:text-saffron transition-colors text-sm font-bold bg-cream px-3 py-1.5 rounded-full"
                >
                  <FiUser className="h-4 w-4" />
                  <span>{user ? 'Logout' : 'Login'}</span>
                </button>
              </div>
              <Link to="/cart" className="relative text-darkbrown hover:text-saffron p-2 transition-colors flex items-center justify-center w-[40px] h-[40px]">
                <FiShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-1 text-[9px] font-bold text-white bg-saffron rounded-full border border-white shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`fixed inset-0 z-[60] bg-black transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleMenu}
      ></div>
      
      {/* Mobile Drawer Panel */}
      <div className={`fixed inset-y-0 left-0 z-[70] w-[75%] max-w-sm bg-ivory shadow-2xl transform transition-transform ease-in-out duration-300 md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col pt-6 pb-8 overflow-y-auto">
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 pb-6 border-b border-lightgold">
            <span className="font-heading text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-saffron to-gold">Kailash Ghee</span>
            <button onClick={toggleMenu} className="text-darkbrown hover:text-saffron w-[44px] h-[44px] flex items-center justify-center rounded-full hover:bg-cream transition-colors">
              <FiX className="h-6 w-6" />
            </button>
          </div>

          {/* Drawer Links */}
          <nav className="flex flex-col mt-4 flex-1">
            <DrawerLink to="/" icon={<FiHome className="w-5 h-5" />}>Home</DrawerLink>
            <DrawerLink to="/products" icon={<FiShoppingBag className="w-5 h-5" />}>Products</DrawerLink>
            <DrawerLink to="/cart" icon={<FiShoppingCart className="w-5 h-5" />}>Cart</DrawerLink>
            
            {user && !isAdmin && (
              <DrawerLink to="/my-orders" icon={<FiPackage className="w-5 h-5" />}>My Orders</DrawerLink>
            )}
            
            {isAdmin && (
              <DrawerLink to="/admin/dashboard" icon={<FiSettings className="w-5 h-5" />}>Admin Panel</DrawerLink>
            )}
            
            <div className="px-6 mt-8">
              <div className="border-t border-cream pt-6">
                <p className="text-sm text-darkbrown opacity-60 mb-4 font-bold uppercase tracking-wider">Language</p>
                <LanguageToggle />
              </div>
            </div>
            
            {user ? (
              <div className="px-6 mt-auto">
                <div className="bg-white rounded-xl p-4 border border-lightgold flex items-center gap-3 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-gold">
                    <FiUser className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden flex-1">
                    <p className="text-sm font-bold text-darkbrown truncate">{user.email}</p>
                    <button 
                      onClick={() => { logout(); setIsOpen(false); }} 
                      className="text-xs text-saffron hover:text-gold font-bold transition-colors"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-6 mt-auto">
                <button 
                  onClick={() => { loginWithGoogle(); setIsOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 bg-white border border-lightgold text-darkbrown font-bold py-3 px-4 rounded-xl hover:bg-yellow-50 transition-colors shadow-sm"
                >
                  <FiUser className="w-5 h-5 text-saffron" />
                  Sign In
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};
