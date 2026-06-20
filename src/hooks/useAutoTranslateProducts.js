import { useEffect, useRef } from 'react';
import { translateToTamil } from '../utils/translateToTamil';
import { updateProduct } from '../firebase/products';

/**
 * Silently auto-translates products missing Tamil names/descriptions.
 * Saves the translations back to Firestore so it only runs once per product.
 * Uses localStorage to avoid re-running on every page load.
 */
export const useAutoTranslateProducts = (products) => {
  const isRunning = useRef(false);

  useEffect(() => {
    if (!products || products.length === 0 || isRunning.current) return;

    const missing = products.filter(p => !p.nameTA);
    if (missing.length === 0) return;

    // Check localStorage to avoid re-translating on every mount
    const alreadyQueued = localStorage.getItem('kailash_auto_translate_done');
    if (alreadyQueued === 'true' && missing.length === 0) return;

    isRunning.current = true;

    const translateAll = async () => {
      try {
        for (const product of missing) {
          const nameTA = await translateToTamil(product.name);
          const descriptionTA = product.description
            ? await translateToTamil(product.description)
            : '';
          await updateProduct(product.id, {
            nameTA,
            descriptionTA,
          });
          // Small delay to be kind to the free API
          await new Promise(r => setTimeout(r, 300));
        }
        localStorage.setItem('kailash_auto_translate_done', 'true');
      } catch (err) {
        console.warn('Auto-translation partial failure:', err);
      } finally {
        isRunning.current = false;
      }
    };

    translateAll();
  }, [products]);
};
