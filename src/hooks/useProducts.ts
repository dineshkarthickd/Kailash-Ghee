// @ts-nocheck
import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));

    // Real-time listener — auto-updates when Firestore data changes
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
      setLoading(false);
    }, (error) => {
      console.error('Failed to load products', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // refetch is a no-op now since we use real-time listener
  const refetch = () => {};

  return { products, loading, refetch };
};
