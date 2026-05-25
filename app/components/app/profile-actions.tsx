"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/app/lib/auth/use-user";

export function ProfileActions() {
  const router = useRouter();
  const { signOut } = useUser();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    await signOut();
    router.push("/login");
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
