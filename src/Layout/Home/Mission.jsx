import React from "react";

const Mission = () => {
  return (
    <section className="w-full bg-gray-100 py-12 px-4 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Mission & Vision
          </h2>
          <p className="text-gray-600 text-lg">
            At DreamHome Ltd., our mission is to simplify the process of finding a perfect home for everyone. 
            <br /><br />
            Our vision is to be the most trusted real estate platform, empowering people to move smartly and confidently towards their dream living space.
          </p>
        </div>

        {/* Image */}
        <div className="md:w-1/2">
          <img
            src="https://i.ibb.co.com/NmmpGHK/Cream-Yellow-Modern-Real-Estate-Seek-Cover-Image.png"
            alt="Mission and Vision"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Mission;
