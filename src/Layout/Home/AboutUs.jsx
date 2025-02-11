import React, { useEffect } from 'react';
import { FaGlobe, FaUserGraduate, FaHandshake } from 'react-icons/fa';

const AboutUs = () => {
    useEffect(() => {
        document.title = "About Us | LinguaConnect";
    }, []);

    return (
        <div className="py-12 px-6">
            <div className="max-w-6xl mx-auto text-center">
                {/* Heading */}
                <h2 className="text-4xl font-bold mb-6">
                    About Us
                </h2>
                <p className="text-lg mb-8">
                    Welcome to LinguaConnect, where we connect passionate learners with expert tutors. 
                    Our goal is to make language learning accessible, enjoyable, and personalized for everyone.
                </p>

                {/* Mission, Vision, Values */}
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Mission */}
                    <div className="bg-green-100 shadow-lg p-6 rounded-lg">
                        <FaGlobe className="text-green-500 text-5xl mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Mission</h3>
                        <p className="text-gray-600">
                            To empower individuals worldwide by making language learning engaging, flexible, and effective.
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="bg-green-100 shadow-lg p-6 rounded-lg">
                        <FaUserGraduate className="text-green-500 text-5xl mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Vision</h3>
                        <p className="text-gray-600">
                            To become the most trusted platform for connecting learners with top-tier language tutors globally.
                        </p>
                    </div>

                    {/* Values */}
                    <div className="bg-green-100 shadow-lg p-6 rounded-lg">
                        <FaHandshake className="text-yellow-500 text-5xl mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Values</h3>
                        <p className="text-gray-600">
                            Inclusivity, integrity, and innovation guide us in providing the best learning experiences.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
