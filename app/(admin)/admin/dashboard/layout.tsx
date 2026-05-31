import { requireAdminPanelUser } from "@/app/lib/admin/require-admin";
import { AdminShell } from "@/app/components/admin/admin-shell";

export default async function AdminDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await requireAdminPanelUser();

  return (
    <div data-panel-role={user.role}>
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
