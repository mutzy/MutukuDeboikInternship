import { NextRequest, NextResponse } from "next/server";
import { mongooseConnection } from "@/lib/mongooseConnection";
import User from "@/models/User";
import bcrypt from "bcryptjs";

interface Params {
    id: string;
  }

interface UserInter {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    roles: string[]; 
  }

// create a new employee
export async function POST(req: NextRequest) {
  await mongooseConnection();
  
  try {
    const { firstName, lastName, email, phone, role, password } = await req.json();
    const hashedPwd = await bcrypt.hash(password,10);
    
    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !role || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    // Create new user
    const newUser = new User({ firstName, lastName, email, phone, role, password: hashedPwd });
    await newUser.save();

    return NextResponse.json({ message: "User added successfully", user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error adding user", error }, { status: 500 });
  }
}

// Get all user details from mongoDb 
export async function GET() {
  try {
    await mongooseConnection();
    const users = await User.find({}).select("_id firstName lastName email phone role");

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
  }
}
