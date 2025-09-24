"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface ProductsContextType {
  products: Product[];
  categories: string[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  filterProductsByCategory: (category: string) => Product[];
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

// Sample data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'T-Shirt',
    price: 19.99,
    image: '/next.svg', // placeholder
    category: 'Clothing',
    description: 'Comfortable cotton t-shirt'
  },
  {
    id: '2',
    name: 'Jeans',
    price: 49.99,
    image: '/next.svg',
    category: 'Clothing',
    description: 'Classic blue jeans'
  },
  {
    id: '3',
    name: 'Sneakers',
    price: 79.99,
    image: '/next.svg',
    category: 'Shoes',
    description: 'Stylish running sneakers'
  },
  {
    id: '4',
    name: 'Watch',
    price: 129.99,
    image: '/next.svg',
    category: 'Accessories',
    description: 'Elegant wrist watch'
  }
];

const sampleCategories = ['All', 'Clothing', 'Shoes', 'Accessories'];

interface ProductsProviderProps {
  children: ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  const [products] = useState<Product[]>(sampleProducts);
  const [categories] = useState<string[]>(sampleCategories);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const filterProductsByCategory = (category: string) => {
    if (category === 'All') return products;
    return products.filter(product => product.category === category);
  };

  const value: ProductsContextType = {
    products,
    categories,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    filterProductsByCategory
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};