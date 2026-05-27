import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const APP_ROUTES = [
  "/dashboard",
  "/perfil",
  "/explorar",
  "/universos",
  "/conquistas",
  "/configuracoes",
] as const;

function isAppRoute(pathname: string) {
  return APP_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

const ONBOARDING_ROUTE = "/onboarding";

function isOnboardingRoute(pathname: string) {
  return (
    pathname === ONBOARDING_ROUTE ||
    pathname.startsWith(`${ONBOARDING_ROUTE}/`)
  );
}

function isOnboardingExcludedRoute(pathname: string) {
  return (
    pathname.startsWith("/admin") ||
    pathname === "/login" ||
    pathname.startsWith("/login/") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/api")
  );
}

function isOnboardingComplete(value: unknown) {
  return value === true;
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
          Object.entries(headers).forEach(([key, value]) =>
            supabaseResponse.headers.set(key, value),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  if (!user && isAppRoute(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (!user && isOnboardingRoute(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (
    user &&
    !isOnboardingExcludedRoute(pathname) &&
    (isAppRoute(pathname) || isOnboardingRoute(pathname))
  ) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarding_complete")
      .eq("id", user.id)
      .maybeSingle();

    const complete = isOnboardingComplete(profile?.onboarding_complete);

    if (isAppRoute(pathname) && !complete) {
      const url = request.nextUrl.clone();
      url.pathname = ONBOARDING_ROUTE;
      return NextResponse.redirect(url);
    }

    if (isOnboardingRoute(pathname) && complete) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
