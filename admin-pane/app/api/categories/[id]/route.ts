import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Category } from "@/models/Category";

// PUT: Update a category
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const updatedCategory = await Category.findByIdAndUpdate(params.id, body, { new: true });
    
    if (!updatedCategory) return NextResponse.json({ error: "Category not found" }, { status: 404 });
    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

// DELETE: Delete a category
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const deletedCategory = await Category.findByIdAndDelete(params.id);
    
    if (!deletedCategory) return NextResponse.json({ error: "Category not found" }, { status: 404 });
    return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}