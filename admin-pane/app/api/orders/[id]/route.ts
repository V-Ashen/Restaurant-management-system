import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/models/Order";

// PUT: Update order status
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    // Await the params object (Required in Next.js 15+)
    const params = await context.params;
    const { status } = await req.json();
    
    // Updated mongoose syntax to fix the deprecation warning
    const updatedOrder = await Order.findByIdAndUpdate(
      params.id, 
      { status }, 
      { returnDocument: 'after' }
    );
    
    if (!updatedOrder) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

// DELETE: Delete an order if needed (Admin only)
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    // Await the params object
    const params = await context.params;
    
    const deletedOrder = await Order.findByIdAndDelete(params.id);
    
    if (!deletedOrder) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    return NextResponse.json({ message: "Order deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}