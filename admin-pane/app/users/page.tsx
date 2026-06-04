"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Plus, UserPlus, Loader2 } from "lucide-react";

interface RoleType {
  _id: string;
  name: string;
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

  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "" });

  const fetchData = async () => {
    try {
      const [staffRes, rolesRes] = await Promise.all([
        fetch("/api/users"),
        fetch("/api/roles")
      ]);
      setStaff(await staffRes.json());
      
      const rolesData = await rolesRes.json();
      setRoles(rolesData);
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

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add staff");

      setFormData({ name: "", email: "", password: "", role: "" });
      fetchData();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Sidebar>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Manage Restaurant Staff</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Hire Staff Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl border h-fit">
            <h2 className="text-xl font-bold mb-4">Add Staff Member</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                <input type="text" required className="w-full border p-3 rounded-xl outline-none" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                <input type="email" required className="w-full border p-3 rounded-xl outline-none" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
                <input type="password" required className="w-full border p-3 rounded-xl outline-none" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Assigned Role</label>
                <select required className="w-full border p-3 rounded-xl outline-none bg-white" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                  <option value="" disabled>Select...</option>
                  {roles.map(r => <option key={r._id} value={r._id}>{r.name}</option>)}
                </select>
              </div>

              <button disabled={submitting} type="submit" className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 flex justify-center items-center gap-2">
                {submitting ? <Loader2 className="animate-spin" /> : <><UserPlus size={20} /> Add Member</>}
              </button>
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
                    <th className="px-6 py-4">Assigned Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {staff.map((member) => (
                    <tr key={member._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-bold text-gray-900">{member.name}</td>
                      <td className="px-6 py-4 text-gray-600">{member.email}</td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-50 text-blue-600 font-bold px-3 py-1 rounded-full text-xs">
                          {member.role?.name || "Unassigned"}
                        </span>
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