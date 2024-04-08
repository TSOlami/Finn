import Navbar from "@/components/Navbar";
import ServiceCard from "@/components/ServiceCard";

export default function HomePage() {
	return (
		<main>
			<Navbar />

			<div className="p-4 mt-5 mx-5 lg:mx-8">
				<h2 className="text-2xl font-bold text-gray-800 mb-4">
					Services
				</h2>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

					<ServiceCard
						title="API Documentation"
						description="Access our comprehensive API documentation for integrating our services"
					/>

					<ServiceCard
						title="Youtube Downloader"
						description="Download videos from Youtube quickly and easily"
					/>

					<ServiceCard
						title="Tiktok Downloader"
						description="Save your favorite Tiktok videos to your device"
					/>

					<ServiceCard
						title="Video to Audio Converter"
						description="Convert videos to high-quality audio formats"
					/>

					<ServiceCard
						title="Text to speech"
						description="Turn text into lifelike speech using our AI-powered service"
					/>
				</div>
			</div>

			{/* <div className="bg-green-50 flex items-center justify-center h-screen">
                <div className="p-8 text-center rounded-lg max-w-sm w-full">
                    <h1 className="text-4xl font-bold mb-2">Home Page</h1>
                    <p className="text-gray-700 mb-8">Welcome to the home page</p>
                </div>
            </div> */}
		</main>
	);
}
