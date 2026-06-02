"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Trash2, Eye, X } from "lucide-react";

interface OrderItem {
  _id: string;
  menuItem: { name: string; price: number };
  quantity: number;
  priceAtTime: number;
}

interface Order {
  _id: string;
  customerName: string;
  phoneNumber: string;
  tableOrAddress: string;
  totalAmount: number;
  paymentMethod: string;
  status: string;
  items: OrderItem[];
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null); // For the details modal

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      fetchOrders();
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      await fetch(`/api/orders/${id}`, { method: "DELETE" });
      fetchOrders();
    } catch (error) {
      alert("Failed to delete order");
    }
  };

  return (
    <Sidebar>
      <div className="max-w-7xl mx-auto relative">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Orders & Billing</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading orders...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                  <tr>
                    <th className="px-6 py-4">Order Details</th>
                    <th className="px-6 py-4">Destination</th>
                    <th className="px-6 py-4">Billing</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{order.customerName}</div>
                        <div className="text-sm text-gray-500">{order.phoneNumber}</div>
                        <div className="text-xs text-gray-400 mt-1">{new Date(order.createdAt).toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-700 font-medium">{order.tableOrAddress}</td>
                      <td className="px-6 py-4">
                        <div className="font-extrabold text-gray-900">${order.totalAmount.toFixed(2)}</div>
                        <div className="text-xs font-bold text-blue-600 uppercase bg-blue-50 inline-block px-2 py-1 rounded mt-1">
                          {order.paymentMethod}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select 
                          value={order.status}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                          className={`text-sm font-bold p-2 rounded-lg outline-none border cursor-pointer
                            ${order.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''}
                            ${order.status === 'Preparing' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                            ${order.status === 'Ready' ? 'bg-purple-50 text-purple-700 border-purple-200' : ''}
                            ${order.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                            ${order.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                          `}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Ready">Ready</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2">
                        <button onClick={() => setSelectedOrder(order)} className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg transition-colors"><Eye size={18} /></button>
                        <button onClick={() => handleDelete(order._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No orders placed yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Order Summary</h2>
                <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-800"><X size={24} /></button>
              </div>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <span className="font-bold">{item.quantity}x</span> {item.menuItem?.name || "Deleted Item"}
                    </div>
                    <div className="text-gray-600 font-medium">
                      ${(item.priceAtTime * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${(selectedOrder.totalAmount / 1.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-gray-500">Tax</span>
                  <span>${(selectedOrder.totalAmount - (selectedOrder.totalAmount / 1.05)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center border-t pt-2 mt-2">
                  <span className="font-bold text-gray-900">Total Paid ({selectedOrder.paymentMethod})</span>
                  <span className="text-xl font-black text-blue-600">${selectedOrder.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </Sidebar>
  );
}