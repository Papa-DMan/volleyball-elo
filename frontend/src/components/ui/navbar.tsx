// src/components/ui/navbar.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Volleyball } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Volleyball className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">VolleyManager</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/sessions"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname.startsWith('/sessions') 
                    ? 'bg-indigo-700 text-white' 
                    : 'text-indigo-100 hover:bg-indigo-500'
                }`}
              >
                Sessions
              </Link>
              <Link
                href="/players"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname.startsWith('/players') 
                    ? 'bg-indigo-700 text-white' 
                    : 'text-indigo-100 hover:bg-indigo-500'
                }`}
              >
                Players
              </Link>
              <Link
                href="/games"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname.startsWith('/games') 
                    ? 'bg-indigo-700 text-white' 
                    : 'text-indigo-100 hover:bg-indigo-500'
                }`}
              >
                Games
              </Link>
              <Link
                href="/locations"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname.startsWith('/locations') 
                    ? 'bg-indigo-700 text-white' 
                    : 'text-indigo-100 hover:bg-indigo-500'
                }`}
              >
                Locations
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-100 hover:bg-indigo-500 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/sessions"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname.startsWith('/sessions') 
                  ? 'bg-indigo-700 text-white' 
                  : 'text-indigo-100 hover:bg-indigo-500'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Sessions
            </Link>
            <Link
              href="/players"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname.startsWith('/players') 
                  ? 'bg-indigo-700 text-white' 
                  : 'text-indigo-100 hover:bg-indigo-500'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Players
            </Link>
            <Link
              href="/games"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname.startsWith('/games') 
                  ? 'bg-indigo-700 text-white' 
                  : 'text-indigo-100 hover:bg-indigo-500'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Games
            </Link>
            <Link
              href="/locations"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname.startsWith('/locations') 
                  ? 'bg-indigo-700 text-white' 
                  : 'text-indigo-100 hover:bg-indigo-500'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Locations
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}