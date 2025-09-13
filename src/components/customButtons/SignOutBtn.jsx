"use client"
import Link from 'next/link';
import React from 'react';
import { ShimmerButton } from '../magicui/shimmer-button';
import {signOut} from 'next-auth/react'
const SignOutBtn = ({children}) => {
  
    
      return  <ShimmerButton onClick={()=>signOut()}   className="shadow-2xl">
               <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">{children}</span>
                  </ShimmerButton>
    
   }


export default SignOutBtn;