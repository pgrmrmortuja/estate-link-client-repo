import React from "react";
import { FaBullseye, FaRocket, FaHandshake, FaChartLine } from "react-icons/fa";

const items = [
  {
    title: "Our Mission",
    description: "To empower individuals and businesses by providing reliable, user-friendly, and accessible digital solutions.",
    icon: <FaBullseye className="text-4xl text-blue-600 mb-4" />,
  },
  {
    title: "Our Vision",
    description: "To be a globally recognized tech company known for innovation, trust, and impact in the digital world.",
    icon: <FaRocket className="text-4xl text-purple-600 mb-4" />,
  },
  {
    title: "Our Commitment",
    description: "We are committed to delivering quality, transparency, and customer-centric solutions at all times.",
    icon: <FaHandshake className="text-4xl text-green-600 mb-4" />,
  },
  {
    title: "Future Goals",
    description: "Expanding into AI, education, and smart automation to solve real-life problems more effectively.",
    icon: <FaChartLine className="text-4xl text-orange-600 mb-4" />,
  },
];

const Mission = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Our Mission & Vision
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-left"
            >
              {item.icon}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
