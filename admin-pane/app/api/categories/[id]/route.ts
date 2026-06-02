import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Category } from "@/models/Category";

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const params = await context.params;
    const body = await req.json();
    const updatedCategory = await Category.findByIdAndUpdate(params.id, body, { returnDocument: 'after' });
    
    if (!updatedCategory) return NextResponse.json({ error: "Category not found" }, { status: 404 });
    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const params = await context.params;
    const deletedCategory = await Category.findByIdAndDelete(params.id);
    
    if (!deletedCategory) return NextResponse.json({ error: "Category not found" }, { status: 404 });
    return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}