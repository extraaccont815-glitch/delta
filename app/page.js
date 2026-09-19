'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [venueType, setVenueType] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!location && !venueType) return;
    
    const query = new URLSearchParams();
    if (location) query.set('location', location);
    if (venueType) query.set('type', venueType);

    router.push(`/venues?${query.toString()}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-sans w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        {/* Decorative Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-5xl mx-auto space-y-4 sm:space-y-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide border border-emerald-500/20 backdrop-blur-sm">
            ✨ India's Premier Venue Marketplace
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight sm:leading-snug">
            Find & Book Extraordinary Wedding Venues<span className="text-emerald-400">.</span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed px-2">
            Discover verified banquet halls, luxury resorts, and heritage properties for your special day with zero hidden fees.
          </p>

          {/* Fully Responsive Search Form */}
          <form 
            onSubmit={handleSearch}
            className="bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl shadow-2xl border border-white/20 max-w-3xl mx-auto flex flex-col md:flex-row gap-2.5 sm:gap-3 text-gray-800 mt-6 sm:mt-10"
          >
            {/* Location Input */}
            <div className="w-full md:flex-1 flex items-center px-3.5 bg-gray-50 rounded-xl border border-gray-200/80 focus-within:border-emerald-500 focus-within:bg-white transition-all">
              <svg className="w-5 h-5 text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or Location (e.g. Delhi, Goa)" 
                className="w-full py-3 bg-transparent focus:outline-none text-sm placeholder-gray-400 font-medium"
              />
            </div>

            {/* Venue Type Dropdown */}
            <div className="w-full md:w-48 flex items-center px-3.5 bg-gray-50 rounded-xl border border-gray-200/80 focus-within:border-emerald-500 focus-within:bg-white transition-all">
              <select 
                value={venueType}
                onChange={(e) => setVenueType(e.target.value)}
                className="w-full py-3 bg-transparent focus:outline-none text-sm text-gray-700 font-medium cursor-pointer"
              >
                <option value="">All Venue Types</option>
                <option value="banquet">Banquet Hall</option>
                <option value="resort">Resort & Lawn</option>
                <option value="heritage">Heritage Property</option>
                <option value="farmhouse">Farmhouse</option>
              </select>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md shadow-emerald-500/25 text-sm shrink-0 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="bg-white border-b border-gray-100 py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
          <div className="p-2">
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">500+</p>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">Curated Venues</p>
          </div>
          <div className="p-2">
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-emerald-600 tracking-tight">0%</p>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">Upfront Listing Fee</p>
          </div>
          <div className="p-2">
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">100%</p>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">Escrow Protection</p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Explore by Venue Style</h2>
          <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-base">Handpicked spaces tailored to your wedding theme and guest capacity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            { 
              title: 'Luxury Banquet Halls', 
              desc: 'Air-conditioned indoor halls with complete catering and lighting setups.', 
              tag: 'Popular',
              type: 'banquet'
            },
            { 
              title: 'Open Air Lawns & Resorts', 
              desc: 'Spacious outdoor gardens perfect for large evening receptions and mandap setups.', 
              tag: 'Trending',
              type: 'resort'
            },
            { 
              title: 'Heritage Palaces & Forts', 
              desc: 'Royal properties providing a regal backdrop for unforgettable celebrations.', 
              tag: 'Premium',
              type: 'heritage'
            },
          ].map((cat, idx) => (
            <div 
              key={idx} 
              onClick={() => router.push(`/venues?type=${cat.type}`)}
              className="group bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="inline-block text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                  {cat.tag}
                </span>
                <h3 className="text-lg sm:text-xl font-bold mt-4 sm:mt-5 text-gray-900 group-hover:text-emerald-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-2.5 leading-relaxed">{cat.desc}</p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-50 flex items-center text-xs font-semibold text-emerald-600 group-hover:gap-2 transition-all">
                <span>Browse properties</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2 sm:space-y-3">
            <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">Partner with Dawat</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">Own a Wedding Venue?</h2>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-xl font-light">
              List your property for free and start receiving high-intent wedding inquiries directly on your dashboard.
            </p>
          </div>
          <Link 
            href="/contact" 
            className="w-full md:w-auto inline-flex items-center justify-center px-8 py-3.5 sm:py-4 text-sm font-bold text-slate-900 bg-white rounded-xl hover:bg-emerald-400 hover:text-slate-950 transition-all shadow-lg active:scale-95 shrink-0"
          >
            List Property 
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Page;