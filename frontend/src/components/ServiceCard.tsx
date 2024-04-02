import Link from "next/link";

interface Props {
	title: string;
	description: string;
	link?: string;
}

const ServiceCard = ({ title, description, link }: Props) => {
	return (
		<Link
			href={link? link : "/"}
			className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
		>
			<h3 className="text-lg font-semibold text-green-700">{title}</h3>
			<p className="text-gray-600 mt-2">{description}</p>
		</Link>
	);
};

export default ServiceCard;
