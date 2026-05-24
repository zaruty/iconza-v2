"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/app/components/theme/theme-toggle";
import { useAdminTheme } from "@/app/components/admin/admin-theme-provider";
import { getAdminSession } from "@/app/lib/admin/session";
import { signInAdmin } from "@/app/lib/admin/mock-auth";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (getAdminSession()) {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signInAdmin({ email, password, remember });
    setLoading(false);

    if (!result.success) {
      setError(result.error ?? "Não foi possível autenticar.");
      return;
    }

    router.push("/admin/dashboard");
  }

  return (
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
          placeholder="admin@iconza.com"
          className="admin-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
      </div>

      <div className="admin-field">
        <label htmlFor="admin-password" className="admin-field__label">
          Senha
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          className="admin-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
      </div>

      <label className="admin-checkbox">
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          disabled={loading}
        />
        <span>Lembrar acesso neste dispositivo</span>
      </label>

      <button type="submit" className="admin-btn admin-btn--primary" disabled={loading}>
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
        Acesso restrito. Ambiente mock — substituir por auth server-side em
        produção.
      </p>
    </form>
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
            <span className="admin-brand__text font-display">ICONZA</span>
          </Link>
          <div className="admin-login-aside__copy">
            <p className="admin-login-aside__eyebrow font-subtitle">
              Painel administrativo
            </p>
            <h1 className="admin-login-aside__title font-display">
              Controle total da plataforma
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
              <span className="admin-brand__text font-display">ICONZA</span>
            </Link>
            <div className="admin-login-card__header">
              <h2 className="admin-login-card__title font-display">
                Acesso admin
              </h2>
              <p className="admin-login-card__subtitle font-subtitle">
                Entre com credenciais administrativas
              </p>
            </div>
            {children}
          </div>
        </section>
      </div>
    </div>
  );
}
