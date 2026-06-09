import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiBox, FiShoppingBag, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

export const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { logout } = useAuth();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FiHome /> },
    { name: 'Orders', path: '/admin/orders', icon: <FiShoppingBag /> },
    { name: 'Products', path: '/admin/products', icon: <FiBox /> },
    { name: 'Settings', path: '/admin/settings', icon: <FiSettings /> },
  ];

  return (
    <div className="flex h-screen bg-texture overflow-hidden">
      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-60' : 'opacity-0 pointer-events-none'}`} onClick={toggleMenu}></div>
      
      <aside className={`fixed inset-y-0 left-0 z-50 w-56 bg-texture-dark text-cream transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} shadow-2xl lg:shadow-none border-r border-gold border-opacity-20`}>
        <div className="flex flex-col items-center justify-center h-24 bg-black bg-opacity-30 border-b border-gold border-opacity-30 relative">
          <span className="text-2xl font-heading font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-saffron to-gold tracking-wide">
            Kailash Ghee
          </span>
          <span className="text-xs text-lightgold mt-1 tracking-widest uppercase">Admin Portal</span>
          <button onClick={toggleMenu} className="absolute right-4 top-4 lg:hidden text-lightgold hover:text-saffron p-2">
            <FiX className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="flex flex-col h-[calc(100%-6rem)] px-4 py-8 overflow-y-auto">
          <div className="space-y-3 flex-1">
            {navItems.map(item => {
              const isActive = pathname === item.path;
              return (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className={`relative flex items-center px-3 py-2 text-sm font-medium rounded-r-lg transition-all duration-300 min-h-[40px] group overflow-hidden ${isActive ? 'bg-white bg-opacity-10 text-gold border-l-4 border-gold' : 'text-ivory hover:bg-white hover:bg-opacity-5 border-l-4 border-transparent hover:border-gold hover:border-opacity-50'}`}
                  onClick={() => setIsOpen(false)}
                >
                  {/* Subtle Shimmer Effect for Active Item */}
                  {isActive && <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-[shimmer_2s_infinite]"></div>}
                  
                  <span className={`mr-3 text-lg transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>{item.icon}</span>
                  <span className="font-heading text-sm tracking-wide">{item.name}</span>
                </Link>
              );
            })}
          </div>
          
          <div className="mt-auto pt-6 border-t border-gold border-opacity-30">
            <button 
              onClick={logout}
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg text-ivory hover:text-white hover:bg-red-900 hover:bg-opacity-40 transition-colors min-h-[40px]"
            >
              <span className="mr-3 text-lg"><FiLogOut /></span>
              <span className="font-heading text-sm tracking-wide">Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="flex items-center justify-between h-16 px-4 sm:px-6 bg-white shadow-sm lg:hidden border-b border-lightgold z-20 relative">
          <div className="flex items-center">
            <button onClick={toggleMenu} className="text-darkbrown hover:text-saffron focus:outline-none p-2 -ml-2 min-h-[44px]">
              <FiMenu className="h-6 w-6" />
            </button>
            <span className="ml-2 text-xl font-heading font-bold text-darkbrown">Admin Panel</span>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-10 relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
};
