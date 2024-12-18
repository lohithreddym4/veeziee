"use server"
import {NextResponse} from 'next/server';
import { NextRequest } from 'next/server';

function middleware(request:NextRequest){
    const path=request.nextUrl.pathname;
    const publicPath=path==="/login"||path==="/register"||path==="/forgot";
    const token=request.cookies.get('token')?.value||null;
    if (request.nextUrl.pathname.startsWith("/_next")) {
        return NextResponse.next();
    }
    if(publicPath && token){
        return NextResponse.redirect(new URL('/',request.nextUrl).toString());
    }
    if(!publicPath && !token){
        if(request.nextUrl.pathname.startsWith("/api")
        ||request.nextUrl.pathname.startsWith("/_next")){
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/login',request.nextUrl).toString());
    }
}
const config={
    matcher:[
        '/',
        '/login',
        '/register',
        '/forgot'
    ]
}
export { middleware, config };