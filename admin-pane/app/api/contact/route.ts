import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ContactMessage } from "@/models/ContactMessage";

// GET: Fetch all messages for Admin
export async function GET() {
  try {
    await connectToDatabase();
    const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

// POST: Save a new message (From Customer Website)
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newMessage = await ContactMessage.create({ name, email, message });
    return NextResponse.json({ message: "Message sent successfully", data: newMessage }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}