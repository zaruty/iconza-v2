import { BottomNav } from "@/app/components/app/BottomNav";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="app-shell min-h-full">
      <BottomNav />
      <main className="app-main">{children}</main>
    </div>
  );
}
