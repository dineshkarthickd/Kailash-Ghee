// @ts-nocheck
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiBox, FiShoppingBag, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { BotanicalDecoration } from '../common/BotanicalDecoration';

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
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" 
          onClick={toggleMenu}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-background/80 backdrop-blur-xl border-r-[1px] border-primary/10 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } lg:relative lg:translate-x-0`}
      >
        <div className="p-8 border-b-[1px] border-primary/10 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-heading text-2xl tracking-widest text-primary uppercase">
              Kailash <span className="opacity-70">Ghee</span>
            </span>
            <span className="font-sans text-[10px] uppercase tracking-widest text-primary/50 mt-1">Admin Portal</span>
          </div>
          <button onClick={toggleMenu} className="lg:hidden text-primary hover:bg-primary/5 p-2 rounded-full transition-colors">
            <FiX className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 flex flex-col justify-between overflow-y-auto py-6">
          <div className="px-4 space-y-1">
            {navItems.map(item => {
              const isActive = pathname === item.path;
              return (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className={`flex items-center gap-4 px-6 py-4 rounded-xl font-sans text-[13px] uppercase tracking-widest transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary/5 text-primary border-[1px] border-primary/20 shadow-sm' 
                      : 'text-primary/60 hover:bg-primary/5 hover:text-primary border-[1px] border-transparent'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className={`${isActive ? 'text-primary' : 'text-primary/50'}`}>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
          
          <div className="px-4 mt-8">
            <button 
              onClick={logout}
              className="w-full flex items-center gap-4 px-6 py-4 rounded-xl font-sans text-[13px] uppercase tracking-widest text-red-800/70 hover:bg-red-50 hover:text-red-800 border-[1px] border-transparent hover:border-red-100 transition-all duration-300"
            >
              <span><FiLogOut /></span>
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">
        <BotanicalDecoration position="top-right" className="scale-125 -translate-y-24 opacity-5 pointer-events-none" />
        <BotanicalDecoration position="bottom-left" className="scale-150 translate-y-32 opacity-5 pointer-events-none" />
        
        <header className="lg:hidden bg-background/80 backdrop-blur-md border-b-[1px] border-primary/10 sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={toggleMenu} className="text-primary p-2 -ml-2 rounded-full hover:bg-primary/5 transition-colors">
                <FiMenu className="w-6 h-6 stroke-[1.5]" />
              </button>
              <span className="font-heading text-xl text-primary">Admin Portal</span>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-transparent relative z-10">
          <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
