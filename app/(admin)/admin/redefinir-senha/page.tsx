import type { Metadata } from "next";
import { AdminResetPasswordForm } from "@/app/components/admin/admin-reset-password-form";

export const metadata: Metadata = {
  title: "Redefinir senha — Admin ICONZA",
  description: "Defina uma nova senha para o painel administrativo ICONZA.",
  robots: { index: false, follow: false },
};

export default function AdminResetPasswordPage() {
  return <AdminResetPasswordForm />;
}
