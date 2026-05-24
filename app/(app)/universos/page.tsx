import type { Metadata } from "next";
import { AppPlaceholderPage } from "@/app/components/app/app-placeholder-page";

export const metadata: Metadata = {
  title: "Universos — ICONZA",
};

export default function UniversosPage() {
  return (
    <AppPlaceholderPage
      title="Universos"
      description="ICONMIND, ICONLOVE, ICONETHNIA, ICONFOOD e ICONART em breve aqui."
    />
  );
}
