import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import FoundItem from "@/models/FoundItem";

// Handles reporting a new item
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Create item in MongoDB
    const newItem = await FoundItem.create(body);

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to create item",
      },
      { status: 500 }
    );
  }
}

// Handles fetching items for the dashboard
export async function GET() {
  try {
    await connectDB();
    const items = await FoundItem.find({}).sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
