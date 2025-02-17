import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const Manage = () => {

    const axiosPublic = useAxiosPublic();

    const queryClient = useQueryClient();

    // Fetch all products
    const { data: properties, isLoading, isError } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const response = await axiosPublic.get('/properties');
            return response.data;
        },
    });

    // Mutation to update product status

    const updateStatusMutation = useMutation({
        mutationFn: async ({ id, status }) => {
            return axiosPublic.patch(`/property-id/${id}`, { status });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['properties']);
        },
    });

    // Local state to manage button visibility and status
    const [propertyStatus, setPropertyStatus] = useState({});

    const handleStatusChange = (id, status) => {
        updateStatusMutation.mutate({ id, status }, {
            onSuccess: () => {
                setPropertyStatus((prev) => ({
                    ...prev,
                    [id]: status,
                }));
            },
        });
    };

    if (isLoading) {
        return <p>Loading products...</p>;
    }

    if (isError) {
        return <p>Failed to load products. Please try again later.</p>;
    }

    // const handleStatusChange = (id, status) => {
    //     updateStatusMutation.mutate({ id, status });
    // };


    // const getStatusClass = (status) => {
    //     switch (status) {
    //         case 'verified':
    //             return 'text-pink-500 font-bold'; // pink color for verified
    //         case 'rejected':
    //             return 'text-red-500 font-bold'; // Red color for rejected
    //         default:
    //             return 'text-yellow-500 font-bold'; // Yellow color for pending
    //     }
    // };



    return (
        <div className="container mx-auto my-10 px-4">
            <h1 className="text-4xl font-bold mb-10 text-center">Manage Properties</h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className='text-center'>SL</th>
                            <th className='text-center'>Property Title</th>
                            <th className='text-center'>Property Location</th>
                            <th className='text-center'>Agent Name</th>
                            <th className='text-center'>Agent Email</th>
                            <th className='text-center'>Price Range</th>
                            <th className='text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            properties.map((property, index) =>
                                <tr key={property._id}>
                                    <th>{index + 1}</th>
                                    <td>{property.property_title}</td>
                                    <td>{property.property_location}</td>
                                    <td>{property.agent_name}</td>
                                    <td>{property.agent_email}</td>
                                    <td>${property.price_range.minimum_price} to ${property.price_range.maximum_price}</td>


                                    {/* <td>
                                        <button
                                            onClick={() => handleStatusChange(property._id, 'verified')} className='btn mr-2'>Verify</button>


                                        <button
                                            onClick={() => handleStatusChange(property._id, 'rejected')}
                                            className='btn'>Reject</button>
                                    </td> */}


                                    <td className="text-center">
                                        {propertyStatus[property._id] ? (
                                            // Show status after button click
                                            <span
                                                className={`font-bold ${propertyStatus[property._id] === 'verified'
                                                    ? 'text-pink-500'
                                                    : 'text-red-500'
                                                    }`}
                                            >
                                                {propertyStatus[property._id]}
                                            </span>
                                        ) : (
                                            // Show buttons before status is updated 
                                            <>
                                                {
                                                    property.verification_status === "pending" &&

                                                    <div>
                                                        <button
                                                            onClick={() => handleStatusChange(property._id, 'verified')}
                                                            className="btn btn-success mr-2"
                                                        >
                                                            Verify
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusChange(property._id, 'rejected')}
                                                            className="btn btn-error"
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                }

                                            </>
                                        )}
                                    </td>
                                </tr>
                            )
                        }

                        <div>

                            {
                                property.verification_status === "pending" &&

                                (<>
                                    <button>verified</button>
                                    <button>rejected</button>
                                </>) || (property.verification_status)

                            }
                        </div>

                        <div>
                            {
                                <></> || (property.verification_status)
                            }
                        </div>

                        <div>
                            {
                                user.role === "User" && 
                                (<button></button>) 
                                || 
                                user.role === "Admin" &&
                                (user.role)
                            }
                        </div>
                        <div>
                            {
                                user.role === "User" && 
                                (<button></button>) 
                                || 
                                (user.role)
                            }
                        </div>
                        <div>
                            {
                                user.role === "User" && user.role === "Agent" && 
                                (<button>Fraud</button>) 
                                || 
                                (user.role)
                            }
                        </div>

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Manage;