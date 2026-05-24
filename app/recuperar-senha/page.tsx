import type { Metadata } from "next";
import { AuthShell } from "@/app/components/auth/auth-shell";
import { ResetPasswordForm } from "@/app/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Recuperar senha — ICONZA",
  description: "Recupere o acesso à sua conta ICONZA.",
};

export default function RecuperarSenhaPage() {
  return (
    <AuthShell
      title="Recuperar senha"
      subtitle="Informe seu e-mail e enviaremos um link para redefinir sua senha."
    >
      <ResetPasswordForm />
    </AuthShell>
  );
}
