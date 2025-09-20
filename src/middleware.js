import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request) {
    console.log(request.nextUrl,'this is pathname')
    NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token}) => {
       
       return   !!token
    },
  },
}
)

export const config = { matcher: ["/dashboard"] }