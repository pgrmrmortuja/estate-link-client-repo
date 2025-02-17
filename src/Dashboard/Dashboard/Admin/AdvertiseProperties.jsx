import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const AdvertiseProperties = () => {

    const axiosSecure = useAxiosSecure();

    const [advertisedIds, setAdvertisedIds] = useState([]);

    useEffect(() => {
        const fetchAdvertisedIds = async () => {
            const res = await axiosSecure.get('/advertised-properties');
            setAdvertisedIds(res.data);
        };
        fetchAdvertisedIds();
    }, []);

    const { data: properties = [] } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/status/verified`);
            return res.data;
        }
    });
    console.log(properties);

    const handleAdvertise = async (property) => {
        try {

            if (advertisedIds.includes(property._id)) {
                return;
            }

            const checkResponse = await axiosSecure.get(`/is-advertised/${property._id}`);

            if (checkResponse.data.advertised) {
                Swal.fire({
                    icon: "info",
                    title: "Already Advertised!",
                    text: "This property is already advertised.",
                });
                return;
            }

            const response = await axiosSecure.post('/advertise', property);

            if (response.data.insertedId) {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: `${property.property_title} advertised successfully!`,
                    showConfirmButton: false,
                    timer: 1500
                });

                setAdvertisedIds(prev => [...prev, property._id]);
            }
        } catch (error) {
            console.error("Error while advertising:", error);
            Swal.fire({
                icon: "error",
                title: "Failed to advertise!",
                text: "Something went wrong.",
            });
        }
    };


    return (
        <div className='container mx-auto p-4'>
            <Helmet>
                <title>Advertise | EstateLink</title>
            </Helmet>
            <h1 className="text-4xl font-bold mb-20 text-center">Advertise Properties</h1>

            <div className="overflow-x-auto">
                <table className="table table-xs w-full">
                    <thead>
                        <tr>
                            <th className='text-center'>SL</th>
                            <th className='text-center'>Image</th>
                            <th className='text-center'>Property Title</th>
                            <th className='text-center'>Agent</th>
                            <th className='text-center'>Price Range</th>
                            <th className='text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((property, index) => (
                            <tr key={property._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={property.property_image}
                                                alt={property.property_title} />
                                        </div>
                                    </div>
                                </td>
                                <td>{property.property_title}</td>
                                <td>{property.agent_name}</td>
                                <td>${property.price_range.minimum_price} - ${property.price_range.maximum_price}</td>
                                <td className='text-center'>
                                    <button
                                        onClick={() => handleAdvertise(property)}

                                        className='btn btn-success btn-sm mr-2 '

                                        disabled={advertisedIds.includes(property._id)}
                                    >
                                        {advertisedIds.includes(property._id) ? "Advertised" : "Make Advertise"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdvertiseProperties;