"use client";

import Link from "next/link";
import { useState } from "react";
import { AdminLoginShell } from "@/app/components/admin/admin-login-form";
import { ADMIN_ROUTES } from "@/app/lib/admin/routes";
import { resetAdminPassword } from "@/app/lib/admin/supabase-auth";

export function AdminRecoverPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    const result = await resetAdminPassword(email);
    setLoading(false);

    if (!result.success) {
      setError(result.error ?? "Não foi possível enviar o link.");
      return;
    }

    setSuccess(true);
  }

  return (
    <AdminLoginShell>
      <form className="admin-login-form" onSubmit={handleSubmit} noValidate>
        {error ? (
          <p className="admin-alert admin-alert--error" role="alert">
            {error}
          </p>
        ) : null}

        {success ? (
          <p className="admin-alert admin-alert--success" role="status">
            Se o e-mail existir, você receberá um link para redefinir sua senha
            administrativa.
          </p>
        ) : null}

        <div className="admin-field">
          <label htmlFor="admin-recover-email" className="admin-field__label">
            E-mail administrativo
          </label>
          <input
            id="admin-recover-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="apoiozaruty@gmail.com"
            className="admin-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <button
          type="submit"
          className="admin-btn admin-btn--primary"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="admin-spinner" aria-hidden />
              Enviando...
            </>
          ) : (
            "Enviar link de recuperação"
          )}
        </button>

        <p className="admin-login-footnote font-subtitle">
          <Link href={ADMIN_ROUTES.login} className="admin-link">
            Voltar ao login admin
          </Link>
        </p>
      </form>
    </AdminLoginShell>
  );
}
