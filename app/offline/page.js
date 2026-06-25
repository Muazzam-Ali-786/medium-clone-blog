'use client';
import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">📡</div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">You're offline</h1>
        <p className="text-gray-600 mb-8">
          It looks like you've lost your internet connection. Some previously visited pages are available offline. Try going back or refreshing when you're connected.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-full transition-colors"
          >
            Try again
          </button>
          <Link href="/" className="border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-full hover:bg-gray-50 transition-colors">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
