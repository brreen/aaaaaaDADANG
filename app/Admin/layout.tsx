import Sidebar from "../../components/Sidebar/page";

export default function AdminLayout({ children,}: {children: React.ReactNode;}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}