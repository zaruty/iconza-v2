"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthAtmosphere } from "@/app/components/auth/auth-atmosphere";
import { IconzaLogo } from "@/app/components/iconza-logo";
import { clearSession, getSession } from "@/app/lib/auth/session";
import type { AuthSession } from "@/app/lib/auth/types";

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const current = getSession();
    if (!current) {
      router.replace("/login");
      return;
    }
    setSession(current);
    setReady(true);
  }, [router]);

  function handleSignOut() {
    clearSession();
    router.push("/login");
  }

  if (!ready || !session) {
    return (
      <div className="auth-page relative flex min-h-[100dvh] items-center justify-center">
        <AuthAtmosphere />
        <span className="auth-spinner relative z-10" aria-label="Carregando" />
      </div>
    );
  }

  return (
    <div className="auth-page relative min-h-[100dvh]">
      <AuthAtmosphere />

      <div className="site-content relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-4 py-12">
        <div className="auth-card content-readability w-full max-w-lg text-center">
          <IconzaLogo className="mx-auto h-8 w-11 text-white/75" />
          <h1 className="auth-card__title font-hero mt-6">
            Olá, {session.user.name ?? "explorador"}
          </h1>
          <p className="auth-card__subtitle font-subtitle mt-3">
            Área privada temporária — mock auth ativo. Em breve, dashboard
            completo com Supabase.
          </p>
          <p className="font-subtitle mt-4 text-sm text-white/45">
            {session.user.email} · via {session.provider}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/" className="btn-outline-premium auth-btn-full sm:w-auto">
              Voltar ao site
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="btn-google auth-btn-full sm:w-auto"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
