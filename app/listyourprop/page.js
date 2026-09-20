'use client';

import { useState } from 'react';
import Link from 'next/link';

const VENUE_TYPES = ['Banquet hall', 'Function hall', 'Lawn', 'Resort', 'Farmhouse', 'Other'];
const CATERING_OPTIONS = ['In-house catering only', 'Outside caterers allowed'];

const INITIAL_VALUES = {
  venueName: '',
  ownerName: '',
  phone: '',
  email: '',
  area: '',
  type: '',
  minGuests: '',
  maxGuests: '',
  hallRent: '',
  platePrice: '',
  catering: '',
  notes: '',
  agreed: false,
};

const inputClass =
  'w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/15 transition-all';

function validate(v) {
  const errors = {};

  if (!v.venueName.trim()) errors.venueName = 'Enter the venue name.';
  if (!v.ownerName.trim()) errors.ownerName = 'Enter your name.';

  // Accepts 10-digit Indian mobile numbers, with or without +91 / spaces / dashes.
  const digits = v.phone.replace(/[\s-]/g, '').replace(/^(\+91|91|0)/, '');
  if (!/^[6-9]\d{9}$/.test(digits)) errors.phone = 'Enter a valid 10-digit mobile number.';

  if (v.email.trim() && !/^\S+@\S+\.\S+$/.test(v.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!v.area.trim()) errors.area = 'Enter the area or locality.';
  if (!v.type) errors.type = 'Choose a venue type.';

  const min = Number(v.minGuests);
  const max = Number(v.maxGuests);
  if (!min || min < 1) errors.minGuests = 'Enter the minimum guests.';
  if (!max || max < 1) errors.maxGuests = 'Enter the maximum guests.';
  else if (min && max < min) errors.maxGuests = 'Must be at least the minimum.';

  if (!v.hallRent || Number(v.hallRent) < 0) errors.hallRent = 'Enter the starting hall rent.';
  if (!v.platePrice || Number(v.platePrice) < 0) errors.platePrice = 'Enter the starting price per plate.';
  if (!v.catering) errors.catering = 'Choose a catering policy.';

  if (!v.agreed) errors.agreed = 'Please accept the listing terms to continue.';

  return errors;
}

// Sends each submission to your email through Formspree.
// The endpoint below is used directly. To swap it later, set NEXT_PUBLIC_FORMSPREE_URL in .env.local.
async function submitListing(values) {
  const endpoint =
    process.env.NEXT_PUBLIC_FORMSPREE_URL || 'https://formspree.io/f/xkjgorne';

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: `New Dawat listing: ${values.venueName.trim()}`,
      'Venue name': values.venueName.trim(),
      'Owner name': values.ownerName.trim(),
      'WhatsApp number': values.phone.trim(),
      Email: values.email.trim(),
      Area: values.area.trim(),
      'Venue type': values.type,
      'Guests (min)': values.minGuests,
      'Guests (max)': values.maxGuests,
      'Hall rent from (INR)': values.hallRent,
      'Catering from (INR per plate)': values.platePrice,
      'Catering policy': values.catering,
      Notes: values.notes.trim(),
      'Agreed to listing terms': 'Yes',
    }),
  });

  if (!res.ok) throw new Error('Submission failed');
}

/* ---------- small building blocks ---------- */

function Icon({ children }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const BENEFITS = [
  {
    title: 'Free to list',
    text: 'Create your listing at no cost and start showing up in venue searches.',
    icon: (
      <Icon>
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </Icon>
    ),
  },
  {
    title: 'Reach couples and families',
    text: 'Get enquiries from people who are actively comparing venues.',
    icon: (
      <Icon>
        <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <circle cx="10" cy="7" r="4" />
        <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </Icon>
    ),
  },
  {
    title: 'Show your real prices',
    text: 'Hall rent and catering appear as separate lines, so enquiries come in informed.',
    icon: (
      <Icon>
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
      </Icon>
    ),
  },
];

function Section({ number, title, description, className = '', children }) {
  return (
    <section aria-labelledby={`section-${number}`} className={`space-y-5 ${className}`}>
      <div className="flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white shadow-sm shadow-emerald-500/30">
          {number}
        </span>
        <div>
          <h2 id={`section-${number}`} className="text-base font-semibold text-gray-900">
            {title}
          </h2>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({ id, label, hint, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-800">
        {label}
      </label>
      {hint && <p className="mt-0.5 text-xs text-gray-500">{hint}</p>}
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function RupeeInput({ children }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-sm text-gray-400">
        ₹
      </span>
      {children}
    </div>
  );
}

/* ---------- page ---------- */

export default function ListYourPropertyPage() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | done | failed

  const update = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Shared props for every input so labels, errors and borders stay consistent.
  const bind = (name, extra = '') => ({
    id: name,
    value: values[name],
    onChange: (e) => update(name, e.target.value),
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    className: `${inputClass} ${extra} ${
      errors[name]
        ? 'border-red-400 focus-visible:ring-red-500/15'
        : 'border-gray-200 hover:border-gray-300 focus-visible:border-emerald-500'
    }`,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Move focus to the first field with a problem.
      const firstId = Object.keys(found)[0];
      document.getElementById(firstId)?.focus();
      return;
    }

    setStatus('submitting');
    try {
      await submitListing(values);
      setStatus('done');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setStatus('failed');
    }
  };

  const reset = () => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setStatus('idle');
  };

  /* ----- success screen ----- */
  if (status === 'done') {
    return (
      <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">
        <div className="mx-auto max-w-xl px-4 sm:px-6 py-20 sm:py-28">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 sm:p-10 text-center shadow-xl shadow-emerald-900/5">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/60">
              <svg
                className="h-8 w-8 text-emerald-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </div>
            <h1 className="mt-7 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Welcome to Dawat
            </h1>
            <p className="mt-3 leading-relaxed text-gray-500">
              We have the details for <span className="font-medium text-gray-800">{values.venueName}</span>.
              Our team will contact you on WhatsApp to confirm your listing.
            </p>
            <div className="mt-8 flex flex-col-reverse items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={reset}
                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                List another property
              </button>
              <Link
                href="/venues"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-700 active:scale-[0.98] transition-all"
              >
                Browse venues
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ----- form screen ----- */
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50/70 via-white to-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-14">
          {/* Left: pitch */}
          <aside className="lg:col-span-2 lg:sticky lg:top-10 lg:self-start">
            <span className="inline-flex items-center rounded-full bg-emerald-100/80 px-3 py-1 text-xs font-semibold text-emerald-700">
              For venue owners
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              List your property
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Tell us about your venue and we will set up your Dawat listing.
            </p>

            <ul className="mt-9 space-y-6">
              {BENEFITS.map((b) => (
                <li key={b.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm ring-1 ring-gray-100">
                    {b.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">{b.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-gray-500">{b.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </aside>

          {/* Right: form card */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-8 rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-xl shadow-emerald-900/5"
            >
              <Section number="1" title="About you" description="So we know who to contact.">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field id="ownerName" label="Your name" error={errors.ownerName}>
                    <input type="text" autoComplete="name" placeholder="Full name" {...bind('ownerName')} />
                  </Field>

                  <Field id="phone" label="WhatsApp number" error={errors.phone}>
                    <input
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="98765 43210"
                      {...bind('phone')}
                    />
                  </Field>
                </div>

                <Field id="email" label="Email (optional)" error={errors.email}>
                  <input type="email" autoComplete="email" placeholder="you@example.com" {...bind('email')} />
                </Field>
              </Section>

              <Section
                number="2"
                title="The venue"
                description="List down the details of your property."
                className="border-t border-gray-100 pt-8"
              >
                <Field id="venueName" label="Venue name" error={errors.venueName}>
                  <input type="text" placeholder="e.g. Green Leaf Lawns" {...bind('venueName')} />
                </Field>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field id="area" label="Area" error={errors.area}>
                    <input type="text" placeholder="e.g. Kukatpally" {...bind('area')} />
                  </Field>

                  <Field id="type" label="Venue type" error={errors.type}>
                    <select {...bind('type')}>
                      <option value="">Select a type</option>
                      {VENUE_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <Field id="minGuests" label="Minimum guests" error={errors.minGuests}>
                    <input type="number" min="1" inputMode="numeric" placeholder="100" {...bind('minGuests')} />
                  </Field>

                  <Field id="maxGuests" label="Maximum guests" error={errors.maxGuests}>
                    <input type="number" min="1" inputMode="numeric" placeholder="500" {...bind('maxGuests')} />
                  </Field>
                </div>
              </Section>

              <Section
                number="3"
                title="Pricing"
                description="Starting prices are fine.
                className="border-t border-gray-100 pt-8"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field id="hallRent" label="Hall rent from" error={errors.hallRent}>
                    <RupeeInput>
                      <input
                        type="number"
                        min="0"
                        inputMode="numeric"
                        placeholder="120000"
                        {...bind('hallRent', 'pl-8')}
                      />
                    </RupeeInput>
                  </Field>

                  <Field id="platePrice" label="Catering from, per plate" error={errors.platePrice}>
                    <RupeeInput>
                      <input
                        type="number"
                        min="0"
                        inputMode="numeric"
                        placeholder="800"
                        {...bind('platePrice', 'pl-8')}
                      />
                    </RupeeInput>
                  </Field>
                </div>

                <Field id="catering" label="Catering policy" error={errors.catering}>
                  <select {...bind('catering')}>
                    <option value="">Select a policy</option>
                    {CATERING_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  id="notes"
                  label="Anything else (optional)"
                  hint="Parking, rooms, decor rules, timings, and so on."
                >
                  <textarea rows={4} placeholder="Tell what makes your venue special." {...bind('notes')} />
                </Field>
              </Section>

              {/* Terms + submit */}
              <div className="space-y-5 border-t border-gray-100 pt-8">
                <div>
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
                    <input
                      id="agreed"
                      type="checkbox"
                      checked={values.agreed}
                      onChange={(e) => update('agreed', e.target.checked)}
                      aria-invalid={errors.agreed ? 'true' : undefined}
                      aria-describedby={errors.agreed ? 'agreed-error' : undefined}
                      className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-emerald-500"
                    />
                    <span>
                      I agree to Dawat&apos;s listing terms and confirm the details above are accurate.
                    </span>
                  </label>
                  {errors.agreed && (
                    <p id="agreed-error" className="mt-1.5 text-xs font-medium text-red-600">
                      {errors.agreed}
                    </p>
                  )}
                </div>

                {status === 'failed' && (
                  <p className="text-sm font-medium text-red-600" role="alert">
                    Something went wrong while submitting. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-600 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 transition-all"
                >
                  {status === 'submitting' ? 'Submitting...' : 'Submit listing'}
                </button>

                <p className="text-center text-xs text-gray-500">
                  We will contact you on WhatsApp to confirm your listing.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}