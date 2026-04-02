import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])
const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // 1. Protect User Dashboard via Clerk
  if (isProtectedRoute(req)) {
    // Calling protect directly on auth and awaiting it
    await auth.protect()
  }

  // 2. Custom Admin Logic
  if (isAdminRoute(req)) {
    const adminToken = req.cookies.get('admin_session')
    if (!adminToken) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}