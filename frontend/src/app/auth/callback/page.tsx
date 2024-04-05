"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import { useAppDispatch } from "@/lib/hooks";
import { setUser } from "@/lib/features/user/userSlice";
import Link from "next/link";

export default function CallbackPage() {
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();

    const code = searchParams.get('code');
    const scope = searchParams.get('scope');
    const authuser = searchParams.get('authuser');
    const prompt = searchParams.get('prompt');

    // State to track whether the fetch has already been made
    const [fetchDone, setFetchDone] = useState(false);

    // Create a state to track whether authentication was successful
    const [authSuccess, setAuthSuccess] = useState(false);

    // Create a loading state to show a loading spinner while the fetch is being made
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Ensure that the code is present
        if (!code) {
            alert('No code provided');
            return;
        }

        // Ensure that the fetch has not been made already
        if (fetchDone) {
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

            // Set loading to false to hide the loading spinner
            setLoading(false);

            // Set authSuccess to true to show a success message
            setAuthSuccess(true);

            // Set fetchDone to true to prevent further fetches
            setFetchDone(true);

            // Redirect the user to the home page after 5 seconds
            setTimeout(() => {
                window.location.href = '/home';
            }, 5000);
        }

        fetchUserDetails();
    }
    , [code, dispatch, fetchDone]);

    return (
        <main>
            <Navbar />
            <div className="bg-green-50 flex items-center justify-center h-screen">
                {loading && <div className="text-2xl">Loading...</div>}
                {authSuccess && <>
                <h1 className="text-4xl font-bold mb-2">Authentication successful!</h1>
                <p className="text-gray-500">
                    You will be redirected to the home page shortly.
                </p>
                <p className="text-gray-500">
                    If you are not redirected, please click the button below.
                </p>
                <Link href="/home">
                    <button className="bg-blue-500 text-white p-2 rounded-lg mt-4">
                        Go to Home
                    </button>
                </Link>
                </>
                }
            </div>
        </main>
    );
}