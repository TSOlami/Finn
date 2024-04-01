import Navbar from "@/components/Navbar";

export default function HomePage() {
    return (
        <main>
            <Navbar />
            <div className="bg-green-50 flex items-center justify-center h-screen">
                <div className="p-8 text-center rounded-lg max-w-sm w-full">
                    <h1 className="text-4xl font-bold mb-2">Home Page</h1>
                    <p className="text-gray-700 mb-8">Welcome to the home page</p>
                </div>
            </div>
        </main>
    );
}