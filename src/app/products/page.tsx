"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useProducts } from '../../contexts/ProductsContext';

export default function ProductsPage() {
  const { products, categories, addToCart, getCartItemCount } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with cart count */}
      <header className="bg-white shadow-lg border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-6">
              <img src="/logo.png" alt="Label Rasi Logo" className="h-20 drop-shadow-lg" />
              <h1 className="text-4xl font-bold italic text-pink-600">Label Rasi - Products</h1>
            </div>
            <Link href="/cart" className="relative">
              <button className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 shadow-lg transition-colors">
                Cart ({getCartItemCount()})
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 pr-8">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category}>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded ${
                      selectedCategory === category
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-pink-100 hover:shadow-xl transition-all duration-300">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-pink-600 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                    <p className="text-pink-500 text-sm mb-3 font-medium">{product.category}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-pink-600">${product.price}</span>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 shadow-lg transition-colors font-medium"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <p className="text-center text-gray-500 mt-8">No products found in this category.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}