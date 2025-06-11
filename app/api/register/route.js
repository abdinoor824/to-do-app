import { connectDB } from "@/lib/config/db";
import registerUser from "@/lib/models/registerUser";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Please fill all the fields" },
        { status: 400 }
      );
    }

    const existingUser = await registerUser.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new registerUser({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
