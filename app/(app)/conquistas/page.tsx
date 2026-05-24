import type { Metadata } from "next";
import { AppPlaceholderPage } from "@/app/components/app/app-placeholder-page";

export const metadata: Metadata = {
  title: "Conquistas — ICONZA",
};

export default function ConquistasPage() {
  return (
    <AppPlaceholderPage
      title="Conquistas"
      description="Badges, streaks e progresso gamificado aparecerão aqui."
    />
  );
}
