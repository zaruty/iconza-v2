import { MOCK_STUDENT } from "@/app/lib/app/mock-student";

export function ProfileHeader() {
  return (
    <header className="profile-identity">
      <div className="profile-identity__main">
        <div className="profile-identity__avatar" aria-hidden>
          {MOCK_STUDENT.firstName.charAt(0)}
        </div>
        <div className="profile-identity__copy">
          <h1 className="profile-identity__name font-display">
            {MOCK_STUDENT.fullName}
          </h1>
          <p className="profile-identity__role font-subtitle">
            {MOCK_STUDENT.level}
          </p>
          <p className="profile-identity__bio font-subtitle">{MOCK_STUDENT.bio}</p>
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
