import {mongooseConnection} from "@/lib/mongooseConnection";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req:NextRequest){
    try{
        await mongooseConnection();
        const {email} = await req.json();
        const user = await User.findOne(email).select("_id");
        console.log("user:",user);
        return NextResponse.json({user});
    }catch(error){
        return NextResponse.json({
            message:"error occured"
        },{status: 500})
    }
}