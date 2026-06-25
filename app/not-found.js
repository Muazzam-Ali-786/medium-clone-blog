import Link from 'next/link';

export const metadata = {
  title: '404 – Page Not Found | MediumClone',
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-9xl font-extrabold text-indigo-100 select-none mb-2">404</div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Page not found</h1>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-full transition-colors">
            Go home
          </Link>
          <Link href="/blog" className="border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-full hover:bg-gray-50 transition-colors">
            Browse articles
          </Link>
        </div>
      </div>
    </div>
  );
}
