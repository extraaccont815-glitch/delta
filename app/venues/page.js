'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// SAMPLE DATA - replace with real venues (or a database query) later.
// Prices are in rupees. hallRent = starting rent for the hall/lawn,
// platePrice = starting catering price per plate.
// image = optional file in the /public folder (venues without one show a placeholder).
const venues = [
  {
    slug: 'green-leaf-lawns',
    image: '/g.jpeg',
    name: 'Green Leaf Lawns',
    area: 'Shamshabad',
    type: 'Lawn',
    minGuests: 300,
    maxGuests: 1500,
    hallRent: 250000,
    platePrice: 750,
    catering: 'Outside caterers allowed',
  },
  {
    slug: 'royal-orchid-banquet',
    image: '/r.jpeg',
    name: 'Royal Orchid Banquet',
    area: 'Kukatpally',
    type: 'Banquet hall',
    minGuests: 150,
    maxGuests: 600,
    hallRent: 120000,
    platePrice: 900,
    catering: 'In-house catering only',
  },
  {
    slug: 'nizam-palace-resort',
    image: '/n.jpg',
    name: 'Nizam Palace Resort',
    area: 'Shamirpet',
    type: 'Resort',
    minGuests: 200,
    maxGuests: 2000,
    hallRent: 600000,
    platePrice: 1400,
    catering: 'In-house catering only',
  },
  {
    slug: 'sunrise-function-hall',
    image: '/s.jpeg',
    name: 'Sunrise Function Hall',
    area: 'Uppal',
    type: 'Function hall',
    minGuests: 100,
    maxGuests: 400,
    hallRent: 70000,
    platePrice: 600,
    catering: 'Outside caterers allowed',
  },
  {
    slug: 'jubilee-grand',
    image: '/j.jpeg',
    name: 'Jubilee Grand',
    area: 'Banjara Hills',
    type: 'Banquet hall',
    minGuests: 100,
    maxGuests: 500,
    hallRent: 300000,
    platePrice: 1600,
    catering: 'In-house catering only',
  },
];

const areas = [...new Set(venues.map((v) => v.area))].sort();
const venueTypes = [...new Set(venues.map((v) => v.type))].sort();

const inr = (n) => `₹${n.toLocaleString('en-IN')}`;

const selectClass =
  'rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500 transition-colors';

export default function VenuesPage() {
  const [area, setArea] = useState('');
  const [type, setType] = useState('');
  const [guests, setGuests] = useState('');
  const [sort, setSort] = useState('price-asc');

  const filtersActive = area || type || guests;

  const results = useMemo(() => {
    const guestCount = Number(guests) || 0;

    const filtered = venues.filter((v) => {
      if (area && v.area !== area) return false;
      if (type && v.type !== type) return false;
      if (guestCount && (guestCount < v.minGuests || guestCount > v.maxGuests)) return false;
      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sort === 'price-desc') return b.hallRent - a.hallRent;
      if (sort === 'capacity') return b.maxGuests - a.maxGuests;
      return a.hallRent - b.hallRent;
    });
  }, [area, type, guests, sort]);

  const clearFilters = () => {
    setArea('');
    setType('');
    setGuests('');
  };

  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Heading + Join Dawat (top right) */}
        <header className="flex items-start justify-between gap-4">
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
              Browse venues
            </h1>
            <p className="mt-3 text-gray-500 leading-relaxed">
              Compare hall rent and catering prices side by side, then ask the venue about your date.
            </p>
          </div>

          <Link
            href="/listyourprop"
            className="shrink-0 inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 transition-all"
          >
            Join Dawat
          </Link>
        </header>

        {/* Filters */}
        <section
          aria-label="Filter venues"
          className="mt-10 flex flex-wrap items-center gap-3 border-y border-gray-100 py-4"
        >
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            aria-label="Area"
            className={selectClass}
          >
            <option value="">All areas</option>
            {areas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            aria-label="Venue type"
            className={selectClass}
          >
            <option value="">All types</option>
            {venueTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            inputMode="numeric"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            placeholder="Guests"
            aria-label="Number of guests"
            className={`${selectClass} w-28`}
          />

          {filtersActive && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Clear
            </button>
          )}

          <label className="ml-auto flex items-center gap-2 text-sm text-gray-500">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className={selectClass}
            >
              <option value="price-asc">Hall rent: low to high</option>
              <option value="price-desc">Hall rent: high to low</option>
              <option value="capacity">Largest capacity</option>
            </select>
          </label>
        </section>

        <p className="mt-6 text-sm text-gray-500" aria-live="polite">
          {results.length} {results.length === 1 ? 'venue' : 'venues'}
        </p>

        {/* Results */}
        {results.length > 0 ? (
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map((v) => (
              <li key={v.slug}>
                <VenueCard venue={v} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-4 rounded-xl border border-dashed border-gray-200 py-16 px-6 text-center">
            <p className="font-medium text-gray-900">No venues match these filters</p>
            <p className="mt-1 text-sm text-gray-500">
              Try a different area or type, or clear the filters.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

function VenueCard({ venue }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Venue photo (falls back to a placeholder when no image is set) */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {venue.image ? (
          <Image
            src={venue.image}
            alt={`${venue.name}, ${venue.type} in ${venue.area}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-5xl font-semibold text-gray-300 select-none" aria-hidden="true">
              {venue.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs text-gray-500">
          {venue.type} · {venue.area}
        </p>
        <h2 className="mt-1 text-lg font-semibold text-gray-900">{venue.name}</h2>
        <p className="mt-1 text-sm text-gray-500">
          {venue.minGuests}–{venue.maxGuests} guests
        </p>

        <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
          <div>
            <dt className="text-xs text-gray-500">Hall rent from</dt>
            <dd className="mt-0.5 font-semibold text-gray-900">{inr(venue.hallRent)}</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500">Catering from</dt>
            <dd className="mt-0.5 font-semibold text-gray-900">
              {inr(venue.platePrice)}
              <span className="text-xs font-normal text-gray-500"> / plate</span>
            </dd>
          </div>
        </dl>

        <p className="mt-4 text-sm text-gray-500">{venue.catering}</p>
      </div>
    </article>
  );
}