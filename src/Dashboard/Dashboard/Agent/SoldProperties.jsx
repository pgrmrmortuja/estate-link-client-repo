import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const SoldProperties = () => {

    const axiosSecure = useAxiosSecure();

    const { user } = useAuth();

    const { data: properties = [] } = useQuery({
        queryKey: ['properties', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/agent-sold/${user?.email}`);
            return res.data;
        }
    });
    console.log(properties);


    return (
        <div className='container mx-auto p-4'>
            <Helmet>
                <title>My Sold Property | EstateLink</title>
            </Helmet>
            <h1 className="text-4xl font-bold mb-20 text-center">My Sold Properties</h1>

            <div className="overflow-x-auto">
                <table className="table table-xs w-full">
                    <thead>
                        <tr>
                            <th className='text-center'>SL</th>
                            <th className='text-center'>Property Title</th>
                            <th className='text-center'>Location</th>
                            <th className='text-center'>Buyer Name</th>
                            <th className='text-center'>Buyer Email</th>
                            <th className='text-center'>Price</th>

                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((property, index) => (
                            <tr key={property._id}>
                                <th className='text-center'>{index + 1}</th>
                                <td className='text-center'>{property.property_title}</td>
                                <td className='text-center'>{property.property_location}</td>
                                <td className='text-center'>{property.buyer_name}</td>
                                <td className='text-center'>{property.buyer_email}</td>
                                <td className='text-center'>${property.price}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SoldProperties;