import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { AdminUser } from "@/models/AdminUser";
import { Role } from "@/models/Role";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { name, email, password } = await req.json();

    const existingAdmin = await AdminUser.findOne({ email });
    if (existingAdmin) return NextResponse.json({ error: "User already exists" }, { status: 400 });

    // 1. Check if the "Master Admin" role exists, if not, create it
    let masterRole = await Role.findOne({ level: 0 });
    if (!masterRole) {
      masterRole = await Role.create({
        name: "Master Admin",
        level: 0,
        permissions: ["view_dashboard", "manage_menu", "manage_categories", "manage_orders", "manage_messages", "manage_users", "manage_roles"]
      });
    }

    // 2. Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    await AdminUser.create({
      name,
      email,
      password: hashedPassword,
      role: masterRole._id // Assign Master Admin role
    });

    return NextResponse.json({ message: "Master Admin created successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create admin" }, { status: 500 });
  }
}