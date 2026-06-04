import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { AdminUser } from "@/models/AdminUser";
import { Role } from "@/models/Role"; // Ensure schema compiles
import bcrypt from "bcryptjs";

// GET: Fetch all registered staff members
export async function GET() {
  try {
    await connectToDatabase();
    const _roleCheck = await Role.findOne({}); // Force compile
    
    const users = await AdminUser.find({}).populate("role").sort({ createdAt: -1 });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch staff" }, { status: 500 });
  }
}

// POST: Register a new staff member with an assigned role
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const existingUser = await AdminUser.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await AdminUser.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create staff member" }, { status: 500 });
  }
}