
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "@/components/SessionProviderWrapper/SessionProviderWrapper";
import TanStackQueryProvider from "@/components/TanStackQueryProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  
   title: "Find Your Job | Job Portal",
    description: "A modern job portal where companies can post jobs and candidates can apply with ease.",
   
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          
     <SessionProviderWrapper>
          <TanStackQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
             
            <Toaster/> 
            {children}
           
          </ThemeProvider>
          </TanStackQueryProvider>
         </SessionProviderWrapper>
        </body>
      </html>
  );
}
