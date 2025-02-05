import { NextResponse } from "next/server";
import supabase from "./src/app/config/supabase";


export async function middleware(req: Request) {
  const { data} = await supabase.auth.getSession();
  // console.log('session', session);
  console.log("data", data);
  
  if (!data.session) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], 
};
