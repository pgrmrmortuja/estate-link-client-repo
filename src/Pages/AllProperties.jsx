import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure';

const AllProperties = () => {

    const axiosSecure = useAxiosSecure();

    const { data: properties = [] } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/status/verified`);
            console.log("Properties Response:", res.data); // Debugging
            return res.data;
        }
    });
    console.log(properties);


    return (
        <div className='container mx-auto p-4'>
            <h1 className="text-4xl font-bold mb-20 text-center">All Properties</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-5'>
                {
                    properties.map(item =>
                        <div key={item._id} className="card border-2 border-green-400 bg-base-100 w-96 shadow-xl mt-5 mb-10">

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
                                    className="rounded-xl" />
                            </figure>

                            <div className="card-body flex flex-grow justify-end ml-4">
                                <h2 className="card-title">{item.property_title}</h2>
                                <p><span className='font-bold'>Location:</span> {item.property_location}</p>
                                <p><span className='font-bold'>Agent Name:</span> {item.agent_name}</p>
                                <p><span className='font-bold'>Price Range:</span> ${item.price_range.minimum_price} to ${item.price_range.maximum_price}</p>
                                <p><span className='font-bold'>Status:</span> <span className='text-green-500 border-2 border-green-500 rounded-lg p-1'>
                                    {item.verification_status}</span> </p>
                                <div className="card-actions mt-3 justify-start w-full">

                                    <Link className='w-full' to={`/propertyDetails/${item._id}`}>
                                        <button className="btn  bg-green-500 text-black hover:text-green-400 border-none w-full">Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default AllProperties;