"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type OrderStatus = 'pending' | 'processing' | 'completed' | 'shipped';

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
  status: OrderStatus;
  createdAt: Date;
  type: 'custom';
}

export interface RegularOrder {
  id: string;
  items: Array<{
    product: {
      id: string;
      name: string;
      price: number;
      image: string;
    };
    quantity: number;
  }>;
  total: number;
  shippingInfo: {
    name: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
  status: OrderStatus;
  createdAt: Date;
  type: 'regular';
}

export type Order = CustomOrder | RegularOrder;

interface OrdersContextType {
  orders: Order[];
  addCustomOrder: (order: Omit<CustomOrder, 'id' | 'status' | 'createdAt' | 'type'>) => void;
  addRegularOrder: (order: Omit<RegularOrder, 'id' | 'status' | 'createdAt' | 'type'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
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
  const [orders, setOrders] = useState<Order[]>([]);

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('allOrders');
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
    localStorage.setItem('allOrders', JSON.stringify(orders));
  }, [orders]);

  const addCustomOrder = (orderData: Omit<CustomOrder, 'id' | 'status' | 'createdAt' | 'type'>) => {
    const newOrder: CustomOrder = {
      ...orderData,
      type: 'custom',
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date()
    };
    setOrders(prevOrders => [...prevOrders, newOrder]);
  };

  const addRegularOrder = (orderData: Omit<RegularOrder, 'id' | 'status' | 'createdAt' | 'type'>) => {
    const newOrder: RegularOrder = {
      ...orderData,
      type: 'regular',
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date()
    };
    setOrders(prevOrders => [...prevOrders, newOrder]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
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
    addCustomOrder,
    addRegularOrder,
    updateOrderStatus,
    deleteOrder
  };

  return (
    <OrdersContext.Provider value={value}>
      {children}
    </OrdersContext.Provider>
  );
};