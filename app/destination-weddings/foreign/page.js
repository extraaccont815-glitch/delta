import Link from 'next/link';

export default function ForeignWeddingPage() {
  const destinations = [
    {
      title: 'Bali, Indonesia',
      subtitle: 'Clifftop Resorts & Tropical Villas',
      description: 'Say "I do" over dramatic ocean cliffs, sunset beaches, and lush rainforest sanctuaries.',
      startingPrice: '₹20,00,000 ($24,000)',
      guestEstimate: '80–120 Guests • 2 Nights',
      tag: 'Tropical Island',
    },
    {
      title: 'Tuscany, Italy',
      subtitle: 'Rolling Hills & Historic Vineyards',
      description: 'Host intimate rustic feasts in centuries-old Italian villas surrounded by cypress trees and olive groves.',
      startingPrice: '₹35,00,000 (€38,000)',
      guestEstimate: '50–80 Guests • 2 Nights',
      tag: 'European Romance',
    },
    {
      title: 'Phuket & Krabi, Thailand',
      subtitle: 'Private Beachfronts & Luxury Islands',
      description: 'Unwind with turquoise waters, golden sunsets, and world-class hospitality for exotic coastal celebrations.',
      startingPrice: '₹15,00,000 ($18,000)',
      guestEstimate: '100–150 Guests • 2 Nights',
      tag: 'Exotic Coastal',
    },
    {
      title: 'Santorini, Greece',
      subtitle: 'Caldera Views & Aegean Charm',
      description: 'Iconic white-washed architecture paired with panoramic volcanic cliffside backdrops.',
      startingPrice: '₹30,00,000 (€33,000)',
      guestEstimate: '40–70 Guests • 2 Nights',
      tag: 'Mediterranean',
    },
    {
      title: 'Dubai, UAE',
      subtitle: 'Ultra-Luxury Hotels & Desert Dunes',
      description: 'From sprawling ballroom galas to high-end desert resort soirées under the Arabian stars.',
      startingPrice: '₹40,00,000 ($48,000)',
      guestEstimate: '150–250 Guests • 2 Nights',
      tag: 'Modern Luxury',
    },
    {
      title: 'Maldives',
      subtitle: 'Overwater Bungalows & Private Atolls',
      description: 'The ultimate barefoot luxury experience for exclusive intimate ceremonies and island buyouts.',
      startingPrice: '₹28,00,000 ($33,000)',
      guestEstimate: '30–50 Guests • 2 Nights',
      tag: 'Private Island',
    },
  ];

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/20 uppercase">
          International Getaways
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          World-Class Destination Weddings
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Explore magical global locations, luxury resorts, and idyllic islands with starting package estimations.
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

              {/* Pricing Box */}
              <div className="mt-6 p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50">
                <div className="text-xs text-slate-400 font-medium">Estimated Package Starts At</div>
                <div className="text-xl font-bold text-amber-400 mt-0.5">{item.startingPrice}</div>
                <div className="text-xs text-slate-400 mt-1">{item.guestEstimate}</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700/50 flex items-center justify-between">
              <Link
                href={`/venues?location=${encodeURIComponent(item.title)}`}
                className="text-sm font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1.5 transition-colors"
              >
                View Venues & Details
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
          Planning an international wedding?
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base">
          Get assistance with visa guidance, flight logistics, cross-border vendor management, and luxury island bookings.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-slate-900 bg-amber-400 rounded-xl hover:bg-amber-300 transition-all shadow-md active:scale-95"
          >
            Get Custom Quote
          </Link>
          <Link
            href="/venues"
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-slate-200 border border-slate-600 rounded-xl hover:bg-slate-800 transition-all"
          >
            Explore Global Venues
          </Link>
        </div>
      </div>
    </main>
  );
}