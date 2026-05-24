type AppPlaceholderPageProps = {
  title: string;
  description?: string;
};

export function AppPlaceholderPage({
  title,
  description = "Conteúdo em desenvolvimento.",
}: AppPlaceholderPageProps) {
  return (
    <div className="app-page">
      <div className="app-page__inner">
        <p className="app-page__eyebrow font-subtitle">ICONZA App</p>
        <h1 className="app-page__title font-display">{title}</h1>
        <p className="app-page__desc font-subtitle">{description}</p>
      </div>
    </div>
  );
}
