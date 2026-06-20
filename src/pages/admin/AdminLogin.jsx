import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FiShield, FiActivity, FiSettings } from 'react-icons/fi';
import { BotanicalDecoration } from '../../components/common/BotanicalDecoration';

export const AdminLogin = () => {
  const { user, isAdmin, loginWithGoogle, logout } = useAuth();

  if (isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="w-full min-h-screen bg-transparent flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Decor */}
      <BotanicalDecoration position="left" className="scale-125 -translate-y-10" />
      <BotanicalDecoration position="right" className="scale-125 translate-y-10" />
      <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -z-10"></div>
      
      <div className="w-full max-w-5xl bg-white/20 backdrop-blur-xl border-[1px] border-primary/20 flex flex-col md:flex-row overflow-hidden shadow-2xl">
        
        {/* Left Half - Branding */}
        <div className="w-full md:w-1/2 p-12 lg:p-16 flex flex-col justify-between border-b-[1px] md:border-b-0 md:border-r-[1px] border-primary/20 bg-primary/5">
          <div>
            <h1 className="font-heading text-4xl text-primary font-normal tracking-widest uppercase mb-2">
              Kailash Ghee
            </h1>
            <p className="font-sans text-primary/70 italic text-lg mb-12">
              The Taste of Pure Tradition
            </p>

            <div className="flex flex-col gap-6 font-sans text-primary/80">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border-[1px] border-primary/20 flex items-center justify-center bg-white/50">
                  <FiShield className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="font-medium tracking-wide">Secure Admin Access</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border-[1px] border-primary/20 flex items-center justify-center bg-white/50">
                  <FiActivity className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="font-medium tracking-wide">Real-time Orders</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border-[1px] border-primary/20 flex items-center justify-center bg-white/50">
                  <FiSettings className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="font-medium tracking-wide">Complete Control</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Half - Login Card */}
        <div className="w-full md:w-1/2 p-12 lg:p-16 flex flex-col justify-center items-center text-center bg-white/40">
          
          <h2 className="font-heading text-3xl text-primary mb-2">
            Welcome Back
          </h2>
          <h3 className="font-sans text-primary/60 uppercase tracking-widest text-sm mb-12 border-b-[1px] border-primary/20 pb-4 w-full">
            Admin Portal
          </h3>

          {user && !isAdmin ? (
            <div className="w-full flex flex-col items-center">
              <div className="bg-red-500/10 border-[1px] border-red-500/30 text-red-600 px-6 py-4 rounded mb-6 font-sans text-sm">
                Access Denied. You do not have admin privileges.
              </div>
              <button 
                onClick={logout}
                className="text-primary border-b-[1px] border-primary pb-1 hover:text-primary/70 font-sans text-sm tracking-wide transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <button 
                onClick={loginWithGoogle}
                className="flex items-center gap-4 bg-white border-[1px] border-primary/20 px-8 py-4 shadow-sm hover:shadow-md hover:border-primary/40 transition-all font-sans text-primary font-medium tracking-wide"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
                Sign in with Google
              </button>
            </div>
          )}

          <div className="mt-16 text-primary/40 text-xs font-sans">
            <p className="flex items-center justify-center gap-2">
              <FiShield className="w-3 h-3" />
              Only authorized admins can access this portal
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
};
