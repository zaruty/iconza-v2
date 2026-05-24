import type { Metadata } from "next";
import {
  AdminLoginForm,
  AdminLoginShell,
} from "@/app/components/admin/admin-login-form";

export const metadata: Metadata = {
  title: "Admin Login — ICONZA",
  description: "Acesso administrativo restrito da plataforma ICONZA.",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <AdminLoginShell>
      <AdminLoginForm />
    </AdminLoginShell>
  );
}
