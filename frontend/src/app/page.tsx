// src/app/page.tsx
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
              Start New Session
            </Link>
          </div>
          <div className="ml-3 inline-flex">
            <Link
              href="/players"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
            >
              Manage Players
            </Link>
          </div>
        </div>
      </div>


      {/* Quick stats */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">
              Streamline Your Volleyball Management
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Designed for volleyball enthusiasts
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Start managing your volleyball games efficiently with our intuitive platform.
            </p>
          </div>
          
          <div className="mt-10">
            <Link
              href="/sessions/new"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}