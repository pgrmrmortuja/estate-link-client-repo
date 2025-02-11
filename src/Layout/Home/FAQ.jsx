import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FAQ = () => {
    const [openFAQ, setOpenFAQ] = useState(null);

    useEffect(() => {
        document.title = "FAQ | RealEstateConnect";
    }, []);

    const faqData = [
        {
            id: 1,
            question: "What services does RealEstateConnect provide?",
            answer:
                "RealEstateConnect helps users buy, sell, and rent properties effortlessly. We provide property listings, agent connections, and secure transactions for a smooth experience.",
        },
        {
            id: 2,
            question: "How can I list my property?",
            answer:
                "Simply sign up as an agent, navigate to the 'Add Property' section, fill in the necessary details, upload images, and submit your listing for approval.",
        },
        {
            id: 3,
            question: "What payment methods are accepted?",
            answer:
                "We accept payments via secure online payment gateways for property-related transactions.",
        },
        {
            id: 4,
            question: "Do you offer refunds for property bookings?",
            answer:
                "Refunds are subject to our policy. If a transaction is canceled within the allowed period, a refund may be processed based on the agreement terms.",
        },
        {
            id: 5,
            question: "Can I connect with agents directly?",
            answer:
                "Yes! Our platform allows you to browse agent profiles, check their property listings, and contact them directly for inquiries or negotiations.",
        },
    ];

    const toggleFAQ = (id) => {
        setOpenFAQ(openFAQ === id ? null : id);
    };

    return (
        <div className="py-10 px-6">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    {faqData.map((faq) => (
                        <div
                            key={faq.id}
                            className="bg-blue-100 rounded-lg shadow-md p-4 transition-all duration-300"
                        >
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => toggleFAQ(faq.id)}
                            >
                                <h3 className="text-lg font-medium text-gray-800">
                                    {faq.question}
                                </h3>
                                <span className="text-xl text-gray-600">
                                    {openFAQ === faq.id ? <FiChevronUp /> : <FiChevronDown />}
                                </span>
                            </div>
                            <div
                                className={`mt-2 text-gray-700 ${openFAQ === faq.id ? "block" : "hidden"
                                    }`}
                            >
                                {faq.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
