"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { ShieldAlert, Plus, Loader2 } from "lucide-react";

interface RoleType {
  _id: string;
  name: string;
  level: number;
  permissions: string[];
}

// All possible system permissions
const SYSTEM_PERMISSIONS = [
  { id: "view_dashboard", label: "View Analytics Dashboard" },
  { id: "manage_orders", label: "Manage Orders & Billing" },
  { id: "manage_menu", label: "Add/Edit Menu Items" },
  { id: "manage_categories", label: "Manage Categories" },
  { id: "manage_messages", label: "Read Customer Messages" },
  { id: "manage_users", label: "Hire & Manage Staff" },
  { id: "manage_roles", label: "Manage System Roles" },
];

export default function RolesPage() {
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [level, setLevel] = useState(2); // Default to Staff level
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const fetchRoles = async () => {
    try {
      const res = await fetch("/api/roles");
      const data = await res.json();
      setRoles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRoles(); }, []);

  const handleCheckboxChange = (id: string) => {
    if (selectedPermissions.includes(id)) {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== id));
    } else {
      setSelectedPermissions([...selectedPermissions, id]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, level, permissions: selectedPermissions }),
      });

      if (!res.ok) throw new Error("Failed to create role");

      setName("");
      setLevel(2);
      setSelectedPermissions([]);
      fetchRoles();
    } catch (err) {
      alert("Error creating role");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Sidebar>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">System Roles & Permissions</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Create Role Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl border h-fit">
            <h2 className="text-xl font-bold mb-4">Create Custom Role</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Role Name</label>
                <input type="text" required placeholder="e.g. Cashier" className="w-full border p-3 rounded-xl outline-none" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Hierarchy Level</label>
                <select className="w-full border p-3 rounded-xl outline-none bg-white" value={level} onChange={(e) => setLevel(Number(e.target.value))}>
                  <option value={1}>Admin / Manager (Level 1)</option>
                  <option value={2}>Staff / Cashier (Level 2)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Granted Permissions</label>
                <div className="space-y-2 border p-3 rounded-xl max-h-48 overflow-y-auto bg-gray-50">
                  {SYSTEM_PERMISSIONS.map((perm) => (
                    <div key={perm.id} className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id={perm.id} 
                        checked={selectedPermissions.includes(perm.id)} 
                        onChange={() => handleCheckboxChange(perm.id)} 
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <label htmlFor={perm.id} className="text-sm text-gray-700 font-medium">{perm.label}</label>
                    </div>
                  ))}
                </div>
              </div>

              <button disabled={submitting} type="submit" className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 flex justify-center items-center gap-2">
                {submitting ? <Loader2 className="animate-spin" /> : <><Plus size={20} /> Create Role</>}
              </button>
            </form>
          </div>

          {/* Roles Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl border overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading roles...</div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                  <tr>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Level</th>
                    <th className="px-6 py-4">Active Permissions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {roles.map((role) => (
                    <tr key={role._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-bold text-gray-900">{role.name}</td>
                      <td className="px-6 py-4"><span className="bg-gray-100 text-gray-700 font-bold px-2 py-1 rounded text-xs">Lvl {role.level}</span></td>
                      <td className="px-6 py-4 flex flex-wrap gap-1 max-w-sm">
                        {role.permissions.map((p) => (
                          <span key={p} className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded">
                            {p.replace("_", " ")}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </div>
    </Sidebar>
  );
}