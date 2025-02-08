import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

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
        <div>
            <h1 className="text-4xl font-bold mb-20 text-center">Property Bought</h1>

            {properties.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40">
                    <p className="text-2xl text-red-600 font-semibold">No Property Added Yet</p>
                    <p className="text-lg text-red-600">It seems you haven't added any property yet. Browse and add your first property!</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-5'>
                    {
                        properties.map(item =>
                            <div key={item._id} className="card border-2 border-green-400 bg-base-100 w-96 shadow-xl mt-5 mb-10">

                                <figure className="px-10 pt-10">
                                    <img
                                        src={item.property_image}
                                        alt={item.property_title}
                                        className="rounded-xl" />
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

                                            <Link to={`/payment/${item._id}`}>
                                                <button className="btn  bg-green-500 text-black hover:text-green-400 border-none">Pay</button>
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