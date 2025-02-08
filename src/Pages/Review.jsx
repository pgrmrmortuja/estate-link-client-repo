import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';


const Review = ({ myProperty }) => {

    const [isModalOpen, setIsModalOpen] = useState(false); // Modal State
    const [newReview, setNewReview] = useState('');
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { agent_name, myPropertyId, property_title, } = myProperty;

    const reviewer_name = user?.displayName;
    const reviewer_email = user?.email;
    const reviewer_image = user?.photoURL;
    const review_time = new Date().toLocaleString();
    const review_description = newReview;

    const reviewData = { agent_name, myPropertyId, property_title, reviewer_name, reviewer_email, reviewer_image, review_time, review_description };

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews', myPropertyId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/review-id/${myPropertyId}`);
            return res.data;
        }
    });


    const handleAddReview = async event => {
        event.preventDefault();

        // Check if review is empty
        if (!newReview.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Oops!",
                text: "Please write something before submitting!",
                confirmButtonColor: "#3085d6",
            });
            return; // Stop function execution if textarea is empty
        }

        const propertyRes = await axiosSecure.post('/reviews', reviewData);

        if (propertyRes.data.insertedId) {
            refetch();
            setNewReview('');
            setIsModalOpen(false);
            // Show success popup
            Swal.fire({
                position: "top",
                icon: "success",
                title: `Your Review Added Successfully`,
                showConfirmButton: false,
                timer: 1500
            });
        }

        console.error("Error adding to wishlist:", error);
        Swal.fire({
            position: "top",
            icon: "error",
            title: "Something went wrong. Please try again later.",
            showConfirmButton: false,
            timer: 1500
        });

    }

    return (
        <div className='container mx-auto p-4 mt-10'>
            <h3 className="text-2xl font-bold mb-5">Reviews for {property_title}</h3>

            <div className="mb-6">
                {reviews.length > 0 ? (
                    <div>
                        {reviews.map((review) => (
                            <div key={review._id} className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm flex items-start flex-col md:flex-row">
                                {/* Reviewer Image */}
                                <img
                                    src={review.reviewer_image}
                                    alt={review.reviewer_name}
                                    className="w-12 h-12 rounded-full mb-4 md:mb-0 md:mr-4"
                                />

                                <div className="flex flex-col">
                                    {/* Reviewer Name */}
                                    <p className="font-semibold text-lg">{review.reviewer_name}</p>

                                    {/* Review Description */}
                                    <p className="text-lg mt-2">{review.review_description}</p>

                                    {/* Review Time */}
                                    <p className="text-sm text-gray-500 mt-2">
                                        {review.review_time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No reviews yet. Be the first to leave a review!</p>
                )}
            </div>

            {/* <div>
                <textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                    rows="4"
                    name='newReview'
                    placeholder="Write your review here..."
                ></textarea>
                <button
                    onClick={handleAddReview}
                    className="btn bg-blue-500 hover:bg-blue-600 text-white"
                >
                    Add a Review
                </button>
            </div> */}


            {/* Add Review Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="btn bg-blue-500 hover:bg-blue-600 text-white"
            >
                Add a Review
            </button>


            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Write a Review</h2>

                        <textarea
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="4"
                            placeholder="Write your review here..."
                        ></textarea>

                        <div className="flex justify-end mt-4">
                            <button onClick={() => setIsModalOpen(false)} className="btn btn-sm bg-gray-400 text-white mr-2">
                                Cancel
                            </button>
                            <button onClick={handleAddReview} className="btn btn-sm bg-blue-500 text-white">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Review;
