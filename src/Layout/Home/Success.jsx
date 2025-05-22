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

    <div className=" text-center mb-20">
      <h2 className="text-center text-4xl font-bold p-2 mb-10">
        Success Stories
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {stories.map((story, index) => (
          <div
            key={index}
            className="bg-base-200 rounded-lg p-6 text-left shadow-xl"
          >
            <div className="mb-4">{story.icon}</div>
            <p className=" italic mb-4 text-base-content">{story.story}</p>
            <p className="font-semibold text-base-content">– {story.name}</p>
          </div>
        ))}
      </div>
    </div>

  );
};

export default Success;