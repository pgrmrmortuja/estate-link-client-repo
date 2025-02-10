import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const LimitAd = () => {

    // const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const { data: limits = [] } = useQuery({
        queryKey: ['limits'],
        queryFn: async () => {
            const response = await axiosPublic.get(`/advertise-limited?limit=${4}`);
            return response.data;
        },
    });

    console.log(limits);

    return (
        <div className='mb-20'>
            <h2 className="text-center text-4xl font-bold p-2 mb-10">Advertisement</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mb-5'>
                {
                    limits.map(limit =>
                        <div key={limit._id} className="card border-2 border-green-500 bg-base-100 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img
                                    src={limit.property_image}
                                    alt={limit.property_title}
                                    className="rounded-xl" />
                            </figure>
                            <div className="card-body flex flex-grow justify-end ml-4">
                                <h2 className="card-title">{limit.property_title}</h2>
                                <p>Location: {limit.property_location}</p>

                                <p><span className='font-bold'>Price Range:</span> ${limit.price_range.minimum_price} to ${limit.price_range.maximum_price}</p>

                                <p><span className='font-bold'>Status:</span> <span className='text-green-500 border-2 border-green-500 rounded-lg p-1'>
                                    {limit.verification_status}</span> </p>

                                <div className="card-actions mt-3 justify-start w-full">

                                    <Link className='w-full' to={`/propertyDetails/${limit._id}`}>
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

export default LimitAd;