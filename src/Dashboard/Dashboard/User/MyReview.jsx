import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyReview = () => {
    const axiosSecure = useAxiosSecure();

    const { user } = useAuth();

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-review/${user?.email}`);
            return res.data;
        }
    });
    console.log(reviews);


    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/remove-review/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "The review has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    return (
        <div>
            <h1 className="text-4xl font-bold mb-20 text-center">My Review</h1>

            {reviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40">
                    <p className="text-2xl text-red-600 font-semibold">No Review Added Yet</p>
                    <p className="text-lg text-red-600">It seems you haven't added any review yet. Browse property and add your first review!</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-5'>
                    {
                        reviews.map(item =>
                            <div key={item._id} className="card border-2 border-green-400 bg-base-100 w-96 shadow-xl mt-5 mb-10">

                                <div className="card-body flex flex-grow justify-end ml-4">
                                    <h2 className="card-title">{item.property_title}</h2>
                                    <p><span className='font-bold'>Agent Name:</span> {item.agent_name}</p>
                                    <p><span className='font-bold'>Review Time:</span> {item.review_time}</p>
                                    <p><span className='font-bold'>Description:</span> {item.review_description}</p>

                                    <div className="card-actions mt-3 justify-start">

                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="btn  bg-red-500 text-black hover:text-red-400 border-none">Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            )}
        </div>
    );
};

export default MyReview;