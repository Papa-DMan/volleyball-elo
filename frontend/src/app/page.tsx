// src/app/page.tsx
'use client'
import Link from 'next/link';

export default function Home() {  
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero section */}
      <div className="text-center py-20 px-4">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Volleyball Open Court Manager
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Create manage your volleyball open court sessions with ease.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <Link
              href="/sessions/new"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>


      {/* Quick stats */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">
              Streamline Open Court Volleyball Management
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Designed for Volleyball Enthusiasts
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Start enjoying your open court volleyball games with ease on our platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}