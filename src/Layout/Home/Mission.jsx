import React from "react";
import { FaBullseye, FaRocket, FaHandshake, FaChartLine } from "react-icons/fa";
import { Zoom } from "react-awesome-reveal";

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
    <section className="mb-20">
      <Zoom>
        <h2 className="text-center text-4xl font-bold p-2 mb-10">
          Our Mission & Vision
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-6 hover:scale-110 transition text-base-content text-left bg-base-200 rounded-lg shadow-xl"
            >
              {item.icon}
              <h3 className="text-xl text-base-content font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-base-content">{item.description}</p>
            </div>
          ))}
        </div>
      </Zoom>

    </section>
  );
};

export default Mission;
