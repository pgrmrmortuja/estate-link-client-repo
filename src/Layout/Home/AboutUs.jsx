import React, { useEffect } from 'react';
import { FaHome, FaUsers, FaBuilding } from 'react-icons/fa';

const AboutUs = () => {
    useEffect(() => {
        document.title = "About Us | RealEstateConnect";
    }, []);

    return (
        <div className="py-12 px-6">
            <div className="max-w-6xl mx-auto text-center">
                {/* Heading */}
                <h2 className="text-4xl font-bold mb-6">
                    About Us
                </h2>
                <p className="text-lg mb-8">
                    Welcome to RealEstateConnect, your trusted platform for buying, selling, and managing real estate properties. 
                    Our mission is to make property transactions seamless, transparent, and efficient for everyone.
                </p>

                {/* Mission, Vision, Values */}
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Mission */}
                    <div className="bg-blue-100 shadow-lg p-6 rounded-lg">
                        <FaHome className="text-blue-500 text-5xl mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Mission</h3>
                        <p className="text-gray-600">
                            To simplify the process of buying, selling, and managing real estate with technology-driven solutions.
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="bg-blue-100 shadow-lg p-6 rounded-lg">
                        <FaBuilding className="text-blue-500 text-5xl mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Vision</h3>
                        <p className="text-gray-600">
                            To be the most reliable and user-friendly real estate platform for property buyers, sellers, and agents.
                        </p>
                    </div>

                    {/* Values */}
                    <div className="bg-blue-100 shadow-lg p-6 rounded-lg">
                        <FaUsers className="text-yellow-500 text-5xl mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Values</h3>
                        <p className="text-gray-600">
                            Trust, transparency, and customer satisfaction are at the heart of everything we do.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
