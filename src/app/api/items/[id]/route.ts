import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import FoundItem from "@/models/FoundItem";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const item = await FoundItem.findById((await params).id);

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 500 });
  }
}
