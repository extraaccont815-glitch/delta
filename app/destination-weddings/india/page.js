import Link from 'next/link';

export default function IndiaWeddingPage() {
  const destinations = [
    {
      title: 'Udaipur, Rajasthan',
      subtitle: 'Royal Lake Palaces & Heritage Forts',
      description: 'Exchange vows amidst timeless regal splendour with shimmering lakes and grand courtyard settings.',
      tag: 'Royal & Heritage',
    },
    {
      title: 'Goa',
      subtitle: 'Sun-Kissed Beach & Coastal Resorts',
      description: 'Host vibrant sunset ceremonies, tropical sundowners, and relaxed beachside celebrations.',
      tag: 'Beachfront',
    },
    {
      title: 'Jaipur, Rajasthan',
      subtitle: 'Grand Havelis & Fort Venues',
      description: 'Experience authentic Rajasthani hospitality in historic palaces adorned with traditional decor.',
      tag: 'Cultural Heritage',
    },
    {
      title: 'Kerala Backwaters',
      subtitle: 'Serene Houseboats & Luxury Lagoons',
      description: 'Celebrate amidst tranquil coconut groves, calm waters, and lush green tropical landscapes.',
      tag: 'Nature & Serenity',
    },
    {
      title: 'Mussoorie & Rishikesh',
      subtitle: 'Himalayan Foothills & Riverfronts',
      description: 'Breathtaking mountain views and spiritual serene venues for an unforgettable intimate affair.',
      tag: 'Hills & Valleys',
    },
    {
      title: 'Jim Corbett',
      subtitle: 'Wilderness & Luxury Jungle Lodges',
      description: 'Unique forest-themed celebrations surrounded by nature reserves and open-air lawns.',
      tag: 'Exotic Wilderness',
    },
  ];

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/20 uppercase">
          Pan India Destinations
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Celebrate Love in Royal India
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          From historic palaces in Rajasthan to tranquil backwaters in Kerala, discover handpicked venues across India for an unforgettable destination wedding.
        </p>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((item) => (
          <div
            key={item.title}
            className="group relative bg-slate-800/50 backdrop-blur-md border border-slate-700/60 rounded-2xl p-6 hover:border-amber-400/50 hover:bg-slate-800/80 transition-all duration-300 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-md">
                  {item.tag}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm font-medium text-amber-200/80 mt-1">
                {item.subtitle}
              </p>
              <p className="text-slate-300 text-sm mt-4 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-700/50 flex items-center justify-between">
              <Link
                href={`/venues?location=${encodeURIComponent(item.title)}`}
                className="text-sm font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1.5 transition-colors"
              >
                View Venues
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Footer Section */}
      <div className="max-w-4xl mx-auto mt-20 text-center bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700/80 rounded-3xl p-10 shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Need help planning your Indian destination wedding?
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base">
          Our specialists can assist you with venue selection, local coordinators, and custom packages tailored to your budget.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-slate-900 bg-amber-400 rounded-xl hover:bg-amber-300 transition-all shadow-md active:scale-95"
          >
            Get Free Consultation
          </Link>
          <Link
            href="/venues"
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-slate-200 border border-slate-600 rounded-xl hover:bg-slate-800 transition-all"
          >
            Explore All Venues
          </Link>
        </div>
      </div>
    </main>
  );
}