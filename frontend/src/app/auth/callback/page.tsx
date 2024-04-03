"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import { useAppDispatch } from "@/lib/hooks";
import { setUser } from "@/lib/features/user/userSlice";

export default function CallbackPage() {
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();

    const code = searchParams.get('code');
    const scope = searchParams.get('scope');
    const authuser = searchParams.get('authuser');
    const prompt = searchParams.get('prompt');

    useEffect(() => {
        // Ensure that the code is present
        if (!code) {
            alert('No code provided');
            return;
        }

        // Make a network request to the backend to authenticate the user
        // and get the user details
        const fetchUserDetails = async () => {
            const response = await fetch(`http://finn.com/api/v1/auth/?code=${code}`);
            const data = await response.json();

            // Dispatch the user details to the store
            dispatch(setUser(data.user));
            console.log(data.user);

            // // Redirect the user to the home page after 5 seconds
            setTimeout(() => {
                window.location.href = '/home';
            }, 5000);
        }

        fetchUserDetails();
    }
    , []);

    return (
        <main>
            <Navbar />
            <div className="bg-green-50 flex items-center justify-center h-screen">
                <div className="p-8 text-center rounded-lg max-w-sm w-full">
                    <h1 className="text-4xl font-bold mb-2">Callback Page</h1>
                    <p className="text-gray-700 mb-8">This is the callback page</p>
                    <p className="text-center text-gray-600">Code: {code} </p>
                    <p className="text-center text-gray-600">Scope: {scope} </p>
                    <p className="text-center text-gray-600">Authuser: {authuser} </p>
                    <p className="text-center text-gray-600">Prompt: {prompt} </p>
                </div>
            </div>
        </main>
    );
}