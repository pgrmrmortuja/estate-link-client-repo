import React from 'react';
import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAxiosPublic from '../../hooks/useAxiosPublic';


const LatestReview = () => {
    // const axiosSecure = useAxiosSecure();
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
            <h2 className="text-3xl font-bold mb-6 text-center">Latest Reviews</h2>

            <div className="grid md:grid-cols-3 gap-6">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review._id} className="border p-4 rounded-lg shadow-md">
                            <div className="flex items-center mb-3">
                                <img src={review.reviewer_image} alt={review.reviewer_name} className="w-12 h-12 rounded-full mr-3" />
                                <div>
                                    <p className="font-bold">{review.reviewer_name}</p>
                                </div>
                            </div>
                            <p className="text-sm italic text-gray-500 mb-2">"{review.review_description}"</p>
                            <p className="text-blue-600 font-semibold">Property: {review.property_title}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No reviews yet.</p>
                )}
            </div>
        </div>
    );
};

export default LatestReview;
