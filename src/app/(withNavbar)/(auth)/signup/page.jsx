"use client";
import { useDebounceValue } from "usehooks-ts";
import { userData } from "@/zodSchema/signupSchema";
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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { toast } from "sonner"
import { SonnerDemo } from "@/components/SonnerCustom";
import { useRouter } from "next/navigation";


export default function SignupFormDemo() {
  const [username, setUsername] = useState("");
  const [debouncedValue, setValue] = useDebounceValue(username, 1500);
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isSignupLoading,setIsSignupLoading]=useState(false)
    const router = useRouter()
  const form = useForm({
    resolver: zodResolver(userData),
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
     const response=await axios.post('/api/user/signup', data)
      toast('User created successfully', {
            title: 'Success',
        description: response?.data?.message,
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
          router.replace(`/verify/${username}`);
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

  const {
    data: uniquename,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["userunique", debouncedValue],
    queryFn: async () => {
      const response = await axios.get(
        `/api/uniqueusername?username=${debouncedValue}`
      );

      return response.data;
    },
    enabled: !!debouncedValue,
    // only run when debounce value is truthy
  });

  

  return (
    <div className="shadow-input my-10 mx-auto w-full max-w-md rounded-none bg-white  md:rounded-2xl  dark:bg-black">
      <MagicCard
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        className="p-4 md:p-8"
      >
        <h2 className="text-xl text-center uppercase font-bold text-neutral-800 dark:text-neutral-200">
          Signup Here
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <div className="relative">
                    {/* // ⚠️ Important: always call field.onChange(e) first
  // This keeps React Hook Form in control (tracking value, validation, etc.)
  // Then add your own custom logic (like updating local state) */}
                    {/* {...field always write in first other wise it overwrite the field every time} */}
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setUsername(e.target.value);
                      }}
                    />
                     {isLoading && <Spinner className='absolute bottom-[12px] right-4'/>}
                    </div>
                  </FormControl>
             {
              isLoading && <p className="text-sm text-white/[.0.92]">Checking...</p>
             }
             {
              uniquename?.success && (<p className="text-green-600 text-sm">{uniquename?.message}</p>)
             }
             {
              error && (<p className="text-red-600 text-sm">{  error?.response?.data?.message}</p>)
             }
                  <FormMessage />
                </FormItem>
              )}
            />
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
                isSignupLoading ? "Loading" : "Signup"
              };
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
