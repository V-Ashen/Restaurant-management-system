import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { MenuItem } from "@/models/MenuItem";

// GET: Fetch menu items (with optional category filtering)
export async function GET(req: Request) {
  try {
    await connectToDatabase();
    
    // Get categoryId from URL if it exists (e.g., /api/menu?categoryId=123)
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");

    const filter = categoryId ? { category: categoryId } : {};

    // .populate('category') fetches the actual category details, not just the ID
    const menuItems = await MenuItem.find(filter).populate("category").sort({ createdAt: -1 });
    return NextResponse.json(menuItems, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 });
  }
}

// POST: Create a new menu item
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { name, price, category, description, imageUrl, isAvailable } = body;

    if (!name || !price || !category) {
      return NextResponse.json({ error: "Name, price, and category are required" }, { status: 400 });
    }

    const newMenuItem = await MenuItem.create({
      name, description, price, category, imageUrl, isAvailable
    });
    
    return NextResponse.json(newMenuItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create menu item" }, { status: 500 });
  }
}