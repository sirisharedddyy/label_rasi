"use client";

import Link from 'next/link';
import { useProducts } from '../contexts/ProductsContext';
import { useOrders } from '../contexts/OrdersContext';

export default function Home() {
  const { getCartItemCount } = useProducts();
  const { orders } = useOrders();

  return (
    <div className="min-h-screen indian-pattern-bg">
      <header className="bg-gradient-to-r from-amber-50 to-orange-50 shadow-lg border-b-4 border-amber-200 traditional-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-6">
                <div className="relative mandala-decoration">
                  <img src="/logo.png" alt="Label Rasi Logo" className="h-20 drop-shadow-lg rounded-full border-4 border-amber-300" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-amber-800 font-serif">Label Rasi</h1>
                  <p className="text-sm text-amber-600 italic">Traditional Indian Couture</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <Link href="/cart" className="relative">
                  <button className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-amber-700 hover:to-orange-700 shadow-lg transition-all duration-300 transform hover:scale-105">
                    🛒 Cart ({getCartItemCount()})
                  </button>
                </Link>
              </div>
            </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="text-9xl">🕉️</div>
          </div>
          <div className="mb-12 relative z-10">
            <img src="/logo.png" alt="Label Rasi Logo" className="h-32 mx-auto mb-8 drop-shadow-2xl rounded-full border-4 border-amber-300" />
          </div>
          <h2 className="text-5xl font-bold text-amber-800 mb-8 leading-tight text-center font-serif">
            "नमस्ते" Welcome to Label Rasi
          </h2>
          <h3 className="text-3xl font-bold italic text-amber-700 mb-6">
            Traditional Indian Couture & Custom Tailoring
          </h3>
          <p className="text-xl text-amber-900 leading-relaxed max-w-4xl mx-auto text-center bg-amber-50 p-6 rounded-lg border-2 border-amber-200">
            "वस्ट्रं देवरूपम्" - Clothing is divine. Experience the artistry of traditional Indian craftsmanship.
            From bridal lehengas to festive wear, we bring your cultural dreams to life with precision and elegance.
          </p>
          <div className="mt-8 flex justify-center space-x-4 text-2xl">
            <span>🪔</span>
            <span>🕉️</span>
            <span>🪔</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-16">
          <Link href="/products" className="group">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 border-2 border-amber-200 hover:border-amber-400 transform hover:-translate-y-3 hover:scale-105 traditional-border">
              <div className="text-center">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🪔</div>
                <h3 className="text-xl font-bold text-amber-900 group-hover:text-amber-800 transition-colors duration-300 mb-3 font-serif">Our Collection</h3>
                <p className="text-amber-700 group-hover:text-amber-800 transition-colors duration-300">Traditional lehenga designs</p>
              </div>
            </div>
          </Link>

          <Link href="/cart" className="group">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 border-2 border-amber-200 hover:border-amber-400 transform hover:-translate-y-3 hover:scale-105 traditional-border">
              <div className="text-center">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🛒</div>
                <h3 className="text-xl font-bold text-amber-900 group-hover:text-amber-800 transition-colors duration-300 mb-3 font-serif">Shopping Cart</h3>
                <p className="text-amber-700 group-hover:text-amber-800 transition-colors duration-300">{getCartItemCount()} items selected</p>
              </div>
            </div>
          </Link>

          <Link href="/order" className="group">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 border-2 border-amber-200 hover:border-amber-400 transform hover:-translate-y-3 hover:scale-105 traditional-border">
              <div className="text-center">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🕉️</div>
                <h3 className="text-xl font-bold text-amber-900 group-hover:text-amber-800 transition-colors duration-300 mb-3 font-serif">Custom Order</h3>
                <p className="text-amber-700 group-hover:text-amber-800 transition-colors duration-300">Bespoke tailoring service</p>
              </div>
            </div>
          </Link>

          <Link href="/my-orders" className="group">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 border-2 border-amber-200 hover:border-amber-400 transform hover:-translate-y-3 hover:scale-105 traditional-border">
              <div className="text-center">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">📜</div>
                <h3 className="text-xl font-bold text-amber-900 group-hover:text-amber-800 transition-colors duration-300 mb-3 font-serif">My Orders</h3>
                <p className="text-amber-700 group-hover:text-amber-800 transition-colors duration-300">{orders.length} sacred commissions</p>
              </div>
            </div>
          </Link>

          <Link href="/profile" className="group">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 border-2 border-amber-200 hover:border-amber-400 transform hover:-translate-y-3 hover:scale-105 traditional-border">
              <div className="text-center">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">👤</div>
                <h3 className="text-xl font-bold text-amber-900 group-hover:text-amber-800 transition-colors duration-300 mb-3 font-serif">My Profile</h3>
                <p className="text-amber-700 group-hover:text-amber-800 transition-colors duration-300">Personal measurements</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 rounded-2xl shadow-xl p-10 border-4 border-amber-200 traditional-border">
          <div className="text-center mb-8">
            <h3 className="text-4xl font-bold text-amber-800 mb-4 font-serif">Divine Lehenga Collection</h3>
            <p className="text-amber-700 italic">"परिधानं भूषणादपि गरीयः" - Attire is dearer than ornaments</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sample featured products - you can replace with actual data */}
            <div className="group">
              <div className="bg-gradient-to-br from-red-50 to-maroon-50 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-red-200 hover:border-red-400 transform hover:-translate-y-2 mandala-decoration">
                <div className="text-center">
                  <div className="text-4xl mb-4">🪔</div>
                  <h4 className="text-xl font-bold text-red-900 group-hover:text-red-800 transition-colors duration-300 font-serif">Bridal Lehenga</h4>
                  <p className="text-red-700 mb-3">Divine bridal splendor</p>
                  <p className="text-3xl font-bold text-red-600">₹89,999</p>
                </div>
              </div>
            </div>
            <div className="group">
              <div className="bg-gradient-to-br from-amber-50 to-gold-50 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-amber-200 hover:border-amber-400 transform hover:-translate-y-2 mandala-decoration">
                <div className="text-center">
                  <div className="text-4xl mb-4">🕉️</div>
                  <h4 className="text-xl font-bold text-amber-900 group-hover:text-amber-800 transition-colors duration-300 font-serif">Festive Lehenga</h4>
                  <p className="text-amber-700 mb-3">Celebration elegance</p>
                  <p className="text-3xl font-bold text-amber-600">₹59,999</p>
                </div>
              </div>
            </div>
            <div className="group">
              <div className="bg-gradient-to-br from-maroon-50 to-red-50 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-maroon-200 hover:border-maroon-400 transform hover:-translate-y-2 mandala-decoration">
                <div className="text-center">
                  <div className="text-4xl mb-4">🪔</div>
                  <h4 className="text-xl font-bold text-maroon-900 group-hover:text-maroon-800 transition-colors duration-300 font-serif">Designer Lehenga</h4>
                  <p className="text-maroon-700 mb-3">Contemporary fusion</p>
                  <p className="text-3xl font-bold text-maroon-600">₹74,999</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link href="/products" className="inline-block bg-gradient-to-r from-amber-600 to-red-600 text-white px-12 py-5 rounded-xl hover:from-amber-700 hover:to-red-700 shadow-lg hover:shadow-2xl transition-all duration-500 font-bold text-lg transform hover:scale-105 border-2 border-amber-300">
              🪔 Explore Divine Collection 🪔
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
