'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link 
          href="/" 
          className="text-2xl font-bold tracking-tight text-gray-900 hover:opacity-80 transition-opacity"
        >
          Dawat<span className="text-emerald-500 text-3xl">.</span>
        </Link>

        {/* Desktop Navigation Links & Auth Buttons */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            href="/venues" 
            className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
          >
            Browse Venues
          </Link>
          <Link 
            href="/contact" 
            className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
          >
            Contact
          </Link>
          <Link 
            href="/listyourprop" 
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            List Your Property
          </Link>

          <div className="h-4 w-px bg-gray-200 mx-1" />

          {/* Clerk Auth Controls */}
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900 px-2 py-2 transition-colors">
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
            <UserButton afterSignOutUrl="/" />
          </Show>
        </nav>

        {/* Mobile Controls (User Avatar + Animated Rounded Hamburger) */}
        <div className="flex md:hidden items-center gap-3">
          <Show when="signed-in">
            <UserButton afterSignOutUrl="/" />
          </Show>

          {/* Hamburger / Close Icon Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="p-2 rounded-lg text-gray-900 hover:bg-gray-100 focus:outline-none transition-colors"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <div className="w-6 h-6 relative flex items-center justify-center">
              <svg 
                className="w-6 h-6" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                {/* Top Line */}
                <line 
                  x1="3" 
                  y1="6" 
                  x2="21" 
                  y2="6" 
                  className={`transition-all duration-300 origin-center [transform-box:fill-box] ${
                    isMenuOpen ? 'rotate-45 translate-y-[6px]' : ''
                  }`} 
                />
                {/* Middle Line */}
                <line 
                  x1="3" 
                  y1="12" 
                  x2="21" 
                  y2="12" 
                  className={`transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100'
                  }`} 
                />
                {/* Bottom Line */}
                <line 
                  x1="3" 
                  y1="18" 
                  x2="21" 
                  y2="18" 
                  className={`transition-all duration-300 origin-center [transform-box:fill-box] ${
                    isMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''
                  }`} 
                />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-x-0 top-16 bg-white border-b border-gray-100 shadow-xl md:hidden transition-all duration-300 ease-in-out transform origin-top overflow-hidden ${
          isMenuOpen 
            ? 'max-h-96 opacity-100 translate-y-0' 
            : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="px-4 py-6 space-y-4 flex flex-col">
          <Link 
            href="/venues" 
            onClick={() => setIsMenuOpen(false)}
            className="text-base font-medium text-gray-800 hover:text-emerald-600 py-2 px-3 rounded-lg hover:bg-emerald-50/50 transition-colors"
          >
            Browse Venues
          </Link>
          <Link 
            href="/contact" 
            onClick={() => setIsMenuOpen(false)}
            className="text-base font-medium text-gray-800 hover:text-emerald-600 py-2 px-3 rounded-lg hover:bg-emerald-50/50 transition-colors"
          >
            Contact
          </Link>
          <Link 
            href="/listyourprop" 
            onClick={() => setIsMenuOpen(false)}
            className="text-base font-semibold text-emerald-600 hover:text-emerald-700 py-2 px-3 rounded-lg hover:bg-emerald-50/50 transition-colors"
          >
            List Your Property
          </Link>

          {/* Auth Action Buttons in Drawer for Signed-Out State */}
          <Show when="signed-out">
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2.5">
              <SignInButton mode="modal">
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-all shadow-sm"
                >
                  Sign up
                </button>
              </SignUpButton>
            </div>
          </Show>
        </div>
      </div>
    </header>
  );
}