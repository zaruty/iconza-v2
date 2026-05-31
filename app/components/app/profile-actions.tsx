"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/app/lib/auth/use-user";
import { APP_ROUTES } from "@/app/lib/app/routes";

export function ProfileActions() {
  const router = useRouter();
  const { signOut } = useUser();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    await signOut();
    router.push(APP_ROUTES.login);
    router.refresh();
  }

  return (
    <div className="profile-actions">
      <button type="button" className="studio-btn studio-btn--edit">
        Editar perfil
      </button>
      <button
        type="button"
        className="studio-btn studio-btn--signout"
        onClick={handleSignOut}
        disabled={signingOut}
      >
        {signingOut ? "Saindo..." : "Sair da conta"}
      </button>
    </div>
  );
}
