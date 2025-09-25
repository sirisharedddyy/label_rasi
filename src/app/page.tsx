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
          <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-6">
                <img src="/logo.png" alt="Label Rasi Logo" className="h-16 drop-shadow-lg" />
                <h1 className="text-4xl font-bold italic text-pink-600">Label Rasi</h1>
              </div>
              <div className="flex space-x-4">
                <Link href="/cart" className="relative">
                  <button className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 shadow-lg transition-colors">
                    Cart ({getCartItemCount()})
                  </button>
                </Link>
              </div>
            </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="mb-12">
            <img src="/logo.png" alt="Label Rasi Logo" className="h-32 mx-auto mb-8 drop-shadow-2xl rounded-lg" />
          </div>
          <h2 className="text-5xl font-bold italic text-pink-600 mb-8 leading-tight text-center">
            From Your Inspiration to Your Wardrobe – Every Fit Crafted with Love and Passion
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto text-center">
            Welcome to Label Rasi! Share your ideas, upload your reference, and we'll create personalized fits made just for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-16">
          <Link href="/products" className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-pink-200 transform hover:-translate-y-3 hover:scale-105">
              <div className="text-center">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🛍️</div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors duration-300 mb-3">Shop Products</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Browse our catalog of products</p>
              </div>
            </div>
          </Link>

          <Link href="/cart" className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-pink-200 transform hover:-translate-y-3 hover:scale-105">
              <div className="text-center">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🛒</div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors duration-300 mb-3">Shopping Cart</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{getCartItemCount()} items in cart</p>
              </div>
            </div>
          </Link>

          <Link href="/order" className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-pink-200 transform hover:-translate-y-3 hover:scale-105">
              <div className="text-center">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">✂️</div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors duration-300 mb-3">Custom Order</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Create bespoke items</p>
              </div>
            </div>
          </Link>

          <Link href="/my-orders" className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-pink-200 transform hover:-translate-y-3 hover:scale-105">
              <div className="text-center">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">📋</div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors duration-300 mb-3">My Orders</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{orders.length} total orders</p>
              </div>
            </div>
          </Link>

          <Link href="/profile" className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-pink-200 transform hover:-translate-y-3 hover:scale-105">
              <div className="text-center">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">👤</div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors duration-300 mb-3">My Profile</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Manage your information</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
          <h3 className="text-3xl font-bold italic text-pink-600 mb-8 text-center">Featured Lehenga Collection</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sample featured products - you can replace with actual data */}
            <div className="group">
              <div className="bg-gradient-to-br from-pink-50 to-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-pink-100 hover:border-pink-200 transform hover:-translate-y-1">
                <div className="text-center">
                  <img src="/next.svg" alt="Bridal Lehenga" className="w-full h-48 object-cover rounded-lg mb-4 shadow-md" />
                  <h4 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors duration-300">Bridal Lehenga</h4>
                  <p className="text-gray-600 mb-2">Stunning traditional bridal wear</p>
                  <p className="text-2xl font-bold text-pink-600">$899.99</p>
                </div>
              </div>
            </div>
            <div className="group">
              <div className="bg-gradient-to-br from-pink-50 to-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-pink-100 hover:border-pink-200 transform hover:-translate-y-1">
                <div className="text-center">
                  <img src="/next.svg" alt="Party Lehenga" className="w-full h-48 object-cover rounded-lg mb-4 shadow-md" />
                  <h4 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors duration-300">Party Lehenga</h4>
                  <p className="text-gray-600 mb-2">Elegant celebration attire</p>
                  <p className="text-2xl font-bold text-pink-600">$599.99</p>
                </div>
              </div>
            </div>
            <div className="group">
              <div className="bg-gradient-to-br from-pink-50 to-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-pink-100 hover:border-pink-200 transform hover:-translate-y-1">
                <div className="text-center">
                  <img src="/next.svg" alt="Designer Lehenga" className="w-full h-48 object-cover rounded-lg mb-4 shadow-md" />
                  <h4 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors duration-300">Designer Lehenga</h4>
                  <p className="text-gray-600 mb-2">Contemporary fusion designs</p>
                  <p className="text-2xl font-bold text-pink-600">$749.99</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link href="/products" className="inline-block bg-pink-600 text-white px-10 py-4 rounded-xl hover:bg-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 font-bold text-lg transform hover:scale-105">
              Explore All Lehengas
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
