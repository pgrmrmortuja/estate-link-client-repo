import React from "react";
import { Zoom } from "react-awesome-reveal";

const awards = [
  {
    title: "Best Startup of the Year",
    description: "Recognized by BD Tech Awards 2023 for innovation and growth.",
    icon: "🏆",
  },
  {
    title: "Top AI Innovator",
    description: "Awarded for contributions in AI at TechCon 2024.",
    icon: "🤖",
  },
  {
    title: "Global Impact Award",
    description: "For launching a product that reached 50+ countries.",
    icon: "🌍",
  },
];

const Awards = () => {
  return (
    <div className="mb-20">
      <Zoom>
        <h2 className="text-center text-4xl font-bold p-2 mb-20">
          Awards & Achievements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <div
              key={index}
              className="rounded-xl p-6 text-left relative bg-base-200 shadow-xl"
            >
              {/* Ribbon or Badge Icon */}
              <div className="text-4xl absolute -top-6 -left-6 bg-yellow-400 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-md">
                {award.icon}
              </div>

              {/* Award Details */}
              <h3 className="text-xl text-base-content font-semibold mt-6 mb-2">
                {award.title}
              </h3>
              <p className="text-base-content">{award.description}</p>
            </div>
          ))}
        </div>
      </Zoom>

    </div>
  );
};

export default Awards;
