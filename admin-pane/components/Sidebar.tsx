"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, Utensils, Tags, ClipboardList, MessageSquare, LogOut } from "lucide-react";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminName, setAdminName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Authentication Check
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const name = localStorage.getItem("adminName");
    
    if (!token) {
      router.push("/login"); // Kick to login if no token
    } else {
      setAdminName(name || "Admin");
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    router.push("/login");
  };

  const navLinks = [
    { name: "Dashboard", href: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Menu Items", href: "/menu", icon: <Utensils size={20} /> },
    { name: "Categories", href: "/categories", icon: <Tags size={20} /> },
    { name: "Orders & Billing", href: "/orders", icon: <ClipboardList size={20} /> },
    { name: "Messages", href: "/messages", icon: <MessageSquare size={20} /> },
  ];

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-extrabold text-blue-500">Admin<span className="text-white">Panel</span></h2>
          <p className="text-gray-400 text-sm mt-1">Welcome, {adminName}</p>
        </div>

        <nav className="flex-grow mt-6">
          <ul className="space-y-2 px-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link href={link.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}>
                    {link.icon}
                    <span className="font-medium">{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-gray-800 rounded-xl transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-8 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
}