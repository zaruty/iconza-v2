import { MOCK_STUDENT } from "@/app/lib/app/mock-student";
import { GlassPanel } from "./glass-panel";

export function ProfileHeader() {
  return (
    <div className="profile-header">
      <div className="profile-header__avatar" aria-hidden>
        {MOCK_STUDENT.firstName.charAt(0)}
      </div>
      <h1 className="profile-header__name font-display">{MOCK_STUDENT.fullName}</h1>
      <p className="profile-header__level font-subtitle">
        {MOCK_STUDENT.level} · {MOCK_STUDENT.xp} XP
      </p>
      <GlassPanel className="profile-header__bio">
        <p className="font-subtitle">{MOCK_STUDENT.bio}</p>
      </GlassPanel>
    </div>
  );
}
