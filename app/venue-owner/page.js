'use client';

import { useState } from 'react';

export default function VenueOwnerDashboard() {
  const [isAvailable, setIsAvailable] = useState(true);

  const stats = [
    { label: 'Active Bookings', value: '12', icon: '📅', change: '+2 this week' },
    { label: 'Pending Inquiries', value: '5', icon: '⏳', change: 'Needs review' },
    { label: 'Page Views', value: '1,240', icon: '👁️', change: '+18% vs last month' },
    { label: 'Total Revenue', value: '₹6,85,000', icon: '💰', change: 'Payout pending' },
  ];

  const recentRequests = [
    { id: 1, event: 'Annual Pride Gala', organizer: 'Sarah M.', date: 'Oct 12, 2026', guests: '180 guests', status: 'Confirmed' },
    { id: 2, event: 'Tech Networking Night', organizer: 'David K.', date: 'Oct 18, 2026', guests: '75 guests', status: 'Pending' },
    { id: 3, event: 'Community Workshop', organizer: 'Elena R.', date: 'Nov 02, 2026', guests: '50 guests', status: 'Confirmed' },
    { id: 4, event: 'Indie Music Showcase', organizer: 'Marcus T.', date: 'Nov 15, 2026', guests: '220 guests', status: 'Pending' },
  ];

  const amenities = ['High-Speed Wi-Fi', 'PA System & Mic', 'Wheelchair Accessible', 'Full Bar Area', 'Stage Lighting'];

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">👑 Venue Owner Dashboard</h1>
              <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
              }`}>
                {isAvailable ? '● Listed & Available' : '○ Paused'}
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Manage your property listings, booking inquiries, and venue settings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsAvailable(!isAvailable)}
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-all"
            >
              Toggle Status
            </button>
            <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg shadow-sm transition-all">
              + Add New Space
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{item.label}</p>
                <span className="text-2xl">{item.icon}</span>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold text-slate-900">{item.value}</p>
                <p className="text-xs text-slate-400 mt-1">{item.change}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Booking Requests Table */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Booking Inquiries</h2>
              <button className="text-xs font-medium text-blue-600 hover:underline">View All</button>
            </div>

            <div className="divide-y divide-slate-100">
              {recentRequests.map((req) => (
                <div key={req.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-slate-900">{req.event}</p>
                      <span className="text-xs text-slate-400">• {req.guests}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">Organized by {req.organizer} — <span className="text-slate-600">{req.date}</span></p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      req.status === 'Confirmed' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {req.status}
                    </span>
                    <button className="px-3 py-1 text-xs font-medium border border-slate-200 rounded-md hover:bg-slate-50">
                      Manage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar: Property Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-slate-900">Featured Space</h2>
              
              <div className="bg-slate-800 h-36 rounded-lg flex flex-col items-center justify-center text-slate-200 p-4 text-center">
                <span className="text-3xl mb-1">🏛️</span>
                <p className="font-semibold text-sm">Grand Downtown Hall</p>
                <p className="text-xs text-slate-400">Primary Event Space</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Capacity:</span>
                  <span className="font-medium text-slate-900">250 Guests</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Base Rate:</span>
                  <span className="font-medium text-slate-900">₹12,500 / hr</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Location:</span>
                  <span className="font-medium text-slate-900">Central District</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Amenities Included</p>
                <div className="flex flex-wrap gap-1.5">
                  {amenities.map((item, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                <button className="text-blue-600 hover:underline font-medium">Edit Space Details</button>
                <button className="text-slate-500 hover:underline">View Public Page</button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}