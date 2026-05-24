"use client";

import { useState } from "react";
import {
  AuthFooterLink,
  AuthMessage,
  SubmitButton,
} from "@/app/components/auth/auth-controls";
import { AuthInput } from "@/app/components/auth/auth-input";
import { resetPassword } from "@/app/lib/auth/mock-auth";

export function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    const result = await resetPassword({ email });
    setLoading(false);

    if (!result.success) {
      setError(result.error ?? "Não foi possível enviar o link.");
      return;
    }

    setSuccess(true);
  }

  return (
    <>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {error ? <AuthMessage type="error">{error}</AuthMessage> : null}
        {success ? (
          <AuthMessage type="success">
            Se o e-mail existir, você receberá um link para redefinir sua senha.
          </AuthMessage>
        ) : null}

        <AuthInput
          label="E-mail"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />

        <SubmitButton loading={loading}>Enviar link de recuperação</SubmitButton>
      </form>

      <p className="auth-footer font-subtitle">
        Lembrou a senha?{" "}
        <AuthFooterLink href="/login">Voltar ao login</AuthFooterLink>
      </p>
    </>
  );
}
