// @ts-nocheck
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AdminContext } from '../context/AdminContext';

export const useAuth = () => {
  const authCtx = useContext(AuthContext);
  const adminCtx = useContext(AdminContext);
  return { ...authCtx, ...adminCtx };
};
