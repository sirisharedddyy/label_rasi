"use client";

import Link from 'next/link';
import { useProducts } from '../../contexts/ProductsContext';

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, getCartTotal } = useProducts();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <Link href="/products" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
            <Link href="/products" className="text-blue-600 hover:text-blue-800">
              Continue Shopping
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Cart Items</h2>
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.product.id} className="flex items-center border-b pb-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{item.product.name}</h3>
                    <p className="text-gray-600">${item.product.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 border rounded">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-lg font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t pt-6">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="mt-6 text-right">
                <Link href="/checkout">
                  <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 text-lg font-medium">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}