import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/models/Order";

// PUT: Update order status (Pending -> Preparing -> Ready -> Completed)
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { status } = await req.json();
    
    const updatedOrder = await Order.findByIdAndUpdate(params.id, { status }, { new: true });
    
    if (!updatedOrder) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

// DELETE: Delete an order if needed (Admin only)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const deletedOrder = await Order.findByIdAndDelete(params.id);
    
    if (!deletedOrder) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    return NextResponse.json({ message: "Order deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}