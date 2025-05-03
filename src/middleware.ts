import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "@/utils/supabase/server";

async function checkSession() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
  return data.session !== null;
}

export async function middleware(request: NextRequest) {
  // Only redirect from exact root path to /journal when authenticated
  if (request.nextUrl.pathname === "/") {
    if (await checkSession()) {
      console.log("User is authenticated.");
      return NextResponse.redirect(new URL("/journal", request.url));
    }
  }

  // Protect /journal route - redirect to / if not authenticated
  if (request.nextUrl.pathname === "/journal") {
    if (!(await checkSession())) {
      console.log(
        "User is not authenticated, redirecting from journal to home."
      );
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // update user's auth session
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/", // Match the root path
    "/journal",
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
