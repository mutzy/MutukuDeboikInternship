import {mongooseConnection} from "@/lib/mongooseConnection";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req:NextRequest){
    try{
        await mongooseConnection();

        const {firstName, lastName, email, password} = await req.json();
        const hashedPwd = await bcrypt.hash(password,10);

        
        await User.create({
            firstName, lastName, email, role: 'staff', password:hashedPwd 
        });

        return NextResponse.json({
            message: "User registered"
        },{status:201});
    }catch(error){
        return NextResponse.json({
            message:"error occured",error
        },{status: 500})
    }
}