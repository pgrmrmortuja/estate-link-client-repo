import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageProperties = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch all products
    const { data: properties = [], refetch } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const response = await axiosSecure.get('/properties');
            return response.data;
        },
    });

    console.log(properties);


    const handleStatusChange = async (id, verification_status) => {

        const propertyRes = await axiosSecure.patch(`/property-id/${id}`, { verification_status: verification_status });

        console.log("Response for status from API:", propertyRes.data);


        if (propertyRes.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
                position: "top",
                icon: "success",
                title: `Status changed to ${verification_status}`,
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                icon: "info",
                title: "No Changes Made",
                text: "The status was already the same.",
            });
        }

    }




    return (
        <div className="container mx-auto my-10 px-4">
            <h1 className="text-4xl font-bold mb-10 text-center">Manage Properties</h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th className='text-center'>SL</th>
                            <th className='text-center'>Property Title</th>
                            <th className='text-center'>Location</th>
                            <th className='text-center'>Agent</th>
                            <th className='text-center'>Email</th>
                            <th className='text-center'>Price Range</th>
                            <th className='text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((property, index) => (
                            <tr key={property._id}>
                                <th>{index + 1}</th>
                                <td>{property.property_title}</td>
                                <td>{property.property_location}</td>
                                <td>{property.agent_name}</td>
                                <td>{property.agent_email}</td>
                                <td>${property.price_range.minimum_price} - ${property.price_range.maximum_price}</td>
                                <td className='text-center'>
                                    {property.verification_status === "pending" ? (
                                        <>
                                            <button onClick={() => handleStatusChange(property._id, 'verified')} className='btn btn-success mr-2'>Verify</button>
                                            <button onClick={() => handleStatusChange(property._id, 'rejected')} className='btn btn-error'>Reject</button>
                                        </>
                                    ) : (
                                        <span className={`font-bold ${property.verification_status === 'verified' ? 'text-green-500' : 'text-red-500'}`}>{property.verification_status}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProperties;