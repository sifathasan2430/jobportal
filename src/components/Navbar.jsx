"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import Link from "next/link";
import { useState } from "react";
 import {useSession,signOut} from 'next-auth/react'
import { ShimmerButton } from "./magicui/shimmer-button";
import SignupBtn from "./customButtons/SignOutBtn";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import LinkBtn from "./customButtons/LinkBtn";
export default function Header() {
    const {data:session, status}=useSession()
    
    const userNotExits=<>   <LinkBtn href="/signup">
            SignUp
          </LinkBtn>
           <LinkBtn href="/login">
            Login
          </LinkBtn>
          
          </>
          const userExits=<> 
          <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>PF</AvatarFallback>
</Avatar>
         <SignupBtn onClick={()=>signOut()}  href="#">
            Logout
          </SignupBtn>
          </>
    
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Jobs",
      link: "/jobs",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];
 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 
  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
           
     { session ? userExits:  userNotExits }
     
     
                  
           
          </div>
        </NavBody>
 
        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
 
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
               { session ? userExits:  userNotExits }
            
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    
 
      {/* Navbar */}
    </div>
  );
}
 