import { getServerSession } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authOptions } from './utils/authOptions';
import { getToken } from 'next-auth/jwt';
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET, secureCookie: process.env.NODE_ENV === 'production'});

    if(!session){
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if(request.nextUrl.pathname.startsWith('/')){
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const res = NextResponse.next();

    res.headers.set('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return res;
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/']
}