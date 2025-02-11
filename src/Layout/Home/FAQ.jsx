import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FAQ = () => {
    const [openFAQ, setOpenFAQ] = useState(null);

    useEffect(() => {
        document.title = "FAQ | LinguaConnect";
    }, []);

    const faqData = [
        {
            id: 1,
            question: "What services does LinguaConnect provide?",
            answer:
                "LinguaConnect offers a variety of services, including personalized tutor recommendations, booking language learning sessions, and access to resources for improving your language skills.",
        },
        {
            id: 2,
            question: "How can I book a language tutor?",
            answer:
                "You can browse our list of expert tutors, select a tutor based on your preferences, and schedule a session at a time that works for you using our user-friendly platform.",
        },
        {
            id: 3,
            question: "What payment methods are accepted?",
            answer:
                "We accept payments through all major credit/debit cards, PayPal, and secure online payment gateways to ensure a hassle-free booking experience.",
        },
        {
            id: 4,
            question: "Do you offer a refund policy?",
            answer:
                "Yes, we offer a refund policy if you are not satisfied with a session. Please refer to our refund policy page for detailed terms and conditions.",
        },
        {
            id: 5,
            question: "Can I choose a tutor based on my learning preferences?",
            answer:
                "Absolutely! LinguaConnect allows you to filter tutors based on language, teaching style, and availability, ensuring the perfect match for your learning needs.",
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
                            className="bg-green-100 rounded-lg shadow-md p-4 transition-all duration-300"
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
