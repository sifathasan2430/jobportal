import Header from "@/components/Navbar";

export default function UserLayout({ children }) {
  return (
    <div>
           <div className="relative w-full flex items-center justify-center ">
          <Header />
        </div>    
      <main>{children}</main>
    </div>
  )}
