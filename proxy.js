import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(req) {
  const { pathname } = req.nextUrl;
  const secret = process.env.NEXTAUTH_SECRET || 'super-secret-default-key-for-dev';

  // Redirect logged-in users away from login/signup pages
  if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
    const token = await getToken({ req, secret });
    if (token) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }
  }

  // Admin route protection — only require login, not a specific role
  if (pathname.startsWith('/admin')) {
    const token = await getToken({ req, secret });

    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  // Premium Content Logic: track article reads for guests (max 3 free)
  if (pathname.startsWith('/blog/')) {
    const token = await getToken({ req, secret });

    if (!token) {
      const articlesRead = req.cookies.get('articles_read')?.value;
      const count = articlesRead ? parseInt(articlesRead, 10) : 0;

      const response = NextResponse.next();

      response.cookies.set('articles_read', Math.min(count + 1, 10), {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/blog/:path+', '/login', '/signup'],
};

export default proxy;
