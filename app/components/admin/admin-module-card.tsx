import Link from "next/link";
import type { AdminModule } from "@/app/lib/admin/modules";
import type { AdminCategoryColorKey } from "@/app/lib/admin/category-colors";
import { AdminModuleIcon, AdminNavIcon, type AdminNavIcon as AdminNavIconName } from "./admin-icons";

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
      <h3 className="admin-module-card__title font-subtitle">{module.title}</h3>
      <p className="admin-module-card__desc font-subtitle">{module.description}</p>
    </>
  );

  if (isSoon) {
    return (
      <article
        className="admin-module-card admin-module-card--soon"
        data-category={module.category}
        aria-disabled
      >
        {content}
      </article>
    );
  }

  return (
    <Link
      href={module.href}
      className="admin-module-card"
      data-category={module.category}
    >
      {content}
    </Link>
  );
}

type AdminStatCardProps = {
  label: string;
  value: string;
  hint: string;
  category: AdminCategoryColorKey;
  icon: AdminNavIconName;
};

export function AdminStatCard({
  label,
  value,
  hint,
  category,
  icon,
}: AdminStatCardProps) {
  return (
    <article className="admin-stat-card" data-category={category}>
      <div className="admin-stat-card__head">
        <p className="admin-stat-card__label font-subtitle">{label}</p>
        <AdminNavIcon name={icon} className="admin-stat-card__icon" />
      </div>
      <p className="admin-stat-card__value font-subtitle">{value}</p>
      <p className="admin-stat-card__hint font-subtitle">{hint}</p>
    </article>
  );
}
