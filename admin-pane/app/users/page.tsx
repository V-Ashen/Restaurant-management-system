"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { UserPlus, Loader2, Edit, Trash2 } from "lucide-react";

interface RoleType {
  _id: string;
  name: string;
  level: number;
}

interface StaffType {
  _id: string;
  name: string;
  email: string;
  role: RoleType;
}

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffType[]>([]);
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [myLevel, setMyLevel] = useState<number>(2); // Default to low rank safety

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "" });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const [staffRes, rolesRes] = await Promise.all([
        fetch("/api/users"),
        fetch("/api/roles")
      ]);
      setStaff(await staffRes.json());
      setRoles(await rolesRes.json());
      
      const level = localStorage.getItem("adminLevel");
      if (level !== null) setMyLevel(Number(level));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const url = isEditing ? `/api/users/${editId}` : "/api/users";
    const method = isEditing ? "PUT" : "POST";
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Send JWT token for security verification
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Operation failed");

      setFormData({ name: "", email: "", password: "", role: "" });
      setIsEditing(false);
      setEditId(null);
      fetchData();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (member: StaffType) => {
    setIsEditing(true);
    setEditId(member._id);
    setFormData({
      name: member.name,
      email: member.email,
      password: "dummy_password", // Password won't be edited here
      role: member.role?._id || ""
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this staff member?")) return;
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(`/api/users/${id}`, { 
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Sidebar>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Manage Restaurant Staff</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Hire / Edit Staff Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl border h-fit">
            <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Member" : "Add Staff Member"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                <input type="text" required className="w-full border p-3 rounded-xl outline-none" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                <input type="email" required className="w-full border p-3 rounded-xl outline-none" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>

              {!isEditing && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
                  <input type="password" required className="w-full border p-3 rounded-xl outline-none" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Assigned Role</label>
                <select required className="w-full border p-3 rounded-xl outline-none bg-white" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                  <option value="" disabled>Select...</option>
                  {roles.map(r => <option key={r._id} value={r._id}>{r.name}</option>)}
                </select>
              </div>

              <div className="flex gap-2">
                <button disabled={submitting} type="submit" className="flex-grow bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 flex justify-center items-center gap-2">
                  {submitting ? <Loader2 className="animate-spin" /> : (isEditing ? "Update Member" : "Add Member")}
                </button>
                {isEditing && (
                  <button type="button" onClick={() => { setIsEditing(false); setEditId(null); setFormData({ name: "", email: "", password: "", role: "" }); }} className="bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-bold">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Staff Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl border overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading staff...</div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {staff.map((member) => {
                    // HIERARCHY RULE: We can only edit/delete if our level is STRICTLY LESS than their level.
                    // e.g. Master Admin (0) can edit Admin (1) -> 0 < 1 (True).
                    // Admin (1) cannot edit Master Admin (0) -> 1 < 0 (False).
                    const canManage = myLevel < (member.role?.level ?? 2);

                    return (
                      <tr key={member._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-bold text-gray-900">{member.name}</td>
                        <td className="px-6 py-4 text-gray-600">{member.email}</td>
                        <td className="px-6 py-4">
                          <span className="bg-blue-50 text-blue-600 font-bold px-3 py-1 rounded-full text-xs">
                            {member.role?.name || "Unassigned"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {canManage ? (
                            <div className="flex justify-end gap-2">
                              <button onClick={() => handleEdit(member)} className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors"><Edit size={18} /></button>
                              <button onClick={() => handleDelete(member._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"><Trash2 size={18} /></button>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400 font-medium italic">Protected</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </div>
    </Sidebar>
  );
}