import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { AdminUser } from "@/models/AdminUser";
import { Role } from "@/models/Role"; // Ensure schema compiles
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";

// Helper function to securely extract requester's role level from JWT
async function getRequesterLevel(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return decoded.roleLevel; // Returns 0, 1, or 2
  } catch {
    return null;
  }
}

// PUT: Edit a staff member
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const params = await context.params;
    const requesterLevel = await getRequesterLevel(req);

    if (requesterLevel === null) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, email, role } = await req.json();

    const targetUser = await AdminUser.findById(params.id).populate("role");
    if (!targetUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // SAFEGUARD: If target has no role, treat them as Level 99 (lowest rank)
    const targetLevel = targetUser.role?.level ?? 99;

    // HIERARCHY CHECK
    if (requesterLevel >= targetLevel) {
      return NextResponse.json({ error: "Permission denied. You cannot modify a user of equal or higher rank." }, { status: 403 });
    }

    const updatedUser = await AdminUser.findByIdAndUpdate(params.id, { name, email, role }, { new: true });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// DELETE: Delete a staff member
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const params = await context.params;
    const requesterLevel = await getRequesterLevel(req);

    if (requesterLevel === null) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const targetUser = await AdminUser.findById(params.id).populate("role");
    if (!targetUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // SAFEGUARD: If target has no role, treat them as Level 99 (lowest rank)
    const targetLevel = targetUser.role?.level ?? 99;

    // HIERARCHY CHECK
    if (requesterLevel >= targetLevel) {
      return NextResponse.json({ error: "Permission denied. You cannot delete a user of equal or higher rank." }, { status: 403 });
    }

    await AdminUser.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Staff member deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}