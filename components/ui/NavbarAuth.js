'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function NavbarAuth({ mobile = false }) {
  const { data: session } = useSession();

  if (mobile) {
    if (session) {
      return (
        <>
          <div className="px-4 py-2 text-base font-medium text-gray-800 border-b border-gray-100">
            Hi, {session?.user?.name}
          </div>
          <Link href="/admin" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
            Dashboard
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
          >
            Sign out
          </button>
        </>
      );
    }
    return (
      <>
        <Link href="/login" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
          Sign in
        </Link>
        <Link href="/signup" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
          Get started
        </Link>
      </>
    );
  }

  // Desktop
  if (session) {
    return (
      <>
        <Link href="/search" className="text-gray-500 hover:text-gray-900 p-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </Link>
        {session?.user?.name && (
          <span className="text-sm font-medium text-gray-700 px-3 py-2">
            Hi, {session.user.name.split(' ')[0]}
          </span>
        )}
        <Link href="/admin" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
          Dashboard
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 shadow-sm"
        >
          Sign out
        </button>
      </>
    );
  }

  return (
    <>
      <Link href="/login" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
        Sign in
      </Link>
      <Link href="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 shadow-sm">
        Get started
      </Link>
    </>
  );
}
