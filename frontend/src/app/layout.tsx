// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import Navbar from '@/components/ui/navbar';
import SideNav from '@/components/ui/side-nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Volleyball Open Court Manager',
  description: 'Manage players, teams, and sessions for volleyball open courts',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="flex">
            <SideNav />
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
          <Toaster position="top-center" />
        </div>
      </body>
    </html>
  );
}