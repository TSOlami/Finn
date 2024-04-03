"use client";
import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { useAppSelector } from '@/lib/hooks';

const Navbar = () => {
	// Get the user details from the store
	const userData = useAppSelector((state) => state?.user?.userData);

	// Create a state to track whether the user profile dropdown is open
	const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

	// Create a variable to check if the user is logged in
	const isUserLoggedIn = userData !== null;

	return (	
		<nav className="bg-white shadow px-4 py-5 mx-auto flex justify-between items-center w-full">
			<div className="flex items-center gap-2">
				<Image
				src={"/assets/images/finn-logo.png"}
				width={30}
				height={30}
				alt="Finn Logo"
				/>
				<h1 className="font-extrabold text-xl text-green-800 animate-fade-in-left">
					Finn
				</h1>
			</div>

			{/* If the user is logged in, show the user profile dropdown */}
			{isUserLoggedIn ? (
				<div className="relative mr-4"
				>
					<button
						onClick={() => setIsProfileDropdownOpen(
							(prevState) => !prevState)}
						className="flex items-center gap-3">
							<div className="w-8 rounded-full bg-green-200 p-1">
            					{userData?.picture ? (
									<Image
										src={userData.picture}
										width={30}
										height={30}
										alt="User Profile Picture"
										className="rounded-full"
									/>
								) : (
									<FontAwesomeIcon icon={faUser} className="text-green-800" />
								)} 
        					</div>
					</button>
					{isProfileDropdownOpen && (
						<div className="absolute top-12 right-0 w-48 bg-white shadow-md rounded p-4">
							<ul className="flex flex-col gap-2">
								<li>
									<Link
										href={"/profile"}
										className="hover:text-green-700"
										onClick={() => setIsProfileDropdownOpen(false)}
									>
										<FontAwesomeIcon icon={faUser} className="mr-2" />
										Profile
									</Link>
								</li>
								<li>
									<Link
										href={"/settings"}
										className="hover:text-green-700"
										onClick={() => setIsProfileDropdownOpen(false)}
									>
										<FontAwesomeIcon icon={faCog} className="mr-2" />
										Settings
									</Link>
								</li>
								<li>
									<Link
										href={"/logout"}
										className="hover:text-red-700"
										onClick={() => setIsProfileDropdownOpen(false)
										}
									>
										<FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
										Logout
									</Link>
								</li>
							</ul>
						</div>
					)}
				</div>
			) : (
				<ul className="flex text-sm items-center gap-2">
					<Link
					href={"/signin"}
					className="flex text-green-700 hover:text-green-800 font-semibold transition duration-300 ease-in-out animate-fade-in-right"
					>
					Log in{" "}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 ml-2"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M5 12h14M12 5l7 7-7 7"
						></path>
					</svg>
					</Link>
					<Link
						className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 font-semibold transition duration-300 ease-in-out animate-fade-in-right"
						href={"/signup"}
					>
						Sign Up
					</Link>
				</ul>
			)}
		</nav>
	);
};

export default Navbar;
