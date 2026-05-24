import Link from "next/link";
import type { AdminModule } from "@/app/lib/admin/modules";
import { AdminModuleIcon } from "./admin-icons";

type AdminModuleCardProps = {
  module: AdminModule;
};

export function AdminModuleCard({ module }: AdminModuleCardProps) {
  const isSoon = module.status === "coming-soon";

  const content = (
    <>
      <div className="admin-module-card__head">
        <span className="admin-module-card__icon-wrap">
          <AdminModuleIcon name={module.icon} className="admin-module-card__icon" />
        </span>
        {isSoon ? (
          <span className="admin-module-card__status">Em breve</span>
        ) : null}
      </div>
      <h3 className="admin-module-card__title font-display">{module.title}</h3>
      <p className="admin-module-card__desc font-subtitle">{module.description}</p>
    </>
  );

  if (isSoon) {
    return (
      <article className="admin-module-card admin-module-card--soon" aria-disabled>
        {content}
      </article>
    );
  }

  return (
    <Link href={module.href} className="admin-module-card">
      {content}
    </Link>
  );
}

type AdminStatCardProps = {
  label: string;
  value: string;
  hint: string;
};

export function AdminStatCard({ label, value, hint }: AdminStatCardProps) {
  return (
    <article className="admin-stat-card">
      <p className="admin-stat-card__label font-subtitle">{label}</p>
      <p className="admin-stat-card__value font-display">{value}</p>
      <p className="admin-stat-card__hint font-subtitle">{hint}</p>
    </article>
  );
}
