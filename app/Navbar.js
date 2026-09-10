'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Show, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoaded } = useUser();

  // Check if onboarding was completed
  const hasCompletedOnboarding = user?.unsafeMetadata?.onboarded;

  const handleGetStartedClick = () => {
    toast("It's always recommended to sign up first. If you are already signed in, kindly ignore this message.", {
      duration: 2000,
      icon: 'ℹ️',
      className: `
        text-white font-bold 
        px-4 py-3 rounded-lg shadow-lg 
        border-2 border-black
      `,
    });
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Name */}
        <Link 
          href="/" 
          className="text-2xl font-bold tracking-tight text-gray-900 hover:opacity-50 transition-opacity"
        >
          Pride<span className="text-emerald-400 text-4xl">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          {/* Show Get Started ONLY if user hasn't completed onboarding */}
          {isLoaded && !hasCompletedOnboarding && (
            <Link
              href="/get-started"
              onClick={handleGetStartedClick}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-emerald-400 active:scale-[0.98] transition-all shadow-sm"
            >
              Get Started
            </Link>
          )}

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 transition-colors">
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 active:scale-[0.98] transition-all shadow-sm">
                Sign up
              </button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <UserButton />
          </Show>
        </nav>

        {/* Mobile Controls (User Button & Hamburger Menu) */}
        <div className="flex md:hidden items-center gap-4">
          <Show when="signed-in">
            <UserButton />
          </Show>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none z-50"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="h-6 w-6 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Smooth Sliding Mobile Drawer */}
      <div 
        className={`fixed inset-x-0 top-16 bg-white border-b border-gray-100 shadow-lg md:hidden transition-all duration-300 ease-in-out transform origin-top overflow-hidden ${
          isMenuOpen 
            ? 'max-h-[400px] opacity-100 translate-y-0' 
            : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-4">
          {/* Main Action Buttons */}
          <div className="flex flex-col gap-3">
            <div className="bg-amber-50 p-3 rounded-xl border border-gray-100 space-y-2">
              {/* Show Get Started in Mobile Menu ONLY if user hasn't completed onboarding */}
              {isLoaded && !hasCompletedOnboarding && (
                <Link
                  href="/get-started"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleGetStartedClick();
                  }}
                  className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-sm"
                >
                  Get Started
                </Link>
              )}
              
              <div className="flex justify-around pt-1 border-t border-gray-200/60">
                <Link 
                  href="/" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xs font-medium text-gray-600 hover:text-gray-900 py-1 px-3 rounded hover:bg-gray-200/50 transition-colors"
                >
                  Home
                </Link>
                <Link 
                  href="/contact" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xs font-medium text-gray-600 hover:text-gray-900 py-1 px-3 rounded hover:bg-gray-200/50 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Auth Buttons */}
            <Show when="signed-out">
              <div className="flex flex-col gap-2 pt-1">
                <SignInButton mode="modal">
                  <button className="w-full text-center py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-all shadow-sm">
                    Sign up
                  </button>
                </SignUpButton>
              </div>
            </Show>
          </div>
        </div>
      </div>
    </header>
  );
}