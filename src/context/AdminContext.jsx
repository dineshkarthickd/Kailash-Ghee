import { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { getSettings } from '../firebase/settings';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setIsAdmin(false);
      setAdminLoading(false);
      return;
    }

    const checkAdmin = async () => {
      try {
        // 1. Try Firestore settings first (dynamic, manageable from UI)
        const settings = await getSettings();
        let adminEmails = settings?.adminEmails || [];

        // 2. Fallback to .env if Firestore has no list yet
        if (adminEmails.length === 0) {
          adminEmails = import.meta.env.VITE_ADMIN_EMAIL
            ?.split(',').map(e => e.trim()) || [];
        }

        setIsAdmin(adminEmails.includes(user.email));
      } catch (err) {
        // If Firestore fails, fall back gracefully to .env
        console.warn('AdminContext: could not fetch settings, falling back to .env', err);
        const adminEmails = import.meta.env.VITE_ADMIN_EMAIL
          ?.split(',').map(e => e.trim()) || [];
        setIsAdmin(adminEmails.includes(user.email));
      } finally {
        setAdminLoading(false);
      }
    };

    checkAdmin();
  }, [user, authLoading]);

  return (
    <AdminContext.Provider value={{ isAdmin, adminLoading }}>
      {children}
    </AdminContext.Provider>
  );
};
