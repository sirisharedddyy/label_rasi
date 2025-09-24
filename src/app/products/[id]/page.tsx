"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useProducts } from '../../../contexts/ProductsContext';

export default function ProductDetailPage() {
  const params = useParams();
  const { products, addToCart, getCartItemCount } = useProducts();
  const productId = params.id as string;

  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/products" className="text-blue-600 hover:text-blue-800">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/products" className="text-blue-600 hover:text-blue-800">
              ← Back to Products
            </Link>
            <Link href="/cart" className="relative">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Cart ({getCartItemCount()})
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 text-lg font-medium"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}