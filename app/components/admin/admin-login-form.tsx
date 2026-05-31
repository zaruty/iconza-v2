"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AuthDivider,
  AuthFooterLink,
  GoogleButton,
} from "@/app/components/auth/auth-controls";
import { ThemeToggle } from "@/app/components/theme/theme-toggle";
import { useAdminTheme } from "@/app/components/admin/admin-theme-provider";
import { ADMIN_ROUTES } from "@/app/lib/admin/routes";
import {
  getAdminClientUser,
  signInAdmin,
  signInAdminWithGoogle,
} from "@/app/lib/admin/supabase-auth";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState("");

  const isBusy = loading || googleLoading || checkingSession;

  useEffect(() => {
    let cancelled = false;

    async function checkExistingSession() {
      const adminUser = await getAdminClientUser();
      if (cancelled) return;

      if (adminUser) {
        router.replace(ADMIN_ROUTES.dashboard);
        return;
      }

      setCheckingSession(false);
    }

    void checkExistingSession();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signInAdmin({ email, password });
    setLoading(false);

    if (!result.success) {
      if (result.denied) {
        router.replace(ADMIN_ROUTES.home);
        return;
      }
      setError(result.error ?? "Não foi possível autenticar.");
      return;
    }

    router.push(ADMIN_ROUTES.dashboard);
    router.refresh();
  }

  async function handleGoogle() {
    setError("");
    setGoogleLoading(true);

    const result = await signInAdminWithGoogle();
    setGoogleLoading(false);

    if (!result.success) {
      setError(result.error ?? "Não foi possível conectar com Google.");
    }
  }

  if (checkingSession) {
    return (
      <div className="admin-loading" aria-label="Verificando sessão">
        <span className="admin-spinner admin-spinner--lg" aria-hidden />
      </div>
    );
  }

  return (
    <>
      <GoogleButton loading={googleLoading} onClick={handleGoogle} />

      <AuthDivider />

      <form className="admin-login-form" onSubmit={handleSubmit} noValidate>
        {error ? (
          <p className="admin-alert admin-alert--error" role="alert">
            {error}
          </p>
        ) : null}

        <div className="admin-field">
          <label htmlFor="admin-email" className="admin-field__label">
            E-mail administrativo
          </label>
          <input
            id="admin-email"
            name="email"
            type="email"
            autoComplete="username"
            placeholder="apoiozaruty@gmail.com"
            className="admin-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isBusy}
            required
          />
        </div>

        <div className="admin-field">
          <div className="admin-field__row">
            <label htmlFor="admin-password" className="admin-field__label">
              Senha
            </label>
            <Link
              href={ADMIN_ROUTES.recoverPassword}
              className="admin-link font-subtitle"
            >
              Esqueci a senha
            </Link>
          </div>
          <input
            id="admin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            className="admin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isBusy}
            required
          />
        </div>

        <button
          type="submit"
          className="admin-btn admin-btn--primary"
          disabled={isBusy}
        >
          {loading ? (
            <>
              <span className="admin-spinner" aria-hidden />
              Autenticando...
            </>
          ) : (
            "Entrar no painel"
          )}
        </button>

        <p className="admin-login-footnote font-subtitle">
          Acesso restrito a contas com role administrativa (admin, editor ou
          founder).
        </p>
      </form>
    </>
  );
}

export function AdminLoginShell({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useAdminTheme();

  return (
    <div className="admin-login-page auth-viewport-min">
      <div className="admin-login-theme-bar">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
      <div className="admin-login-grid">
        <aside className="admin-login-aside">
          <Link href="/" className="admin-brand">
            <span className="admin-brand__mark" aria-hidden />
            <span className="admin-brand__text font-subtitle">ICONZA</span>
          </Link>
          <div className="admin-login-aside__copy">
            <p className="admin-login-aside__eyebrow font-subtitle">
              Administração
            </p>
            <h1 className="admin-login-aside__title font-subtitle">
              Controle da plataforma
            </h1>
            <p className="admin-login-aside__subtitle font-subtitle">
              Gerencie universos, conteúdo, usuários e monetização em um
              ambiente profissional separado da experiência gamificada.
            </p>
          </div>
        </aside>

        <section className="admin-login-panel">
          <div className="admin-login-card">
            <Link href="/" className="admin-brand admin-brand--mobile-only">
              <span className="admin-brand__mark" aria-hidden />
              <span className="admin-brand__text font-subtitle">ICONZA</span>
            </Link>
            <div className="admin-login-card__header">
              <h2 className="admin-login-card__title font-subtitle">
                Acesso admin
              </h2>
              <p className="admin-login-card__subtitle font-subtitle">
                Entre com Google ou credenciais administrativas
              </p>
            </div>
            {children}
          </div>
        </section>
      </div>
    </div>
  );
}
