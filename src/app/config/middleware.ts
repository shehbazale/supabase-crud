import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import supabase from './supabase';


export async function middleware(req: NextRequest) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user && req.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
}