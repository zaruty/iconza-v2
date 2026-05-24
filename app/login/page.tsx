import type { Metadata } from "next";
import { AuthShell } from "@/app/components/auth/auth-shell";
import { LoginForm } from "@/app/components/auth/login-form";

export const metadata: Metadata = {
  title: "Entrar — ICONZA",
  description: "Acesse sua conta ICONZA e explore universos criativos com IA.",
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Bem-vindo de volta"
      subtitle="Entre na sua conta e continue explorando universos criativos."
    >
      <LoginForm />
    </AuthShell>
  );
}
