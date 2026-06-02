"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Plus, Trash2, Edit, Loader2, CheckCircle, XCircle } from "lucide-react";

interface Category {
  _id: string;
  name: string;
}

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  category: Category;
}

export default function MenuManagementPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State (Used for both Adding and Editing)
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
    isAvailable: true
  });

  const fetchData = async () => {
    try {
      const [menuRes, catRes] = await Promise.all([
        fetch("/api/menu"),
        fetch("/api/categories")
      ]);
      setMenuItems(await menuRes.json());
      setCategories(await catRes.json());
    } catch (error) {
      console.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const url = isEditing ? `/api/menu/${editId}` : "/api/menu";
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price) // Convert string to number
        }),
      });
      
      if (!res.ok) throw new Error("Failed to save menu item");
      
      // Reset Form
      setFormData({ name: "", description: "", price: "", category: "", imageUrl: "", isAvailable: true });
      setIsEditing(false);
      setEditId(null);
      fetchData(); // Refresh list
    } catch (error) {
      alert("Error saving menu item");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setIsEditing(true);
    setEditId(item._id);
    setFormData({
      name: item.name,
      description: item.description || "",
      price: item.price.toString(),
      category: item.category?._id || "",
      imageUrl: item.imageUrl || "",
      isAvailable: item.isAvailable
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this menu item?")) return;
    try {
      await fetch(`/api/menu/${id}`, { method: "DELETE" });
      fetchData();
    } catch (error) {
      alert("Failed to delete");
    }
  };

  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    try {
      await fetch(`/api/menu/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: !currentStatus })
      });
      fetchData();
    } catch (error) {
      alert("Failed to update status");
    }
  };

  return (
    <Sidebar>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Menu Management</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Add / Edit Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Menu Item" : "Add New Item"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Food Name</label>
                <input type="text" required className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Price ($)</label>
                  <input type="number" step="0.01" required className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                  <select required className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    <option value="" disabled>Select...</option>
                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Image URL (Optional)</label>
                <input type="text" placeholder="https://example.com/image.jpg" className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                <textarea rows={3} className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="isAvailable" checked={formData.isAvailable} onChange={(e) => setFormData({...formData, isAvailable: e.target.checked})} className="w-5 h-5 text-blue-600 rounded" />
                <label htmlFor="isAvailable" className="font-bold text-gray-700">Item is currently available</label>
              </div>

              <div className="flex gap-2 pt-2">
                <button disabled={isSubmitting} type="submit" className="flex-grow bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 flex justify-center items-center gap-2">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : (isEditing ? "Update Item" : "Add Item")}
                </button>
                {isEditing && (
                  <button type="button" onClick={() => { setIsEditing(false); setFormData({ name: "", description: "", price: "", category: "", imageUrl: "", isAvailable: true }); setEditId(null); }} className="px-4 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Menu Items Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading menu items...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                    <tr>
                      <th className="px-6 py-4">Item</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {menuItems.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <img src={item.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                          <span className="font-bold text-gray-900">{item.name}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{item.category?.name || "N/A"}</td>
                        <td className="px-6 py-4 font-bold text-gray-900">${item.price.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <button onClick={() => toggleAvailability(item._id, item.isAvailable)} className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-colors ${item.isAvailable ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}>
                            {item.isAvailable ? <CheckCircle size={14} /> : <XCircle size={14} />}
                            {item.isAvailable ? "Available" : "Out of Stock"}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                          <button onClick={() => handleEdit(item)} className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors"><Edit size={18} /></button>
                          <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"><Trash2 size={18} /></button>
                        </td>
                      </tr>
                    ))}
                    {menuItems.length === 0 && (
                      <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No menu items found. Add one to get started!</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </Sidebar>
  );
}