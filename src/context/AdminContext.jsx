import { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    
    const adminEmails = import.meta.env.VITE_ADMIN_EMAIL?.split(',').map(e => e.trim()) || [];
    if (user && adminEmails.includes(user.email)) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    setAdminLoading(false);
  }, [user, authLoading]);

  return (
    <AdminContext.Provider value={{ isAdmin, adminLoading }}>
      {children}
    </AdminContext.Provider>
  );
};
