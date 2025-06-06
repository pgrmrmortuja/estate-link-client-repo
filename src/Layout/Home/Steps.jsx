import React from "react";
import { FaUserPlus, FaSearch, FaPhoneAlt, FaHandshake } from "react-icons/fa";
import { Zoom } from "react-awesome-reveal";

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
    <section className="mb-20">
      <Zoom>
        <h2 className="text-center text-4xl font-bold p-2 mb-10">How to Use</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-6 hover:scale-110 transition text-center bg-base-200 rounded-lg shadow-xl"
            >
              {step.icon}
              <h3 className="text-xl text-base-content font-semibold mb-2">{step.title}</h3>
              <p className="text-base-content">{step.description}</p>
            </div>
          ))}
        </div>
      </Zoom>

    </section>
  );
};

export default Steps;
