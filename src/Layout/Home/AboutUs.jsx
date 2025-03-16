import React, { useEffect, useState, useRef } from "react";
import { FaHome, FaUsers, FaBuilding } from "react-icons/fa";
import { motion, AnimatePresence, useInView } from "framer-motion";

const AboutUs = () => {
    const [order, setOrder] = useState(initialOrder);
    const ref = useRef(null);
    const isInView = useInView(ref, { triggerOnce: false });

    useEffect(() => {
        const interval = setInterval(() => {
            setOrder([...shuffle(order)]);
        }, 2000); // Every 2 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [order]);

    return (
        <div className="py-12 px-6" ref={ref}>
            <div className="text-center ">
                {/* Title Section with Fade-in & Slide-in Effect */}
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl font-bold mb-6"
                >
                    What is EstateLink?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-lg mb-8"
                >
                    Your trusted platform for buying, selling, and managing real estate properties. Anyone can connect with us.
                </motion.p>

                {/* Animated Sections */}
                <div className="flex justify-center flex-wrap gap-6">
                    <AnimatePresence>
                        {order.map(({ title, description, icon, color }, index) => {
                            const cardRef = useRef(null);
                            const cardInView = useInView(cardRef, { triggerOnce: false });

                            return (
                                <motion.div
                                    ref={cardRef}
                                    key={title}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    whileHover={{ y: -10, boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)" }}
                                    className="shadow-lg p-6 rounded-lg w-72 text-center"
                                    style={{ backgroundColor: color }}
                                >
                                    {icon}
                                    <h3 className="text-xl font-semibold mb-3">{title}</h3>
                                    <p className="">{description}</p>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

const initialOrder = [
    {
        title: "Our Mission",
        description: "To simplify real estate transactions with technology-driven solutions.",
        icon: <FaHome className="text-blue-500 text-5xl mx-auto mb-4" />,
        color: "#dbeafe",
    },
    {
        title: "Our Vision",
        description: "To be the most user-friendly real estate platform.",
        icon: <FaBuilding className="text-blue-500 text-5xl mx-auto mb-4" />,
        color: "#c7d2fe",
    },
    {
        title: "Our Values",
        description: "Trust, transparency, and customer satisfaction.",
        icon: <FaUsers className="text-yellow-500 text-5xl mx-auto mb-4" />,
        color: "#fef9c3",
    },
];

const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

export default AboutUs;
