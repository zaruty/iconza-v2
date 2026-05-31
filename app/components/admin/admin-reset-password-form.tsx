"use client";

import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminLoginShell } from "@/app/components/admin/admin-login-form";
import { ADMIN_ROUTES } from "@/app/lib/admin/routes";
import {
  getAdminRecoverySession,
  updateAdminPassword,
} from "@/app/lib/admin/supabase-auth";

type AdminPasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  autoComplete: "new-password";
};

function AdminPasswordField({
  id,
  label,
  value,
  onChange,
  disabled,
  autoComplete,
}: AdminPasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="admin-field">
      <label htmlFor={id} className="admin-field__label">
        {label}
      </label>
      <div className="admin-input-wrap">
        <input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          placeholder="••••••••"
          className="admin-input admin-input--password"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          required
          minLength={8}
        />
        <button
          type="button"
          className="admin-input-toggle"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
          disabled={disabled}
        >
          {visible ? (
            <EyeOff size={18} aria-hidden />
          ) : (
            <Eye size={18} aria-hidden />
          )}
        </button>
      </div>
    </div>
  );
}

export function AdminResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function checkRecoverySession() {
      const hasSession = await getAdminRecoverySession();
      if (cancelled) return;

      if (!hasSession) {
        router.replace(`${ADMIN_ROUTES.login}?error=recovery_expired`);
        return;
      }

      setCheckingSession(false);
    }

    void checkRecoverySession();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    const result = await updateAdminPassword(password);
    setLoading(false);

    if (!result.success) {
      setError(result.error ?? "Não foi possível redefinir a senha.");
      return;
    }

    router.push(ADMIN_ROUTES.dashboard);
    router.refresh();
  }

  if (checkingSession) {
    return (
      <AdminLoginShell>
        <div className="admin-loading" aria-label="Verificando sessão">
          <span className="admin-spinner admin-spinner--lg" aria-hidden />
        </div>
      </AdminLoginShell>
    );
  }

  return (
    <AdminLoginShell>
      <form className="admin-login-form" onSubmit={handleSubmit} noValidate>
        {error ? (
          <p className="admin-alert admin-alert--error" role="alert">
            {error}
          </p>
        ) : null}

        <AdminPasswordField
          id="admin-new-password"
          label="Nova senha"
          value={password}
          onChange={setPassword}
          disabled={loading}
          autoComplete="new-password"
        />

        <AdminPasswordField
          id="admin-confirm-password"
          label="Confirmar senha"
          value={confirmPassword}
          onChange={setConfirmPassword}
          disabled={loading}
          autoComplete="new-password"
        />

        <button
          type="submit"
          className="admin-btn admin-btn--primary"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="admin-spinner" aria-hidden />
              Redefinindo...
            </>
          ) : (
            "Redefinir senha"
          )}
        </button>
      </form>
    </AdminLoginShell>
  );
}
