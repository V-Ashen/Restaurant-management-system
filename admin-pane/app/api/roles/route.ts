import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Role } from "@/models/Role";

// GET: Fetch all roles
export async function GET() {
  try {
    await connectToDatabase();
    const roles = await Role.find({}).sort({ level: 1 });
    return NextResponse.json(roles, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch roles" }, { status: 500 });
  }
}

// POST: Create a new custom role
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { name, level, permissions } = await req.json();

    if (!name || level === undefined) {
      return NextResponse.json({ error: "Name and level are required" }, { status: 400 });
    }

    const newRole = await Role.create({ name, level, permissions });
    return NextResponse.json(newRole, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create role" }, { status: 500 });
  }
}