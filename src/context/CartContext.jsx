import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('kailash_ghee_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('kailash_ghee_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, variant, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.productId === product.id && item.variant.size === variant.size);
      if (existing) {
        return prev.map(item => 
          item.productId === product.id && item.variant.size === variant.size
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [...prev, {
        productId: product.id,
        name: product.name,
        nameTA: product.nameTA,
        imageURL: product.imageURL,
        variant,
        qty,
        price: variant.price
      }];
    });
  };

  const removeFromCart = (productId, variantSize) => {
    setCartItems(prev => prev.filter(item => !(item.productId === productId && item.variant.size === variantSize)));
  };

  const updateQuantity = (productId, variantSize, qty) => {
    if (qty < 1) return;
    setCartItems(prev => prev.map(item => 
      item.productId === productId && item.variant.size === variantSize
        ? { ...item, qty }
        : item
    ));
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
