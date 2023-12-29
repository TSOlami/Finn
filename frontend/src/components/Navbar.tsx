import Link from "next/link";

const Navbar = () => {
	return (
		<div className="bg-white shadow py-4 container mx-auto flex justify-between items-center w-full">
			<div></div>

			<div className="flex">
				<Link href={""} className="text-black flex border-2">
					Log in{" "}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 ml-2"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 12h14M12 5l7 7-7 7"
						></path>
					</svg>
				</Link>
				<Link
					className="rounded text-white bg-green-700 hover:bg-green-500 p-3"
					href={""}
				>
					Sign Up
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
