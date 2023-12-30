const Footer = () => {
	return (
		<footer className="text-gray-600 body-font border-t border-gray-200 py-4 text-center animate-fade-in-up">
			<div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
				<p className="text-md text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
					Made with <span className="text-red-500">&hearts;</span> by
					T.J. & Ifedolapo
				</p>
				<div className="flex ml-auto mt-4 justify-center items-center space-x-4">
					<a
						href="#"
						className="text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out"
					>
						<i className="fab fa-linkedin"></i>
					</a>
					<a
						href="#"
						className="text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out"
					>
						<i className="fab fa-twitter"></i>
					</a>
					<a
						href="#"
						className="text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out"
					>
						<i className="fab fa-facebook"></i>
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
