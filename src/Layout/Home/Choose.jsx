import React from 'react';
import { FaLanguage, FaChalkboardTeacher, FaRegSmile, FaHandsHelping } from 'react-icons/fa';

const Choose = () => {
    return (
        <div className='mx-auto w-11/12 mb-16'>

            <div className="mt-10">
                <h3 className="text-4xl font-bold text-center mb-4">Why LinguaConnect ?</h3>
                <p className="text-lg mb-6 text-center">
                    At LinguaConnect, we are dedicated to offering personalized learning, expert guidance, and an engaging platform for language enthusiasts.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">

                    <div className="bg-green-100 shadow-lg p-6 rounded-lg flex flex-col sm:flex-col lg:flex-row items-center gap-4">
                        <FaLanguage className="text-green-500 text-5xl" />
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800">Diverse Language Options</h4>
                            <p className="text-gray-600">
                                Learn from a wide variety of languages tailored to your personal and professional goals.
                            </p>
                        </div>
                    </div>

                    <div className="bg-green-100 shadow-lg p-6 rounded-lg flex flex-col sm:flex-col lg:flex-row items-center gap-4">
                        <FaChalkboardTeacher className="text-blue-500 text-5xl" />
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800">Expert Tutors</h4>
                            <p className="text-gray-600">
                                Gain insights and guidance from experienced tutors dedicated to your learning journey.
                            </p>
                        </div>
                    </div>

                    <div className="bg-green-100 shadow-lg p-6 rounded-lg flex flex-col sm:flex-col lg:flex-row items-center gap-4">
                        <FaRegSmile className="text-green-500 text-5xl" />
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800">Engaging Learning Experience</h4>
                            <p className="text-gray-600">
                                Enjoy an interactive and supportive platform designed to keep you motivated and focused.
                            </p>
                        </div>
                    </div>

                    <div className="bg-green-100 shadow-lg p-6 rounded-lg flex flex-col sm:flex-col lg:flex-row items-center gap-4">
                        <FaHandsHelping className="text-yellow-500 text-5xl" />
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800">Supportive Community</h4>
                            <p className="text-gray-600">
                                Join a vibrant community of learners and tutors committed to helping you succeed.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Choose;
