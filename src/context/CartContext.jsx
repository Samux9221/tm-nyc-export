import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // 1. Estado do Carrinho (Carrega do localStorage se existir)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('@MyStore:cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. Estado Visual (Carrinho aberto ou fechado)
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 3. Salva no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('@MyStore:cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // FUNÇÕES DO CARRINHO
  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const itemExists = prev.find(item => item.id === product.id);
      
      if (itemExists) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true); // Abre o carrinho automaticamente ao adicionar
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, amount) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: Math.max(1, item.quantity + amount) };
      }
      return item;
    }));
  };

  const clearCart = () => setCartItems([]);

  // Cálculos Automáticos
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      cartTotal,
      cartCount,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado para usar o carrinho fácil
export function useCart() {
  return useContext(CartContext);
}