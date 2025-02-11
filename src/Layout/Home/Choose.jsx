import React from 'react';
import { FaHome, FaUserTie, FaHandshake, FaShieldAlt } from 'react-icons/fa';

const Choose = () => {
    return (
        <div className='mx-auto w-11/12 mb-16'>

            <div className="mt-10">
                <h3 className="text-4xl font-bold text-center mb-4">Why RealEstateConnect?</h3>
                <p className="text-lg mb-6 text-center">
                    At RealEstateConnect, we offer a seamless, secure, and user-friendly platform for buying, selling, and managing properties with ease.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">

                    <div className="bg-blue-100 shadow-lg p-6 rounded-lg flex flex-col sm:flex-col lg:flex-row items-center gap-4">
                        <FaHome className="text-blue-500 text-5xl" />
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800">Wide Property Listings</h4>
                            <p className="text-gray-600">
                                Explore a diverse range of properties suited for different needs, from residential to commercial spaces.
                            </p>
                        </div>
                    </div>

                    <div className="bg-blue-100 shadow-lg p-6 rounded-lg flex flex-col sm:flex-col lg:flex-row items-center gap-4">
                        <FaUserTie className="text-green-500 text-5xl" />
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800">Trusted Agents</h4>
                            <p className="text-gray-600">
                                Work with experienced and verified real estate agents dedicated to guiding you through every step.
                            </p>
                        </div>
                    </div>

                    <div className="bg-blue-100 shadow-lg p-6 rounded-lg flex flex-col sm:flex-col lg:flex-row items-center gap-4">
                        <FaHandshake className="text-yellow-500 text-5xl" />
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800">Secure Transactions</h4>
                            <p className="text-gray-600">
                                Enjoy a smooth and safe property transaction experience with our secure and transparent system.
                            </p>
                        </div>
                    </div>

                    <div className="bg-blue-100 shadow-lg p-6 rounded-lg flex flex-col sm:flex-col lg:flex-row items-center gap-4">
                        <FaShieldAlt className="text-red-500 text-5xl" />
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800">Verified Listings</h4>
                            <p className="text-gray-600">
                                Browse through properties that are verified for authenticity, ensuring you make the best investment.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Choose;
