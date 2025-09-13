import mongoose from "mongoose";
import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import User from "@/model/user.model";
import { usernameValidation } from "@/zodSchema/signupSchema";
import {z} from 'zod'
export const GET = async (request) => {

const userValidation=z.object({
       username:usernameValidation
})

  //   new URL is a build in object to parse url
  // url.searchParams is a special object that lets you easily get query parameters.

  // Methods:

  // .get("key") → get the first value for a key

  // .getAll("key") → get all values if the key repeats

  // .has("key") → check if key exists

  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
const response=userValidation.safeParse({username})
      if (!response?.success){
       return NextResponse.json({
              success:false,
              message:response.error.format().username._errors || []
       })
      }
  try {
    await dbConnect();
const {username}=response.data
    const user = await User.findOne({ username, isVerified: true });
    if (user) {
      return NextResponse.json({
        success: false,
        message: "user already token",
      },{
       status:409
      });
    }

    return NextResponse.json({
      success: true,
      message: "user is unique",
    },{status:200});
  } catch (error) {
    console.error("error on checking unique username", error);
    return NextResponse.json({
      success: true,
      message: "error checking username",
      status: 500,
    });
  }
};
