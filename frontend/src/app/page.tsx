import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
	return (
		<main className="w-full bg-green-50">
			<Navbar />

			{/* Landing section */}
			<section className="flex flex-col md:flex-row items-center md:justify-between space-y-6 md:space-y-0 md:space-x-6 mb-24 p-4 relative w-full h-screen">
				<div className="md:w-1/2 flex flex-col px-6 justify-center items-start">
					<h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
						Work Smart, Not Hard!
					</h2>
					<p className="text-lg md:text-xl text-green-700 mb-6">
						Make your daily life easy with our free AI toolbox.
					</p>
					<p className="text-base md:text-lg text-green-600 mb-6">
						Empower your day with Finn, your friendly AI toolbox for
						everyone! It&apos;s not just for techies; it&apos;s here
						to make your daily tasks a breeze and bring a touch of
						magic to everything you do.
					</p>
					<button className="bg-green-600 text-white md:px-6 px-4 md:py-3 py-2  rounded hover:bg-green-700 flex items-center space-x-2">
						<span>Explore</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4 md:h-5 md:w-5 "
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</button>
				</div>
				<div className="h-screen md:py-16 md:w-1/2 overflow-hidden">
					<Image
						src={
							"https://source.unsplash.com/featured/?nature,green,dog"
						}
						width={400}
						height={400}
						priority
						alt="Hero section image"
						className="rounded-lg shadow-lg object-cover object-center w-full h-full"
					/>
				</div>
			</section>

			{/* Features Section */}
			<section className="md:my-16 my-8 mx-4">
				<h3 className="text-3xl md:text-4xl font-bold text-green-800 mb-8">
					Why use Finn?
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Feature Card 1 */}
					<div className="bg-green-100 p-8 rounded-lg shadow-lg">
						<div className="flex items-center space-x-4 mb-4">
							<span className="text-3xl font-bold">1</span>
							<h4 className="text-xl font-semibold">
								Boost Productivity
							</h4>
						</div>
						<p className="text-green-700">
							Focus on what matters – coding – and let Finn
							handle the rest.
						</p>
					</div>

					{/* Feature card 2 */}
					<div className="bg-green-100 p-8 rounded-lg shadow-lg">
						<div className="flex items-center space-x-4 mb-4">
							<span className="text-3xl font-bold">2</span>
							<h4 className="text-xl font-semibold">
								Versatile Toolkit
							</h4>
						</div>
						<p className="text-green-700">
							From API documentation to multimedia tools, find
							everything you need in one place.
						</p>
					</div>

					{/* Feature Card 3 */}
					<div className="bg-green-100 p-8 rounded-lg shadow-lg">
						<div className="flex items-center space-x-4 mb-4">
							<span className="text-3xl font-bold">3</span>
							<h4 className="text-xl font-semibold">
								Effortless Experience
							</h4>
						</div>
						<p className="text-green-700">
							Simplify your tasks with Finn&apos;s user-friendly
							interface and convenient accessibility.
						</p>
					</div>

					{/* Feature card 4 */}
					<div className="bg-green-100 p-8 rounded-lg shadow-lg">
						<div className="flex items-center space-x-4 mb-4">
							<span className="text-3xl font-bold">4</span>
							<h4 className="text-xl font-semibold">
								Coding Companion
							</h4>
						</div>
						<p className="text-green-700">
							Seamlessly integrate Finn into your coding journey
							with secure authentication when needed.
						</p>
					</div>
				</div>
			</section>

			{/* FAQ section */}
			<section className="mb-24 px-4">
				<h3 className="text-3xl md:text-4xl font-bold text-green-800 mb-16">
					Frequently Asked Questions
				</h3>
				<div className="grid gap-8">
					{/* FAQ card 1 */}
					<div className="bg-white p-8 rounded-lg shadow-md">
						<h4 className="font-semibold text-xl text-green-700 mb-4">
							Is Finn free to use?
						</h4>
						<p className="text-gray-700">
							Yes, absolutely! Finn is 100% free to use. We
							believe in making tools and creativity accessible to
							everyone.
						</p>
					</div>

					{/* FAQ card 2 */}
					<div className="bg-white p-8 rounded-lg shadow-md">
						<h4 className="font-semibold text-xl text-green-700 mb-4">
							Do I need to create an account to use Finn?
						</h4>
						<p className="text-gray-700">
							No, you can start using some of Finn&apos;s amazing
							tools, like the YouTube downloader and
							text-to-speech, without creating an account. Enjoy
							the benefits hassle-free!
						</p>
					</div>

					{/* FAQ card 3 */}
					<div className="bg-white p-8 rounded-lg shadow-md">
						<h4 className="font-semibold text-xl text-green-700 mb-4">
							What advantages do I get with a Finn account?
						</h4>
						<p className="text-gray-700">
							Finn is your all-in-one toolbox designed to simplify
							your coding experience, provide creative tools, and
							make your everyday tasks more enjoyable.
						</p>
					</div>

					{/* FAQ card 4 */}
					<div className="bg-white p-8 rounded-lg shadow-md">
						<h4 className="font-semibold text-xl text-green-700 mb-4">
							How do I log in securely to Finn?
						</h4>
						<p className="text-gray-700">
							When you&apos;re ready to explore more features and
							personalize your experience, simply click on the
							login button, follow the prompts, and enjoy secure
							access to Finn&apos;s full suite of tools.
						</p>
					</div>
				</div>
			</section>

			{/* Call to action section */}
			<section className="py-20 bg-green-200">
				<div className="container mx-auto px-4 flex flex-col items-center">
					<div className="max-w-3xl text-center mb-8">
						<h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
							Ready to Unlock the Power of Finn?
						</h2>
						<p className="text-lg text-green-700">
							Explore our tools, streamline your coding
							experience, and infuse creativity into your daily
							tasks.
						</p>
					</div>
					<button className="bg-green-600 px-8 py-4 rounded hover:bg-green-700 text-white font-bold">
						Get Started
					</button>
					<Image
						src="https://source.unsplash.com/featured/?technology,workspace"
						alt="Workspace"
            width={400}
            height={200}
						className="mt-8 rounded-lg shadow-lg object-cover w-full md:w-2/3 lg:w-1/2"
					/>
				</div>
			</section>

			<Footer />
		</main>
	);
}
