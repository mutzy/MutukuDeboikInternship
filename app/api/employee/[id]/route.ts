import { NextRequest, NextResponse } from "next/server";
import { mongooseConnection } from "@/lib/mongooseConnection";
import User from "@/models/User";

export async function DELETE(req: NextRequest) {
    try {
        await mongooseConnection();
        
        // Extract the ID from the request body
        const { id } = await req.json(); 
        if (!id) {
            return NextResponse.json({ error: "User ID required" }, { status: 400 });
        }

        // Delete user by ID
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        await mongooseConnection();

        // Extract ID from request body
        const requestBody = await req.json();
        const { id, firstName, lastName, phone, password, ...rest } = requestBody;

        if (!id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        if (password) {
            return NextResponse.json({ error: "Password update is not allowed" }, { status: 400 });
        }

        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { firstName, lastName, phone, ...rest },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: "Error updating user" }, { status: 500 });
    }
}
