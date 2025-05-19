import React from "react";

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
    <section className="bg-white py-16 px-4 md:px-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Awards & Achievements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-xl shadow-md hover:shadow-lg p-6 text-left relative transition duration-300"
            >
              {/* Ribbon or Badge Icon */}
              <div className="text-4xl absolute -top-6 -left-6 bg-yellow-400 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-md">
                {award.icon}
              </div>

              {/* Award Details */}
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                {award.title}
              </h3>
              <p className="text-gray-600">{award.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;
