import React, { useRef } from 'react';
import { FaHome, FaUserTie, FaHandshake, FaShieldAlt } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';

const Choose = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { triggerOnce: false });

    return (
        <div className='mb-16' ref={ref}>
            {/* Title Section with Fade-in & Slide-in Effect */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mt-10 text-center"
            >
                <h3 className="text-4xl font-bold mb-4">Connect with EstateLink</h3>
                <p className="text-lg mb-6">
                    At EstateLink, we offer a seamless, secure, and user-friendly platform for buying, selling, and managing properties with ease.
                </p>
            </motion.div>

            {/* Cards Section with Fade-in & Slide-in + Hover Lift Effect */}
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                {cardData.map(({ icon, title, description, color }, index) => {
                    const cardRef = useRef(null);
                    const cardInView = useInView(cardRef, { triggerOnce: false });

                    return (
                        <motion.div
                            ref={cardRef}
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            whileHover={{ y: -10, boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)" }}
                            className="bg-blue-100 shadow-lg p-6 rounded-lg flex flex-col sm:flex-col lg:flex-row items-center gap-4"
                        >
                            <span className={`text-5xl ${color}`}>{icon}</span>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
                                <p className="text-gray-600">{description}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

const cardData = [
    {
        icon: <FaHome />,
        title: "Wide Property Listings",
        description: "Explore a diverse range of properties suited for different needs, from residential to commercial spaces.",
        color: "text-blue-500"
    },
    {
        icon: <FaUserTie />,
        title: "Trusted Agents",
        description: "Work with experienced and verified real estate agents dedicated to guiding you through every step.",
        color: "text-pink-500"
    },
    {
        icon: <FaHandshake />,
        title: "Secure Transactions",
        description: "Enjoy a smooth and safe property transaction experience with our secure and transparent system.",
        color: "text-yellow-500"
    },
    {
        icon: <FaShieldAlt />,
        title: "Verified Listings",
        description: "Browse through properties that are verified for authenticity, ensuring you make the best investment.",
        color: "text-red-500"
    }
];

export default Choose;
