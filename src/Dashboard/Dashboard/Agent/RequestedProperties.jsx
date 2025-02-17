import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const RequestedProperties = () => {
    const axiosSecure = useAxiosSecure();

    const { user } = useAuth();

    const { data: properties = [], refetch } = useQuery({
        queryKey: ['properties', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/agent-offers/${user?.email}`);
            return res.data;
        }
    });
    console.log(properties);


    const handleStatusChange = async (id, status, myPropertyId) => {

        const propertyRes = await axiosSecure.patch(`/offer-status/${id}`, {
            status: status,
            myPropertyId: myPropertyId
        });

        console.log("Response for status from API:", propertyRes.data);


        if (propertyRes.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
                position: "top",
                icon: "success",
                title: `Status changed to ${status}`,
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
            <Helmet>
                <title>Requested Property | EstateLink</title>
            </Helmet>
            <h1 className="text-4xl font-bold mb-10 text-center">Requested Properties</h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th className='text-center'>SL</th>
                            <th className='text-center'>Property Title</th>
                            <th className='text-center'>Location</th>
                            <th className='text-center'>Buyer Name</th>
                            <th className='text-center'>Buyer Email</th>
                            <th className='text-center'>Offered Price</th>
                            <th className='text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((property, index) => (
                            <tr key={property._id}>
                                <th>{index + 1}</th>
                                <td>{property.property_title}</td>
                                <td>{property.property_location}</td>
                                <td>{property.buyer_name}</td>
                                <td>{property.buyer_email}</td>
                                <td>${property.offer_amount}</td>
                                <td className='text-center'>
                                    {property.status === "pending" ? (
                                        <>
                                            <button onClick={() => handleStatusChange(property._id, 'accepted', property.myPropertyId)} className='btn btn-success mr-2'>Accept</button>

                                            <button onClick={() => handleStatusChange(property._id, 'rejected', property.myPropertyId)} className='btn btn-error'>Reject</button>
                                        </>
                                    ) : (
                                        <span className={`font-bold ${property.status === 'accepted' ? 'text-pink-500' : 'text-red-500'}`}>{property.status}</span>
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

export default RequestedProperties;