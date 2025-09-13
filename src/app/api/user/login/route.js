import { dbConnect } from "@/lib/dbConnect"
import { NextResponse } from "next/server"

export const GET=async(req)=>{
    try {
       await dbConnect()
        return NextResponse.json({success:true,
            message:'mongodb connected successfully'
        })
        
    } catch (error) {
        throw new Error(error)
    }

}