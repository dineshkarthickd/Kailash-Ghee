import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import { FiShield, FiActivity, FiSettings } from 'react-icons/fi';
import { Reveal } from '../../components/common/Reveal';

export const AdminLogin = () => {
  const { user, isAdmin, loginWithGoogle, logout } = useAuth();

  if (isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-ivory flex flex-col md:flex-row font-body animate-fadeInUp">
      
      {/* Left Half - Branding Banner */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-saffron to-darkbrown text-white p-6 md:p-10 lg:p-12 flex flex-col justify-center relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        
        <div className="relative z-10 max-w-md mx-auto w-full">
          <Reveal>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold tracking-wide mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-lightgold">
              Kailash Ghee
            </h1>
            <p className="text-base md:text-lg text-cream opacity-90 mb-10 font-medium">
              The Taste of Pure Tradition
            </p>
          </Reveal>

          <div className="space-y-4 md:space-y-6">
            <Reveal delay={200}>
              <div className="flex items-center gap-3 text-cream">
                <div className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center border border-white border-opacity-20 shadow-inner">
                  <FiShield className="w-5 h-5" />
                </div>
                <div className="font-semibold text-sm md:text-base tracking-wide">Secure Admin Access</div>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="flex items-center gap-3 text-cream">
                <div className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center border border-white border-opacity-20 shadow-inner">
                  <FiActivity className="w-5 h-5" />
                </div>
                <div className="font-semibold text-sm md:text-base tracking-wide">Real-time Orders</div>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <div className="flex items-center gap-3 text-cream">
                <div className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center border border-white border-opacity-20 shadow-inner">
                  <FiSettings className="w-5 h-5" />
                </div>
                <div className="font-semibold text-sm md:text-base tracking-wide">Complete Control</div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Right Half - Login Card */}
      <div className="w-full md:w-1/2 bg-texture flex flex-col justify-center items-center p-6 relative">
        <Reveal delay={200} className="w-full max-w-md">
          <div className="card-premium p-8 text-center relative z-10 border-t-4 border-t-gold">
            
            <h2 className="text-xl md:text-2xl font-heading font-extrabold text-darkbrown mb-1">
              Welcome Back
            </h2>
            <h3 className="text-gold font-bold tracking-widest uppercase text-xs mb-4">
              Admin Portal
            </h3>
            
            <div className="w-12 h-1 bg-gradient-to-r from-saffron to-gold mx-auto rounded-full mb-8"></div>

            {user && !isAdmin ? (
              <div className="space-y-6">
                <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100 font-medium">
                  Access Denied. You do not have admin privileges.
                </div>
                <button 
                  onClick={logout}
                  className="btn-primary w-full"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <button 
                  onClick={loginWithGoogle}
                  className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-darkbrown font-bold py-3 px-5 text-sm rounded-xl hover:bg-gray-50 hover:border-gold transition-all shadow-[0_4px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.15)] hover:-translate-y-1"
                >
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                  Sign in with Google
                </button>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-cream">
              <p className="text-xs text-darkbrown opacity-60 font-medium flex items-center justify-center gap-2">
                <FiShield className="w-4 h-4" />
                Only authorized admins can access this portal
              </p>
            </div>
          </div>
        </Reveal>
      </div>
      
    </div>
  );
};
