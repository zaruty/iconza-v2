import type { Metadata } from "next";
import { AdminRecoverPasswordForm } from "@/app/components/admin/admin-recover-password-form";

export const metadata: Metadata = {
  title: "Recuperar senha — Admin ICONZA",
  description: "Recuperação de senha do painel administrativo ICONZA.",
  robots: { index: false, follow: false },
};

export default function AdminRecoverPasswordPage() {
  return <AdminRecoverPasswordForm />;
}
