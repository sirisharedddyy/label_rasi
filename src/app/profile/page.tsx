"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser, UserProfile } from '../../contexts/UserContext';

export default function ProfilePage() {
  const { profile, updateProfile, isProfileComplete } = useUser();
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    measurements: {
      height: 0,
      weight: 0,
      chest: 0,
      waist: 0,
      hips: 0,
      shoulder: 0,
      armLength: 0,
      inseam: 0
    }
  });
  const [activeTab, setActiveTab] = useState<'contact' | 'measurements'>('contact');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'measurements') {
        setFormData(prev => ({
          ...prev,
          measurements: {
            ...prev.measurements,
            [child]: parseFloat(value) || 0
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSaveMessage('Profile saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-amber-50 to-orange-50 shadow-lg border-b-4 border-amber-200 traditional-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-6">
              <div className="relative mandala-decoration">
                <img src="/logo.png" alt="Label Rasi Logo" className="h-20 drop-shadow-lg rounded-full border-4 border-amber-300" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-amber-800 font-serif">Label Rasi - My Profile</h1>
                <p className="text-sm text-amber-600 italic">Personal Sacred Measurements</p>
              </div>
            </div>
            <Link href="/" className="text-amber-700 hover:text-amber-800 font-medium transition-colors duration-300">
              🏠 Back to Home
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {saveMessage && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {saveMessage}
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'contact'
                  ? 'border-b-2 border-pink-600 text-pink-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Contact Information
            </button>
            <button
              onClick={() => setActiveTab('measurements')}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'measurements'
                  ? 'border-b-2 border-pink-600 text-pink-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Body Measurements
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold italic text-pink-600 mb-6">Contact Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Your country"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Your city"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ZIP/Postal Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="12345"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'measurements' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold italic text-pink-600 mb-6">Body Measurements (in cm)</h2>
                <p className="text-gray-600 mb-6">
                  Please provide accurate measurements for perfect fitting garments. All measurements are in centimeters.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm) *</label>
                    <input
                      type="number"
                      name="measurements.height"
                      value={formData.measurements.height || ''}
                      onChange={handleInputChange}
                      required
                      min="100"
                      max="250"
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="170.5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg) *</label>
                    <input
                      type="number"
                      name="measurements.weight"
                      value={formData.measurements.weight || ''}
                      onChange={handleInputChange}
                      required
                      min="30"
                      max="200"
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="65.5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Chest/Bust (cm) *</label>
                    <input
                      type="number"
                      name="measurements.chest"
                      value={formData.measurements.chest || ''}
                      onChange={handleInputChange}
                      required
                      min="60"
                      max="150"
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="90.5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Waist (cm) *</label>
                    <input
                      type="number"
                      name="measurements.waist"
                      value={formData.measurements.waist || ''}
                      onChange={handleInputChange}
                      required
                      min="50"
                      max="130"
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="75.0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hips (cm) *</label>
                    <input
                      type="number"
                      name="measurements.hips"
                      value={formData.measurements.hips || ''}
                      onChange={handleInputChange}
                      required
                      min="70"
                      max="150"
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="95.0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Shoulder Width (cm) *</label>
                    <input
                      type="number"
                      name="measurements.shoulder"
                      value={formData.measurements.shoulder || ''}
                      onChange={handleInputChange}
                      required
                      min="30"
                      max="60"
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="42.0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Arm Length (cm) *</label>
                    <input
                      type="number"
                      name="measurements.armLength"
                      value={formData.measurements.armLength || ''}
                      onChange={handleInputChange}
                      required
                      min="40"
                      max="80"
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="60.0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Inseam (cm) *</label>
                    <input
                      type="number"
                      name="measurements.inseam"
                      value={formData.measurements.inseam || ''}
                      onChange={handleInputChange}
                      required
                      min="60"
                      max="100"
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="78.0"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {isProfileComplete() ? (
                  <span className="text-green-600 font-medium">✓ Profile Complete</span>
                ) : (
                  <span className="text-orange-600">⚠ Please fill all required fields</span>
                )}
              </div>
              <button
                type="submit"
                className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 shadow-lg transition-colors font-medium"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}