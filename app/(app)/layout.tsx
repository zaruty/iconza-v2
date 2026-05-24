export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="app-root min-h-full">{children}</div>;
}
