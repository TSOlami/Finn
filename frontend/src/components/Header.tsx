import Image from "next/image";
import Link from "next/link";


const Header = () => {
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
			href={"/"}
			>
			<Image 
                src={"/assets/icons/cancel-icon.svg"}
                width={24}
                height={24}
                alt="Cancel Icon"
            />
			</Link>
			</div>
		</nav>
	);
};

export default Header;
