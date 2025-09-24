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
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
            <Link href="/order" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              New Order
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row md:items-center">
                <img
                  src={order.referenceImage}
                  alt="Reference"
                  className="w-full md:w-48 h-48 object-cover rounded mb-4 md:mb-0 md:mr-6"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Custom Order #{order.id}</h3>
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
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Delete Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}