"use client";

import Link from 'next/link';
import { useProducts } from '../contexts/ProductsContext';
import { useOrders } from '../contexts/OrdersContext';

export default function Home() {
  const { getCartItemCount } = useProducts();
  const { orders } = useOrders();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">E-Commerce Dashboard</h1>
            <div className="flex space-x-4">
              <Link href="/cart" className="relative">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Cart ({getCartItemCount()})
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Our Store</h2>
          <p className="text-xl text-gray-600">Shop our products or create custom orders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link href="/products" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-4">🛍️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Shop Products</h3>
              <p className="text-gray-600">Browse our catalog of products</p>
            </div>
          </Link>

          <Link href="/cart" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-4">🛒</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Shopping Cart</h3>
              <p className="text-gray-600">{getCartItemCount()} items in cart</p>
            </div>
          </Link>

          <Link href="/order" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-4">✂️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Custom Order</h3>
              <p className="text-gray-600">Create bespoke items</p>
            </div>
          </Link>

          <Link href="/my-orders" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">My Orders</h3>
              <p className="text-gray-600">{orders.length} custom orders</p>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sample featured products - you can replace with actual data */}
            <div className="text-center">
              <img src="/next.svg" alt="Product" className="w-full h-48 object-cover rounded mb-4" />
              <h4 className="text-lg font-semibold">T-Shirt</h4>
              <p className="text-gray-600">$19.99</p>
            </div>
            <div className="text-center">
              <img src="/next.svg" alt="Product" className="w-full h-48 object-cover rounded mb-4" />
              <h4 className="text-lg font-semibold">Jeans</h4>
              <p className="text-gray-600">$49.99</p>
            </div>
            <div className="text-center">
              <img src="/next.svg" alt="Product" className="w-full h-48 object-cover rounded mb-4" />
              <h4 className="text-lg font-semibold">Sneakers</h4>
              <p className="text-gray-600">$79.99</p>
            </div>
          </div>
          <div className="text-center mt-6">
            <Link href="/products" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
              View All Products
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
