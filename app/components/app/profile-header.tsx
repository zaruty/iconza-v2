"use client";

import { MOCK_STUDENT } from "@/app/lib/app/mock-student";
import {
  formatProfileLocation,
  getProfileInitial,
} from "@/app/lib/auth/get-profile";
import { useUser } from "@/app/lib/auth/use-user";

export function ProfileHeader() {
  const { user, profile, loading, displayName } = useUser();

  if (loading) {
    return (
      <div className="app-hud-loading">
        <span className="auth-spinner" aria-label="Carregando perfil" />
      </div>
    );
  }

  const location = formatProfileLocation(profile);
  const email = profile?.email ?? user?.email ?? null;
  const telefone = profile?.telefone?.trim() || null;
  const bioParts = [telefone, location, email].filter(Boolean);
  const bio = bioParts.length > 0 ? bioParts.join(" · ") : MOCK_STUDENT.bio;

  return (
    <header className="profile-identity">
      <div className="profile-identity__main">
        <div className="profile-identity__avatar" aria-hidden>
          {getProfileInitial(profile, displayName)}
        </div>
        <div className="profile-identity__copy">
          <h1 className="profile-identity__name font-display">{displayName}</h1>
          <p className="profile-identity__role font-subtitle">
            {MOCK_STUDENT.level}
          </p>
          <p className="profile-identity__bio font-subtitle">{bio}</p>
        </div>
      </div>
      <ul className="profile-identity__stats" aria-label="Resumo">
        <li>
          <span className="profile-identity__stat-value font-subtitle">
            {MOCK_STUDENT.stats.totalXp}
          </span>
          <span className="profile-identity__stat-label font-subtitle">XP</span>
        </li>
        <li>
          <span className="profile-identity__stat-value font-subtitle">
            {MOCK_STUDENT.stats.universesStarted}
          </span>
          <span className="profile-identity__stat-label font-subtitle">
            Universos
          </span>
        </li>
        <li>
          <span className="profile-identity__stat-value font-subtitle">
            {MOCK_STUDENT.stats.achievements}
          </span>
          <span className="profile-identity__stat-label font-subtitle">
            Peças
          </span>
        </li>
      </ul>
    </header>
  );
}
