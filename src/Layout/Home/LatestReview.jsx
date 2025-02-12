import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { motion } from 'framer-motion';

const LatestReview = () => {
    const axiosPublic = useAxiosPublic();

    const { data: reviews = [] } = useQuery({
        queryKey: ['latest-reviews'],
        queryFn: async () => {
            const res = await axiosPublic.get('/reviews');
            return res.data.slice(-3).reverse(); 
        }
    });

    return (
        <div className="container mx-auto p-4">
            <motion.h2 
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount: 0.2 }}
                className="text-3xl font-bold mb-6 text-center"
            >
                Latest Reviews
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <motion.div 
                            key={review._id} 
                            className="border p-4 rounded-lg shadow-md"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            viewport={{ once: false, amount: 0.2 }}
                        >
                            <div className="flex items-center mb-3">
                                <img src={review.reviewer_image} alt={review.reviewer_name} className="w-12 h-12 rounded-full mr-3" />
                                <div>
                                    <p className="font-bold">{review.reviewer_name}</p>
                                </div>
                            </div>
                            <p className="text-sm italic text-gray-500 mb-2">"{review.review_description}"</p>
                            <p className="text-blue-600 font-semibold">Property: {review.property_title}</p>
                        </motion.div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No reviews yet.</p>
                )}
            </div>
        </div>
    );
};

export default LatestReview;