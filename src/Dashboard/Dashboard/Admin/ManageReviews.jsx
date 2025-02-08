import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageReviews = () => {

    const axiosSecure = useAxiosSecure();

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews`);
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
            <h1 className="text-4xl font-bold mb-20 text-center">Mange Reviews</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-5'>
                {
                    reviews.map(item =>
                        <div key={item._id} className="card border-2 border-green-400 bg-base-100 shadow-xl mt-5 mb-10">

                            <figure className="px-10 pt-10 ">
                                <img
                                    src={item.reviewer_image}
                                    alt={item.reviewer_name}
                                    className="rounded-xl" />
                            </figure>
                            <div className="card-body flex flex-grow justify-end ml-4">
                                <p><span className='font-bold'>Reviewer Name:</span> {item.reviewer_name}</p>
                                <p><span className='font-bold'>Reviewer Email:</span> {item.reviewer_email}</p>
                                <p><span className='font-bold'>Property Title:</span> {item.property_title}</p>
                                <p><span className='font-bold'>Review:</span> {item.review_description}</p>

                                <div className="card-actions mt-3 justify-between">

                                    <button
                                        onClick={() => handleDelete(item._id)} 
                                        className="btn  bg-red-500 text-black hover:text-red-400 border-none">Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    );
};

export default ManageReviews;