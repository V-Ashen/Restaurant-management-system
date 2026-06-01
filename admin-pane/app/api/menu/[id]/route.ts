import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { MenuItem } from "@/models/MenuItem";

// GET: Fetch a single menu item (For "Dynamic food details page")
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const menuItem = await MenuItem.findById(params.id).populate("category");
    
    if (!menuItem) return NextResponse.json({ error: "Menu item not found" }, { status: 404 });
    return NextResponse.json(menuItem, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch menu item" }, { status: 500 });
  }
}

// PUT: Update a menu item (e.g., toggle availability)
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(params.id, body, { new: true });
    
    if (!updatedMenuItem) return NextResponse.json({ error: "Menu item not found" }, { status: 404 });
    return NextResponse.json(updatedMenuItem, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update menu item" }, { status: 500 });
  }
}

// DELETE: Delete a menu item
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const deletedMenuItem = await MenuItem.findByIdAndDelete(params.id);
    
    if (!deletedMenuItem) return NextResponse.json({ error: "Menu item not found" }, { status: 404 });
    return NextResponse.json({ message: "Menu item deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 });
  }
}