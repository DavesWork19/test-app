import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import { secretCode } from '../../constants';

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Create regex pattern to match /:secretCode or /:secretCode/anything
  const secretCodePattern = new RegExp(`^/${secretCode}(/.*)?$`);
  const isSecretCodeRoute = secretCodePattern.test(pathname);

  // Public routes
  const publicRoutes = ['/login', '/auth', '/moneytime'];
  const isPublicRoute = publicRoutes.some((route) =>
    route === '/' ? pathname === route : pathname.startsWith(route)
  );

  // Redirect if not authenticated and not on allowed route
  if (!user && !isPublicRoute && !isSecretCodeRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
