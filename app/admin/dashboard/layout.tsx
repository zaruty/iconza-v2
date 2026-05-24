import { AdminGuard } from "@/app/components/admin/admin-guard";
import { AdminShell } from "@/app/components/admin/admin-shell";

export default function AdminDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AdminGuard>
      <AdminShell>{children}</AdminShell>
    </AdminGuard>
  );
}
