"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useOrders } from '../../contexts/OrdersContext';
import { useUser } from '../../contexts/UserContext';

export default function OrderPage() {
  const { addCustomOrder } = useOrders();
  const { profile } = useUser();
  const [referenceImage, setReferenceImage] = useState<string>('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [measurements, setMeasurements] = useState({
    height: 0,
    weight: 0,
    chest: 0,
    waist: 0,
    hips: 0
  });

  useEffect(() => {
    if (profile?.measurements) {
      setMeasurements({
        height: profile.measurements.height,
        weight: profile.measurements.weight,
        chest: profile.measurements.chest,
        waist: profile.measurements.waist,
        hips: profile.measurements.hips
      });
    }
  }, [profile]);

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

    addCustomOrder({
      referenceImage,
      daysNeeded,
      measurements: measurements
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
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Label Rasi Logo" className="h-16 mx-auto mb-6 drop-shadow-lg" />
        </div>
        <h1 className="text-4xl font-bold italic text-center mb-8 text-pink-600">Label Rasi - Create Custom Order</h1>
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
            {profile && (
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-6">
                <p className="text-pink-800 font-medium mb-2">📏 Measurements loaded from your profile:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-pink-700">
                  <span>Height: {measurements.height}cm</span>
                  <span>Chest: {measurements.chest}cm</span>
                  <span>Waist: {measurements.waist}cm</span>
                  <span>Hips: {measurements.hips}cm</span>
                  <span>Weight: {measurements.weight}kg</span>
                </div>
                <p className="text-xs text-pink-600 mt-2">
                  <Link href="/profile" className="underline hover:text-pink-800">Update measurements in profile</Link>
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-4 rounded-lg hover:bg-pink-700 font-medium shadow-lg transition-colors text-lg"
            >
              Submit Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
