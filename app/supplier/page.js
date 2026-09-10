'use client';

export default function SupplierDashboard() {
  const stats = [
    { label: 'Active Orders', value: '8', icon: '📦' },
    { label: 'Inventory Items', value: '24', icon: '🏪' },
    { label: 'Pending Quotes', value: '4', icon: '📝' },
    { label: 'Monthly Earnings', value: '15,000 INR', icon: '💵' },
  ];

  const orders = [
    { id: 1, item: 'Sound & Lighting Rig', client: 'Pride Tech Summit', date: 'Oct 14, 2026', status: 'Preparing' },
    { id: 2, item: 'Catering Essentials (200 pax)', client: 'Community Mixer', date: 'Nov 04, 2026', status: 'Pending Approval' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">🏪 Supplier Dashboard</h1>
            <p className="text-sm text-slate-500">Manage equipment rentals, inventory, and supply quotes.</p>
          </div>
          <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg shadow-sm transition-all">
            + Add Product / Service
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{item.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{item.value}</p>
              </div>
              <span className="text-3xl">{item.icon}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Supply Orders</h2>
          <div className="divide-y divide-slate-100">
            {orders.map((ord) => (
              <div key={ord.id} className="py-3.5 flex items-center justify-between text-sm">
                <div>
                  <p className="font-semibold text-slate-900">{ord.item}</p>
                  <p className="text-xs text-slate-500">{ord.client} • Delivery: {ord.date}</p>
                </div>
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                  {ord.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}