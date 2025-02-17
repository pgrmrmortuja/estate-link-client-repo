import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const PropertyBought = () => {

    const axiosSecure = useAxiosSecure();

    const { user } = useAuth();

    const { data: properties = [], refetch } = useQuery({
        queryKey: ['properties', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-offers/${user?.email}`);
            return res.data;
        }
    });
    console.log(properties);


    return (
        <div className='container mx-auto px-4 py-10'>
            <Helmet>
                <title>Property Bought | EstateLink</title>
            </Helmet>
            <h1 className="text-4xl font-bold mb-14 text-center">Property Bought</h1>

            {properties.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40">
                    <p className="text-2xl text-red-600 font-semibold">No Property Added Yet</p>
                    <p className="text-lg text-red-600">It seems you haven't added any property yet. Browse and add your first property!</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
                    {
                        properties.map(item =>
                            <div key={item._id} className="card border border-gray-300 bg-white shadow-lg rounded-lg transform transition duration-300 hover:scale-105">

                                <figure className="px-10 pt-10">
                                    <img
                                        src={item.property_image}
                                        alt={item.property_title}
                                        className="rounded-xl w-full h-48 object-cover" />
                                </figure>
                                <div className="card-body flex flex-grow justify-end ml-4">
                                    <h2 className="card-title">{item.property_title}</h2>
                                    <p><span className='font-bold'>Location:</span> {item.property_location}</p>
                                    <p><span className='font-bold'>Agent Name:</span> {item.agent_name}</p>

                                    <p><span className='font-bold'>Offered Amount:</span> ${item.offer_amount}</p>

                                    <p><span className='font-bold'>Verification Status:</span> <span className=''>
                                        {item.status}</span> </p>
                                    <div className="card-actions mt-3 justify-between">
                                        {
                                            item.status === "accepted" &&

                                            <Link to={`/dashboard/payment/${item._id}`}>
                                                <button className="btn  bg-pink-500 text-black hover:text-pink-400 border-none">Pay</button>
                                            </Link>
                                        }
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

export default PropertyBought;