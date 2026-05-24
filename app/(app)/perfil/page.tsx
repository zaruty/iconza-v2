import type { Metadata } from "next";
import { AppPlaceholderPage } from "@/app/components/app/app-placeholder-page";

export const metadata: Metadata = {
  title: "Perfil — ICONZA",
};

export default function PerfilPage() {
  return (
    <AppPlaceholderPage
      title="Perfil"
      description="Configurações da conta e progresso completo em breve."
    />
  );
}
