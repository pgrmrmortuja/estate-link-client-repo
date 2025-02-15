import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const Wishlist = () => {

    const axiosSecure = useAxiosSecure();

    const { user } = useAuth();

    const { data: properties = [], refetch } = useQuery({
        queryKey: ['properties', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-wishlist/${user?.email}`);
            return res.data;
        }
    });
    console.log(properties);

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


                axiosSecure.delete(`/remove-wishlist/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "The property has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    return (
        <div>
            <h1 className="text-4xl font-bold mb-20 text-center">My Wishlist</h1>

            {properties.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40">
                    <p className="text-2xl text-red-600 font-semibold">No Property Added Here</p>
                    <p className="text-lg text-red-600">It seems you haven't added any property to your wishlist yet. Browse and add to your wishlist!</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-5'>
                    {
                        properties.map(item =>
                            <div key={item._id} className="border-2 border-green-400 card bg-white shadow-lg rounded-lg transform transition duration-300 hover:scale-105">

                                <div className='relative'>
                                    <div className='absolute -top-10 left-1/2 transform -translate-x-1/2'>
                                        <img
                                            src={item.agent_image}
                                            alt={item.agent_name}
                                            className="rounded-full border-4 border-green-400 w-20 h-20" />
                                    </div>
                                </div>

                                <figure className="px-10 pt-10 mt-8">
                                    <img
                                        src={item.property_image}
                                        alt={item.property_title}
                                        className="rounded-xl w-full h-48 object-cover" />
                                </figure>
                                <div className="card-body flex flex-grow justify-end ml-4">
                                    <h2 className="card-title">{item.property_title}</h2>
                                    <p><span className='font-bold'>Location:</span> {item.property_location}</p>
                                    <p><span className='font-bold'>Agent Name:</span> {item.agent_name}</p>

                                    <p><span className='font-bold'>Price Range:</span> ${item?.price_range?.minimum_price} to ${item?.price_range?.maximum_price}</p>

                                    <p><span className='font-bold'>Status:</span> <span className='text-green-500 border-2 border-green-500 rounded-lg p-1'>
                                        {"verified"}</span> </p>

                                    <div className="card-actions mt-3 justify-between">

                                        <Link to={`/dashboard/makeOffer/${item.myPropertyId}`}>
                                            <button className="btn  bg-green-500 text-black hover:text-green-400 border-none">Make An Offer</button>
                                        </Link>

                                        <button onClick={() => handleDelete(item._id)} className="btn  bg-red-500 text-black hover:text-red-400 border-none">Remove</button>
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

export default Wishlist;