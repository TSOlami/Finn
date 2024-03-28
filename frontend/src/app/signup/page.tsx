import Image from "next/image";
import Header from "@/components/Header";
import Link from "next/link";
import { getGoogleOAuthURL } from "@/utils/getGoogleURL";

export default function  SignUpPage () {
    return (
        <main>
            <Header />
             <div className="bg-green-50 flex items-center justify-center h-screen">
           
           <div className="p-8 text-center rounded-lg max-w-sm w-full">
       <h1 className="text-4xl font-bold mb-2">Sign Up</h1>
       <p className="text-gray-700 mb-8">Welcome! We're excited to have you join us.</p>
       <button className="google-btn flex items-center justify-center w-full p-3 rounded-lg text-white bg-blue-600 mb-4">
           <Image
               src="/assets/icons/google-icon.svg"
               width={24}
               height={24}
               alt="Google Icon"
               className="mr-3"
           />
           <Link href={getGoogleOAuthURL()}> Sign up with Google</Link>
       </button>
       <p className="text-center text-gray-600">
       Already have an account? <Link href="/signin" className="text-blue-600 hover:underline">Sign in</Link>
       </p>
   </div>
       </div>
        </main>
       
       
    );
}
