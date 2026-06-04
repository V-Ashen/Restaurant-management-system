"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { DollarSign, ShoppingBag, Clock, CheckCircle } from "lucide-react";

interface Order {
  _id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]); // Fallback to empty array if API fails
        }
      } catch (error) {
        console.error("Failed to fetch orders for dashboard");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Safe metric calculations
  const totalRevenue = Array.isArray(orders) ? orders.reduce((sum, order) => sum + order.totalAmount, 0) : 0;
  const totalOrders = Array.isArray(orders) ? orders.length : 0;
  const pendingOrders = Array.isArray(orders) ? orders.filter(o => o.status === "Pending" || o.status === "Preparing").length : 0;
  const completedOrders = Array.isArray(orders) ? orders.filter(o => o.status === "Completed").length : 0;

  return (
    <Sidebar>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Dashboard Overview</h1>

        {loading ? (
          <div className="text-gray-500 font-medium">Loading analytics...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                  <DollarSign size={28} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Revenue</p>
                  <p className="text-3xl font-black text-gray-900">${totalRevenue.toFixed(2)}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                  <ShoppingBag size={28} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Orders</p>
                  <p className="text-3xl font-black text-gray-900">{totalOrders}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                  <Clock size={28} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Active Orders</p>
                  <p className="text-3xl font-black text-gray-900">{pendingOrders}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                  <CheckCircle size={28} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Completed</p>
                  <p className="text-3xl font-black text-gray-900">{completedOrders}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                    <tr>
                      <th className="px-6 py-4">Order ID</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {Array.isArray(orders) && orders.slice(0, 5).map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-mono text-gray-500">{order._id.substring(18)}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900">${order.totalAmount.toFixed(2)}</td>
                      </tr>
                    ))}
                    {(!Array.isArray(orders) || orders.length === 0) && (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No orders placed yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </Sidebar>
  );
}