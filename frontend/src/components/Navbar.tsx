import Image from "next/image";
import Link from "next/link";


const Navbar = () => {
	return (	
		<nav className="bg-white shadow px-4 py-5 mx-auto flex justify-between items-center w-full">
			<div className="flex items-center gap-2">
				<Image
				src={"/assets/images/finn-logo.png"}
				width={40}
				height={40}
				alt="Finn Logo"
				/>
				<h1 className="font-extrabold text-xl text-green-800 animate-fade-in-left">
					Finn
				</h1>
			</div>

			<div className="flex text-sm items-center gap-2">
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
			</div>
		</nav>
	);
};

export default Navbar;
