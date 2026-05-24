import type { Metadata } from "next";
import {
  ADMIN_MODULE_CATEGORIES,
  getModulesByCategory,
} from "@/app/lib/admin/modules";
import {
  AdminModuleCard,
  AdminStatCard,
} from "@/app/components/admin/admin-module-card";

export const metadata: Metadata = {
  title: "Dashboard Admin — ICONZA",
  description: "Visão geral do painel administrativo ICONZA.",
  robots: { index: false, follow: false },
};

const CATEGORY_ORDER = [
  "content",
  "people",
  "platform",
  "business",
] as const;

export default function AdminDashboardPage() {
  return (
    <div className="admin-dashboard">
      <section className="admin-dashboard__intro">
        <p className="admin-dashboard__eyebrow font-subtitle">Visão geral</p>
        <h2 className="admin-dashboard__title font-subtitle">
          Central de gestão
        </h2>
        <p className="admin-dashboard__subtitle font-subtitle">
          Conteúdo, usuários e monetização — separado da jornada gamificada do
          aluno.
        </p>
      </section>

      <section className="admin-stats-grid" aria-label="Indicadores">
        <AdminStatCard
          label="Usuários ativos"
          value="—"
          hint="Integração analytics pendente"
        />
        <AdminStatCard
          label="Aulas publicadas"
          value="—"
          hint="Módulo de aulas em desenvolvimento"
        />
        <AdminStatCard
          label="Universos"
          value="5"
          hint="ICONMIND, ICONLOVE, ICONETHNIA, ICONFOOD, ICONART"
        />
        <AdminStatCard
          label="Receita mensal"
          value="—"
          hint="Módulo monetização em breve"
        />
      </section>

      {CATEGORY_ORDER.map((category) => {
        const meta = ADMIN_MODULE_CATEGORIES[category];
        const modules = getModulesByCategory(category);

        return (
          <section key={category} className="admin-module-section">
            <div className="admin-module-section__head">
              <h3 className="admin-module-section__title font-subtitle">
                {meta.label}
              </h3>
              <p className="admin-module-section__desc font-subtitle">
                {meta.description}
              </p>
            </div>
            <div className="admin-module-grid">
              {modules.map((module) => (
                <AdminModuleCard key={module.id} module={module} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
