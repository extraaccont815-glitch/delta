'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const ROLES = [
  {
    id: 'venue-owner',
    title: 'Venue Owner',
    description: 'List your property for bookings and manage reservations seamlessly.',
    icon: '👑',
    path: '/venue-owner',
  },
  {
    id: 'organiser',
    title: 'Organiser / Host',
    description: 'Plan events and manage your supplies seamlessly with Pride.',
    icon: '🎤',
    path: '/organiser',
  },
  {
    id: 'supplier',
    title: 'Supplier / Vendor',
    description: 'Supply products or services to event organisers and venues.',
    icon: '🏪',
    path: '/supplier',
  },
];

export default function GetStartedPage() {
  const [selectedRole, setSelectedRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleContinue = async () => {
    if (!selectedRole) {
      toast.error('Please select a role to continue.');
      return;
    }

    const roleObj = ROLES.find((r) => r.id === selectedRole);

    try {
      setIsSubmitting(true);

      // Send form data to your Formspree endpoint
      await fetch('https://formspree.io/f/xljezban', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: roleObj.title,
          submittedAt: new Date().toISOString(),
        }),
      });

      // Persist onboarding state for local demo UI updates
      localStorage.setItem('onboarded', 'true');
      localStorage.setItem('userRole', roleObj.title);

      toast.success(`Welcome as a ${roleObj.title}!`);
      router.push(roleObj.path);
    } catch (error) {
      console.error(error);
      // Seamless redirect fallback in case of connection drop during presentation
      localStorage.setItem('onboarded', 'true');
      router.push(roleObj.path);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-emerald-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="text-center max-w-md mx-auto mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Select Your Role</h1>
          <p className="text-slate-500 text-sm">
            Choose how you plan to use <span className=' text-indigo-600'>Dawat</span><span className=' text-emerald-500'>.</span> meet your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {ROLES.map((role) => {
            const isSelected = selectedRole === role.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(role.id)}
                className={`flex flex-col justify-between text-left p-5 rounded-xl border transition-all duration-300 ease-in-out cursor-pointer outline-none ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/60 shadow-sm scale-[1.01]'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="text-3xl mb-3">{role.icon}</div>
                <div>
                  <h2 className="font-semibold text-slate-900 mb-1">{role.title}</h2>
                  <p className="text-xs text-slate-500">{role.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleContinue}
            className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50 rounded-lg shadow-sm transition-all cursor-pointer"
          >
            {isSubmitting ? 'Saving...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}