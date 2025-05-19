import React from "react";
import { FaUserPlus, FaSearch, FaPhoneAlt, FaHandshake } from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus className="text-blue-600 w-12 h-12 mx-auto mb-4" />,
    title: "Register",
    description: "Create your free account in seconds and get started.",
  },
  {
    icon: <FaSearch className="text-green-600 w-12 h-12 mx-auto mb-4" />,
    title: "Search Properties",
    description: "Browse listings by location, type, or price range.",
  },
  {
    icon: <FaPhoneAlt className="text-yellow-600 w-12 h-12 mx-auto mb-4" />,
    title: "Contact Agent",
    description: "Get in touch with trusted agents to learn more.",
  },
  {
    icon: <FaHandshake className="text-purple-600 w-12 h-12 mx-auto mb-4" />,
    title: "Finalize Deal",
    description: "Complete your transaction securely and move in!",
  },
];

const Steps = () => {
  return (
    <section className="bg-gray-50 py-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg p-6 text-center transition duration-300"
          >
            {step.icon}
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Steps;
