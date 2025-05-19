import React from "react";
import { FaQuoteLeft, FaSmile } from "react-icons/fa";

const stories = [
  {
    name: "Sadin Manan",
    story:
      "“I was able to grow my small business 5x within just three months using this platform. Thank you for always being by my side!”",
    icon: <FaSmile className="text-3xl text-green-500" />,
  },
  {
    name: "Rafiul Islam",
    story:
      "“Your support system and dedicated team gave me the confidence to start a brand new project.”",
    icon: <FaQuoteLeft className="text-3xl text-blue-500" />,
  },
  {
    name: "Anik Pran",
    story:
      "“During one of the toughest times in my life, I found the right guidance here and completely transformed my career.”",
    icon: <FaSmile className="text-3xl text-purple-500" />,
  },
];

const Success = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 md:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Success Stories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 text-left hover:shadow-lg transition duration-300"
            >
              <div className="mb-4">{story.icon}</div>
              <p className="text-gray-700 italic mb-4">{story.story}</p>
              <p className="font-semibold text-gray-900">– {story.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Success;