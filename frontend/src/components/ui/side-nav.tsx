// src/components/ui/side-nav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Users,
  Calendar,
  MapPin,
  Trophy,
  Home,
} from 'lucide-react';

export default function SideNav() {
  const pathname = usePathname();

  // Don't show sidebar on homepage
  if (pathname === '/') {
    return null;
  }

  const navItems = [
    {
      name: 'Dashboard',
      href: '/',
      icon: Home,
    },
    {
      name: 'Sessions',
      href: '/sessions',
      icon: Calendar,
      subItems: [
        { name: 'Active Sessions', href: '/sessions?status=active' },
        { name: 'Create Session', href: '/sessions/new' },
      ],
    },
    {
      name: 'Players',
      href: '/players',
      icon: Users,
      subItems: [
        { name: 'Active Players', href: '/players?active=true' },
        { name: 'Add Player', href: '/players/new' },
      ],
    },
    {
      name: 'Games',
      href: '/games',
      icon: Trophy,
      subItems: [
        { name: 'Active Games', href: '/games/active' },
        { name: 'Game History', href: '/games' },
      ],
    },
    {
      name: 'Locations',
      href: '/locations',
      icon: MapPin,
      subItems: [
        { name: 'All Locations', href: '/locations' },
        { name: 'Add Location', href: '/locations/new' },
      ],
    },
  ];

  return (
    <aside className="bg-white w-64 min-h-screen shadow-md hidden md:block">
      <div className="px-4 py-4">
        <p className="text-xs uppercase font-bold text-gray-500 mb-4">
          Navigation
        </p>
        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href) && item.href !== '/';
              
              return (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                  
                  {isActive && item.subItems && (
                    <ul className="ml-6 mt-1 space-y-1">
                      {item.subItems.map((subItem) => {
                        const isSubActive = pathname === subItem.href;
                        
                        return (
                          <li key={subItem.name}>
                            <Link
                              href={subItem.href}
                              className={`block px-3 py-1.5 rounded-md text-xs font-medium ${
                                isSubActive
                                  ? 'bg-indigo-50 text-indigo-700'
                                  : 'text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}