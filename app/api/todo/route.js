import { connectDB } from "@/lib/config/db";
import TodoModel from "@/lib/models/Todo-model";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// GET: Show only todos belonging to the logged-in user
export async function GET(request) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ todos: [] });
  }

  const userEmail = session.user.email;
  const todos = await TodoModel.find({ userEmail });

  return NextResponse.json({ todos });
}

// POST: Only logged-in users can create todos
export async function POST(request) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }

  const { title, description } = await request.json();

  if (!title || !description) {
    return NextResponse.json({ msg: "Missing fields" }, { status: 400 });
  }

  await TodoModel.create({
    title,
    description,
    isCompleted: false,
    userEmail: session.user.email,
  });

  return NextResponse.json({ msg: "Todo created" });
}

// DELETE: Only deletes todo by ID (no session check for now)
export async function DELETE(request) {
  await connectDB();
  const mongoId = request.nextUrl.searchParams.get("mongoId");

  await TodoModel.findByIdAndDelete(mongoId);

  return NextResponse.json({ msg: "Todo Deleted" });
}

// PUT: Mark todo as completed
export async function PUT(request) {
  await connectDB();
  const mongoId = request.nextUrl.searchParams.get("mongoId");

  await TodoModel.findByIdAndUpdate(mongoId, {
    $set: {
      isCompleted: true,
    },
  });

  return NextResponse.json({ msg: "Todo Completed" });
}