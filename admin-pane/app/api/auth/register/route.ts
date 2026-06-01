import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { AdminUser } from "@/models/AdminUser";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if admin already exists
    const existingAdmin = await AdminUser.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json({ error: "Admin already exists" }, { status: 400 });
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin
    const newAdmin = await AdminUser.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "Admin created successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create admin" }, { status: 500 });
  }
}