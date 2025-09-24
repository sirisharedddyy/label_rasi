"use client";

import Link from 'next/link';
import { useOrders } from '../../contexts/OrdersContext';

export default function MyOrdersPage() {
  const { orders, deleteOrder } = useOrders();

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">My Orders</h1>
          <p className="text-gray-600 mb-6">You haven't placed any custom orders yet.</p>
          <Link href="/order" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
            Create Custom Order
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-lg border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <img src="/logo.png" alt="Label Rasi Logo" className="h-12" />
              <h1 className="text-4xl font-bold italic text-pink-600">Label Rasi - My Orders</h1>
            </div>
            <Link href="/order" className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 shadow-lg transition-colors">
              New Custom Order
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-xl shadow-lg p-6 border border-pink-100">
              {order.type === 'custom' ? (
                <div className="flex flex-col md:flex-row md:items-center">
                  <img
                    src={order.referenceImage}
                    alt="Reference"
                    className="w-full md:w-48 h-48 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-pink-600">Custom Order #{order.id}</h3>
                        <p className="text-gray-600">Days needed: {order.daysNeeded}</p>
                        <p className="text-sm text-gray-500">
                          Created: {order.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'processing'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    {order.measurements && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Measurements:</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                          {order.measurements.height && <p>Height: {order.measurements.height}cm</p>}
                          {order.measurements.weight && <p>Weight: {order.measurements.weight}kg</p>}
                          {order.measurements.chest && <p>Chest: {order.measurements.chest}cm</p>}
                          {order.measurements.waist && <p>Waist: {order.measurements.waist}cm</p>}
                          {order.measurements.hips && <p>Hips: {order.measurements.hips}cm</p>}
                        </div>
                      </div>
                    )}
                    <div className="flex justify-end">
                      <button
                        onClick={() => deleteOrder(order.id)}
                        className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 shadow-lg transition-colors"
                      >
                        Delete Order
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-pink-600">Regular Order #{order.id}</h3>
                      <p className="text-gray-600">Total: ${order.total.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">
                        Created: {order.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'processing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : order.status === 'shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Items Ordered:</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-12 h-12 object-cover rounded mr-3"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{item.product.name}</p>
                              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="font-semibold text-pink-600">${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Shipping Address:</h4>
                    <p className="text-sm text-gray-600">
                      {order.shippingInfo.name}<br />
                      {order.shippingInfo.address}<br />
                      {order.shippingInfo.city}, {order.shippingInfo.zipCode}<br />
                      {order.shippingInfo.country}
                    </p>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 shadow-lg transition-colors"
                    >
                      Delete Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}