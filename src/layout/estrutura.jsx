import { Outlet, Link, useLocation } from "react-router-dom";

export default function AppShell(){
  const { pathname } = useLocation();
  const title = pathname === "/login" ? "Entrar" : "Doctor Checks";
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 bg-surface border-b">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="font-semibold">{title}</h1>
          <nav className="text-sm flex gap-4">
            <Link to="/" className="text-accent hover:underline">Home</Link>
            <Link to="/login" className="text-accent hover:underline">Login</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-xl mx-auto p-4"><Outlet/></main>
    </div>
  );
}
