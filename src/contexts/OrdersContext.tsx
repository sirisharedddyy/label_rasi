"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CustomOrder {
  id: string;
  referenceImage: string; // URL from File
  daysNeeded: number;
  measurements?: {
    height?: number;
    weight?: number;
    chest?: number;
    waist?: number;
    hips?: number;
  };
  status: 'pending' | 'processing' | 'completed';
  createdAt: Date;
}

interface OrdersContextType {
  orders: CustomOrder[];
  addOrder: (order: Omit<CustomOrder, 'id' | 'status' | 'createdAt'>) => void;
  updateOrderStatus: (orderId: string, status: CustomOrder['status']) => void;
  deleteOrder: (orderId: string) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};

interface OrdersProviderProps {
  children: ReactNode;
}

export const OrdersProvider: React.FC<OrdersProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<CustomOrder[]>([]);

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('customOrders');
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders).map((order: any) => ({
        ...order,
        createdAt: new Date(order.createdAt)
      }));
      setOrders(parsedOrders);
    }
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('customOrders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderData: Omit<CustomOrder, 'id' | 'status' | 'createdAt'>) => {
    const newOrder: CustomOrder = {
      ...orderData,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date()
    };
    setOrders(prevOrders => [...prevOrders, newOrder]);
  };

  const updateOrderStatus = (orderId: string, status: CustomOrder['status']) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
  };

  const value: OrdersContextType = {
    orders,
    addOrder,
    updateOrderStatus,
    deleteOrder
  };

  return (
    <OrdersContext.Provider value={value}>
      {children}
    </OrdersContext.Provider>
  );
};