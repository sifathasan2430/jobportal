import { dbConnect } from "@/lib/dbConnect"
import User from "@/model/user.model"
import emailSender from "@/utils/emailSender"
import { userData } from "@/zodSchema/signupSchema"
import bcrypt, { genSalt } from 'bcrypt'

import { NextResponse } from "next/server"

export const POST=async(request)=>{
   await dbConnect()

        const reqBody=await request.json()
//   userData.safeParse(note:data will be sent in object)
             const zodReturn=  userData.safeParse(reqBody)

// zodreturn zodReturn.error.farmate().username._error.when console.log() the below code will be their
            //  {
//   _errors: [],
//   username: { _errors: [ 'Username must be at least 2 characters' ] },
//   email: { _errors: [ 'Please provide a valid email' ] }}

             
            
    
   const {email,username,password}=reqBody
   
let verifyCode=Math.floor(100000 + Math.random()*900000)

 try{
    
    const existingUser=await User.findOne({email})
    if (existingUser && existingUser.isVerified){
          return NextResponse.json({
         success:false,message:'user already exist'
      },{status:409})
    }
    if (existingUser && !existingUser.isVerified){
    
       existingUser.username=username,
     
       existingUser.verifyCode=verifyCode,
       existingUser.verifyCodeExpiry=Date.now()+5*60*1000 
      
      await existingUser.save()
      const response=await emailSender(verifyCode)

          return NextResponse.json({
         success:response?.success,message:response?.success ? 'Already exits but not verified .Verification code sent to your email':"Failed to send verification code"
      },{status:response?.success ? 200:500})
    }
    if (!existingUser){
      const newUser=new User({
         email,username,password,
         verifyCode,
         verifyCodeExpiry:Date.now()+5*60*1000 
      })
      
      await newUser.save()
      const response=await emailSender(verifyCode)

          return NextResponse.json({
         success:response?.success,message:response?.success ? 'Verification code sent to your email':"Failed to send verification code"
      },{status:response?.success ? 200:500})
    }

   }
        
     catch (error) {
        console.log('user registration failed',error)
        return NextResponse.json({
         success:false,
         message:'user registration fail',},
         {status:500})
    }

}
 