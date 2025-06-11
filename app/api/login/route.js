import { connectDB } from "@/lib/config/db";
import registerUser from "@/lib/models/registerUser";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function POST(request) {
    try {
        await connectDB();

        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "Please fill all the fields" },
                { status: 400 }
            );
        }

        const existingUser = await registerUser.findOne({ email });

        if (!existingUser) {
            return NextResponse.json(
                { message: "User does not exist" },
                { status: 400 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid password" },
                { status: 400 }
            );
        }

        // Use JWT_SECRET or fallback to NEXTAUTH_SECRET
        const secret = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET;
        if (!secret) {
            throw new Error("JWT secret is not defined in environment variables.");
        }

        const token = jwt.sign(
            { userId: existingUser._id, email: existingUser.email },
            secret,
            { expiresIn: '1h' }
        );

        return NextResponse.json(
            { message: "Login successful", token: token },
            { status: 200 }
        );
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}