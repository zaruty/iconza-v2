import type { Metadata } from "next";
import { AppPlaceholderPage } from "@/app/components/app/app-placeholder-page";

export const metadata: Metadata = {
  title: "Explorar — ICONZA",
};

export default function ExplorarPage() {
  return (
    <AppPlaceholderPage
      title="Explorar"
      description="Descubra trilhas, desafios e novidades da plataforma."
    />
  );
}
