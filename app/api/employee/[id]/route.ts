import { NextRequest, NextResponse } from "next/server";
import { mongooseConnection } from "@/lib/mongooseConnection";
import User from "@/models/User"; 

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await mongooseConnection();
        
        const { id } = params; 
        if (!id) {
            return NextResponse.json({ error: "User ID required" }, { status: 400 });
        }

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


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await mongooseConnection();

        const { id } = params;
        if (!id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const requestBody = await req.json();
        const { firstName, lastName, phone, password, ...rest } = requestBody;

        // Ensure the password field is not updated
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
