import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { BillingRecord } from "@/models/BillingRecord";

// GET: Fetch all orders for the admin panel
export async function GET() {
  try {
    await connectToDatabase();
    // Populate the menuItem details inside the items array
    const orders = await Order.find({}).populate("items.menuItem").sort({ createdAt: -1 });
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

// POST: Place a new order (Called from the Customer Website)
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { customerName, phoneNumber, tableOrAddress, items, totalAmount, paymentMethod } = body;

    if (!customerName || !items || items.length === 0) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    // 1. Create the Order
    const newOrder = await Order.create({
      customerName,
      phoneNumber,
      tableOrAddress,
      items,
      totalAmount,
      paymentMethod,
      status: "Pending"
    });

    // 2. Automatically generate the Billing Record
    await BillingRecord.create({
      orderId: newOrder._id,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === "Cash" ? "Unpaid" : "Paid" // Example logic
    });

    return NextResponse.json({ message: "Order placed successfully", orderId: newOrder._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}