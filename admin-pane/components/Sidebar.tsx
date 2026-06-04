"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, Utensils, Tags, ClipboardList, MessageSquare, Users, Shield, LogOut } from "lucide-react";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [adminName, setAdminName] = useState("");
  const [adminRole, setAdminRole] = useState("");
  const [permissions, setPermissions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/login");
      return;
    }
    
    setAdminName(localStorage.getItem("adminName") || "User");
    setAdminRole(localStorage.getItem("adminRole") || "Staff");
    
    // Load permissions from storage
    const storedPerms = localStorage.getItem("adminPermissions");
    if (storedPerms) setPermissions(JSON.parse(storedPerms));
    
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.clear(); // Clears everything securely
    router.push("/login");
  };

  // Define all possible links and their REQUIRED permission
  const navLinks = [
    { name: "Dashboard", href: "/", icon: <LayoutDashboard size={20} />, requiredPerm: "view_dashboard" },
    { name: "Orders & Billing", href: "/orders", icon: <ClipboardList size={20} />, requiredPerm: "manage_orders" },
    { name: "Menu Items", href: "/menu", icon: <Utensils size={20} />, requiredPerm: "manage_menu" },
    { name: "Categories", href: "/categories", icon: <Tags size={20} />, requiredPerm: "manage_categories" },
    { name: "Messages", href: "/messages", icon: <MessageSquare size={20} />, requiredPerm: "manage_messages" },
    { name: "Manage Staff", href: "/users", icon: <Users size={20} />, requiredPerm: "manage_users" },
    { name: "Roles & Perms", href: "/roles", icon: <Shield size={20} />, requiredPerm: "manage_roles" },
  ];

  if (isLoading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-extrabold text-blue-500">Admin<span className="text-white">Panel</span></h2>
          <p className="text-gray-400 text-sm mt-1">{adminName} ({adminRole})</p>
        </div>

        <nav className="flex-grow mt-2">
          <ul className="space-y-2 px-4">
            {navLinks.map((link) => {
              // ONLY SHOW LINK IF USER HAS PERMISSION
              if (!permissions.includes(link.requiredPerm)) return null;

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

      <main className="flex-grow p-8 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
}