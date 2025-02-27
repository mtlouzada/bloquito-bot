import { connectToDatabase } from "@/lib/database/mongoose";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    await connectToDatabase()
    try {
        const session:any = await getServerSession(authOptions);
        //const session:any = await getSession();
        console.log("This is the session: ", session);
    
        
    
        const response = NextResponse.json(session, { status: 200 });
        // Allow CORS for frontend at localhost:3001
        response.headers.set("Access-Control-Allow-Origin", "http://localhost:3001");
        response.headers.set("Access-Control-Allow-Credentials", "true");
    
        return response;
    }catch(error){
        console.log("[ERROR API ROUTE][USER-SESSION]: ", error)
        return NextResponse.json({error: error}, { status:200 });
    }
}
