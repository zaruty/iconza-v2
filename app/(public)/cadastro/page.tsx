import type { Metadata } from "next";
import { AuthShell } from "@/app/components/auth/auth-shell";
import { SignUpForm } from "@/app/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Criar conta — ICONZA",
  description: "Cadastre-se na ICONZA e comece a criar ícones com inteligência artificial.",
};

export default function CadastroPage() {
  return (
    <AuthShell
      title="Crie sua conta"
      subtitle="Junte-se à ICONZA e descubra universos visuais para mentes criativas."
    >
      <SignUpForm />
    </AuthShell>
  );
}
