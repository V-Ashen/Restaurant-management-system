"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Trash2, Mail, User, Calendar } from "lucide-react";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await fetch(`/api/contact/${id}`, { method: "DELETE" });
      fetchMessages();
    } catch (error) {
      alert("Failed to delete message");
    }
  };

  return (
    <Sidebar>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Contact Submissions</h1>

        {loading ? (
          <div className="text-gray-500 text-center py-10 font-medium">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
            <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">No messages yet</h2>
            <p className="text-gray-500">When customers use the contact form, their messages will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {messages.map((msg) => (
              <div key={msg._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group">
                <button 
                  onClick={() => handleDelete(msg._id)} 
                  className="absolute top-6 right-6 text-gray-300 hover:text-red-500 transition-colors"
                  title="Delete Message"
                >
                  <Trash2 size={20} />
                </button>
                
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <User size={18} className="text-blue-500" />
                    <span className="font-bold">{msg.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail size={18} className="text-blue-500" />
                    <a href={`mailto:${msg.email}`} className="text-blue-600 hover:underline">{msg.email}</a>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm md:ml-auto">
                    <Calendar size={16} />
                    {new Date(msg.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl text-gray-700 leading-relaxed border border-gray-100">
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Sidebar>
  );
}