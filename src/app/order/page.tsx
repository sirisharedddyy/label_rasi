"use client";

import { useState } from 'react';
import { useOrders } from '../../contexts/OrdersContext';

export default function OrderPage() {
  const { addOrder } = useOrders();
  const [referenceImage, setReferenceImage] = useState<string>('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setReferenceImage(url);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const daysNeeded = parseInt(formData.get('daysNeeded') as string);

    addOrder({
      referenceImage,
      daysNeeded
    });

    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-600 mb-4">Custom Order Submitted!</h1>
          <p className="text-gray-600 mb-6">We'll contact you soon with details about your custom order.</p>
          <button
            onClick={() => {
              setOrderPlaced(false);
              setReferenceImage('');
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Submit Another Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Create Custom Order</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload reference image:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {referenceImage && (
                <img
                  src={referenceImage}
                  alt="Reference"
                  className="mt-4 w-full h-48 object-cover rounded"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of days needed:
              </label>
              <input
                type="number"
                min="1"
                name="daysNeeded"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              Submit Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
