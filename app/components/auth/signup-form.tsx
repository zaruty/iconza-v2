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
import { signInWithGoogle, signUpWithEmail } from "@/app/lib/auth/mock-auth";

export function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const isBusy = loading || googleLoading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    const result = await signUpWithEmail({ name, email, password });
    setLoading(false);

    if (!result.success) {
      setError(result.error ?? "Não foi possível criar a conta.");
      return;
    }

    router.push("/dashboard");
  }

  async function handleGoogle() {
    setError("");
    setGoogleLoading(true);

    const result = await signInWithGoogle();
    setGoogleLoading(false);

    if (!result.success) {
      setError(result.error ?? "Não foi possível conectar com Google.");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <>
      <GoogleButton loading={googleLoading} onClick={handleGoogle} />

      <AuthDivider />

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {error ? <AuthMessage type="error">{error}</AuthMessage> : null}

        <AuthInput
          label="Nome"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isBusy}
          required
        />

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
          autoComplete="new-password"
          placeholder="Mínimo 6 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isBusy}
          required
        />

        <AuthInput
          label="Confirmar senha"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Repita a senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isBusy}
          required
        />

        <SubmitButton loading={loading}>Criar conta</SubmitButton>
      </form>

      <p className="auth-footer font-subtitle">
        Já possui conta?{" "}
        <AuthFooterLink href="/login">Entrar</AuthFooterLink>
      </p>
    </>
  );
}
