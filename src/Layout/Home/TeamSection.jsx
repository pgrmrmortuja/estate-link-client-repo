import React from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

const teamMembers = [
  {
    name: "Afsan Khan",
    role: "CEO & Founder",
    image: "https://i.ibb.co.com/84Nk84k/download-5.jpg",
    fb: "#",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Tanvir Hasan",
    role: "Head of Marketing",
    image: "https://i.ibb.co.com/QrtGT67/download-1.jpg",
    fb: "#",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Numan Joy",
    role: "UI/UX Designer",
    image: "https://i.ibb.co.com/QHHqQ1Q/images-1.jpg",
    fb: "#",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Mehedi Islam",
    role: "Lead Developer",
    image: "https://i.ibb.co.com/PDm7N47/images-2.jpg",
    fb: "#",
    linkedin: "#",
    twitter: "#",
  },
];

const TeamSection = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Meet Our Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-gray-500 mb-2">{member.role}</p>

                <div className="flex justify-center gap-4 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href={member.fb} target="_blank" rel="noopener noreferrer">
                    <FaFacebook className="text-blue-600 hover:text-blue-800 text-xl" />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="text-blue-700 hover:text-blue-900 text-xl" />
                  </a>
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter className="text-sky-500 hover:text-sky-700 text-xl" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
