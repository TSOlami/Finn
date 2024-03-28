import Image from "next/image";

export default function  LoginPage () {
    return (
        <div className="bg-green-50 flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-4xl font-bold mb-2">Log In</h1>
        <p className="text-gray-700 mb-8">We're happy to have you back</p>
        <button className="google-btn flex items-center justify-center w-full p-3 rounded-lg text-white bg-blue-600 mb-4">
            <Image 
            src={"https://img.icons8.com/color/16/000000/google-logo.png"} alt="Google Logo" className="mr-3"
            />
            Sign in with Google
        </button>
        <p className="text-center text-gray-600">
            Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
        </p>
    </div>
        </div>
    );
}
