import Link from 'next/link';

export default function PremiumWall() {
  return (
    <div className="relative my-12">
      {/* Fade Overlay */}
      <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
      
      {/* Wall Card */}
      <div className="border border-gray-200 rounded-2xl p-8 text-center shadow-lg bg-white">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Login to Continue Reading</h3>
        <p className="text-gray-600 mb-6">
          You've read your 3 free articles this month. Sign in to unlock unlimited access to all stories.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/signup"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-full transition-colors shadow-sm"
          >
            Create free account
          </Link>
          <Link
            href="/login"
            className="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-full transition-colors"
          >
            Sign in
          </Link>
        </div>
        <p className="text-gray-500 text-sm mt-4">
          Already a member?{' '}
          <Link href="/login" className="text-indigo-600 hover:underline">Sign in here</Link>
        </p>
      </div>
    </div>
  );
}
