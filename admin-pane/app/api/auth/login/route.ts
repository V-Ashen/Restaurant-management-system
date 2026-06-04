import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { AdminUser } from "@/models/AdminUser";
import { Role } from "@/models/Role"; // Required for populate() to work
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    
    // Quick fix: Sometimes Mongoose needs to "register" the model before populate works.
    // This forces Mongoose to load the Role schema.
    const _roleCheck = await Role.findOne({}); 

    const { email, password } = await req.json();

    // Find user and populate their role
    const admin = await AdminUser.findOne({ email }).populate("role");
    
    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials (User not found)" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials (Password mismatch)" }, { status: 401 });
    }

    // SAFEGUARD: If MongoDB failed to link the role, provide a fallback so it doesn't crash (500)
    const roleLevel = admin.role?.level ?? 0;
    const roleName = admin.role?.name ?? "Master Admin";
    const permissions = admin.role?.permissions ?? [
      "view_dashboard", "manage_menu", "manage_categories", "manage_orders", "manage_messages", "manage_users", "manage_roles"
    ];

    const token = jwt.sign(
      { adminId: admin._id, email: admin.email, roleLevel: roleLevel },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return NextResponse.json({ 
      message: "Login successful", 
      token,
      admin: { 
        name: admin.name, 
        email: admin.email,
        roleName: roleName,
        roleLevel: roleLevel,
        permissions: permissions
      }
    }, { status: 200 });

  } catch (error) {
    // THIS PRINTS THE REAL ERROR TO YOUR VS CODE TERMINAL!
    console.error("🚨 REAL LOGIN ERROR:", error); 
    return NextResponse.json({ error: "Login failed - Check server logs" }, { status: 500 });
  }
}