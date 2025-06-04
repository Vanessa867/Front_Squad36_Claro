import SideNav from '@/app/Dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <aside className="w-full md:w-64 flex-shrink-0">
        <SideNav />
      </aside>
      <main className="flex-grow overflow-auto p-6 md:p-12 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
