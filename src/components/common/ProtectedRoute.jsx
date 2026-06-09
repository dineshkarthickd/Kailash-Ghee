import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Loader } from './Loader';

export const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading, isAdmin, adminLoading } = useAuth();
  const location = useLocation();

  if (loading || (requireAdmin && adminLoading)) {
    return <div className="min-h-screen flex items-center justify-center bg-cream"><Loader /></div>;
  }

  if (!user) {
    if (requireAdmin) {
      return <Navigate to="/admin" state={{ from: location }} replace />;
    }
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};
