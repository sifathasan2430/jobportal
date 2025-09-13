"use client";

import { loginSchema, userData } from "@/zodSchema/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { MagicCard } from "@/components/magicui/magic-card";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {signIn} from "next-auth/react"
import axios from "axios";

import { toast } from "sonner"
import { SonnerDemo } from "@/components/SonnerCustom";
import { useRouter } from "next/navigation";
import { ShimmerButton } from "@/components/magicui/shimmer-button";


export default function SignupFormDemo() {
 
  const [isSignupLoading,setIsSignupLoading]=useState(false)
    const router = useRouter()
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
    mode:'onChange'
    
  });
  const { theme } = useTheme();
  const onSubmit = async (data) => {
                    
  
 
   
   try {
      setIsSignupLoading(true)
      const response=await signIn("credentials",{
    redirect:false,
    email:data?.email,
    password:data?.password
   })
   if (response?.error){
    toast({
        title:response?.error,
         description: 'Incorrect username or password',
          variant: 'destructive',
    })
   }
   if (response?.url){
 router.replace(`/`);
}
   } catch (error) {
     console.error('Error during sign-up:', error);
     toast('User registration fail', {
          title: 'Success',
         description:'User registration fail',
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
    
   }finally{
    setIsSignupLoading(false)
   }
  };

  

  

  return (
    <div className=" my-10  shadow-input mx-auto w-full max-w-md rounded-none bg-white  md:rounded-2xl  dark:bg-black">
      <MagicCard
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        className="p-4 md:p-8 "
      >
        <h2 className="text-xl text-center font-bold text-neutral-800 dark:text-neutral-200">
          Login Here
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
           
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jhon@gmail.com" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="*****" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
              
            <button
              className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
              type="submit"
            >
              {
                isSignupLoading ? <span>Loading</span> :<span>SignIn</span>
              }
              <BottomGradient />
            </button>
          </form>
        </Form>

        <div className="mb-4 flex flex-col space-y-2 my-4  md:space-y-0 md:space-x-2">
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </MagicCard>
     
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
