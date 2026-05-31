"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AuthDivider,
  AuthFooterLink,
  AuthMessage,
  GoogleButton,
  SubmitButton,
} from "@/app/components/auth/auth-controls";
import { AuthInput } from "@/app/components/auth/auth-input";
import { APP_ROUTES } from "@/app/lib/app/routes";
import { signInWithEmail, signInWithGoogle } from "@/app/lib/auth";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const isBusy = loading || googleLoading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signInWithEmail({ email, password });
    setLoading(false);

    if (!result.success) {
      setError(result.error ?? "Não foi possível entrar.");
      return;
    }

    router.push(APP_ROUTES.dashboard);
    router.refresh();
  }

  async function handleGoogle() {
    setError("");
    setGoogleLoading(true);

    const result = await signInWithGoogle();
    setGoogleLoading(false);

    if (!result.success) {
      setError(result.error ?? "Não foi possível conectar com Google.");
    }
  }

  return (
    <>
      <GoogleButton loading={googleLoading} onClick={handleGoogle} />

      <AuthDivider />

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {error ? <AuthMessage type="error">{error}</AuthMessage> : null}

        <AuthInput
          label="E-mail"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isBusy}
          required
        />

        <AuthInput
          label="Senha"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isBusy}
          required
        />

        <div className="flex justify-end">
          <AuthFooterLink href={APP_ROUTES.recoverPassword}>
            Esqueceu a senha?
          </AuthFooterLink>
        </div>

        <SubmitButton loading={loading}>Entrar</SubmitButton>
      </form>

      <p className="auth-footer font-subtitle">
        Ainda não tem conta?{" "}
        <AuthFooterLink href={APP_ROUTES.cadastro}>Criar conta</AuthFooterLink>
      </p>
    </>
  );
}
