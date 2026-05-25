import type { Metadata } from "next";
import { AppScreen } from "@/app/components/app/app-screen";
import { AppThemeToggle } from "@/app/components/app/app-theme-toggle";

export const metadata: Metadata = {
  title: "Configurações — ICONZA",
};

export default function ConfiguracoesPage() {
  return (
    <AppScreen layout="default">
      <header className="studio-intro studio-intro--compact">
        <p className="studio-eyebrow font-subtitle">Preferências</p>
        <h1 className="studio-title font-display">Configurações</h1>
        <p className="studio-lead font-subtitle">
          Ajuste aparência e preferências da sua experiência no estúdio.
        </p>
      </header>

      <section className="settings-panel">
        <div className="settings-panel__row">
          <div>
            <h2 className="settings-panel__label font-subtitle">Aparência</h2>
            <p className="settings-panel__hint font-subtitle">
              Alterne entre modo claro e escuro.
            </p>
          </div>
          <AppThemeToggle />
        </div>

        <div className="settings-panel__row settings-panel__row--muted">
          <div>
            <h2 className="settings-panel__label font-subtitle">Conta</h2>
            <p className="settings-panel__hint font-subtitle">
              Gerenciamento de perfil e segurança em breve.
            </p>
          </div>
        </div>

        <div className="settings-panel__row settings-panel__row--muted">
          <div>
            <h2 className="settings-panel__label font-subtitle">Notificações</h2>
            <p className="settings-panel__hint font-subtitle">
              Preferências de alertas e novidades em breve.
            </p>
          </div>
        </div>
      </section>
    </AppScreen>
  );
}
