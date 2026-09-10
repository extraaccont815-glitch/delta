'use client';

import { useState } from 'react';

export default function OrganiserDashboard() {
  const [activeTab, setActiveTab] = useState('marketplace');

  // Marketplace Listings Data (INR)
  const availableVenues = [
    { id: 1, name: 'Grand Downtown Hall', capacity: '250 Guests', rate: '₹12,500/hr', location: 'Central District', rating: '4.9 ★' },
    { id: 2, name: 'Skyline Terrace & Garden', capacity: '120 Guests', rate: '₹8,000/hr', location: 'North City', rating: '4.7 ★' },
  ];

  const availableSuppliers = [
    { id: 101, name: 'ProSound & Stage Lighting', category: 'Audio/Visual', price: '₹25,000/day', rating: '4.8 ★' },
    { id: 102, name: 'Apex Gourmet Catering', category: 'Food & Beverage', price: '₹850/plate', rating: '4.9 ★' },
  ];

  // Organiser's Current Bookings & Payment Summary
  const currentEvent = {
    title: 'Annual Pride Gala 2026',
    date: 'Oct 12, 2026',
    venue: 'Grand Downtown Hall (4 Hours)',
    venueCost: 50000,
    supplier: 'ProSound & Stage Lighting',
    supplierCost: 25000,
    platformFeeRate: 0.10, // 10% Platform Commission
  };

  const totalServicesCost = currentEvent.venueCost + currentEvent.supplierCost;
  const platformFee = totalServicesCost * currentEvent.platformFeeRate;
  const totalPayable = totalServicesCost + platformFee;

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">🎤 Organiser Marketplace & Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">
              Find venues, hire suppliers, and manage payments for your event.
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-all">
            + Plan New Event
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 gap-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === 'marketplace'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            🔍 Explore Marketplace
          </button>
          <button
            onClick={() => setActiveTab('my-event')}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === 'my-event'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            📋 My Event Cart & Checkout
          </button>
        </div>

        {/* MARKETPLACE TAB */}
        {activeTab === 'marketplace' && (
          <div className="space-y-8">
            
            {/* Search Venues Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-slate-900">1. Select a Venue</h2>
                <span className="text-xs text-slate-500">2 spaces available near you</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableVenues.map((v) => (
                  <div key={v.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900">{v.name}</h3>
                        <span className="text-xs text-amber-600 font-semibold">{v.rating}</span>
                      </div>
                      <p className="text-xs text-slate-500">{v.location} • {v.capacity}</p>
                      <p className="text-sm font-bold text-emerald-600 pt-1">{v.rate}</p>
                    </div>
                    <button className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-all">
                      Book Space
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Suppliers Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-slate-900">2. Hire Event Suppliers</h2>
                <span className="text-xs text-slate-500">Vendors ready for hire</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableSuppliers.map((s) => (
                  <div key={s.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900">{s.name}</h3>
                        <span className="text-xs text-amber-600 font-semibold">{s.rating}</span>
                      </div>
                      <p className="text-xs text-slate-500">Category: {s.category}</p>
                      <p className="text-sm font-bold text-emerald-600 pt-1">{s.price}</p>
                    </div>
                    <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-all">
                      Request Quote
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* MY EVENT CHECKOUT TAB */}
        {activeTab === 'my-event' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Booked Services Summary */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Active Booking: {currentEvent.title}
              </h2>

              <div className="space-y-4 text-sm">
                <div className="p-4 bg-slate-50 rounded-lg flex justify-between items-center border border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Venue</span>
                    <p className="font-bold text-slate-900 mt-0.5">{currentEvent.venue}</p>
                    <p className="text-xs text-slate-500">Date: {currentEvent.date}</p>
                  </div>
                  <span className="font-bold text-slate-900">₹{currentEvent.venueCost.toLocaleString('en-IN')}</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg flex justify-between items-center border border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Supplier / AV</span>
                    <p className="font-bold text-slate-900 mt-0.5">{currentEvent.supplier}</p>
                    <p className="text-xs text-slate-500">Full day setup package</p>
                  </div>
                  <span className="font-bold text-slate-900">₹{currentEvent.supplierCost.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Payment Summary Box (Platform Share Model) */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6 self-start">
              <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3">Payment Summary</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Venue Cost:</span>
                  <span className="font-semibold text-slate-900">₹{currentEvent.venueCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Supplier Cost:</span>
                  <span className="font-semibold text-slate-900">₹{currentEvent.supplierCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Platform Convenience Fee (10%):</span>
                  <span className="font-semibold text-blue-600">₹{platformFee.toLocaleString('en-IN')}</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between text-base font-bold text-slate-900">
                  <span>Total Amount:</span>
                  <span>₹{totalPayable.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-lg shadow-sm transition-all">
                Pay & Confirm Bookings
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}