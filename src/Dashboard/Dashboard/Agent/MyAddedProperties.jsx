import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyAddedProperties = () => {

    const axiosSecure = useAxiosSecure();

    const { user } = useAuth();

    const { data: properties = [], refetch } = useQuery({
        queryKey: ['properties', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/agent-property/${user?.email}`);
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


                axiosSecure.delete(`/properties/${id}`)
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
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-14 text-center">My Added Properties</h1>

            {properties.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-center">
                    <p className="text-xl md:text-2xl text-red-600 font-semibold">No Property Added Yet</p>
                    <p className="text-md md:text-lg text-gray-600">It seems you haven't added any property yet. Browse and add your first property!</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
                    {properties.map(item => (
                        <div key={item._id} className="card border border-gray-300 bg-white shadow-lg rounded-lg transform transition duration-300 hover:scale-105">
                            <div className='relative'>
                                <div className='absolute -top-8 left-1/2 transform -translate-x-1/2'>
                                    <img
                                        src={item.agent_image}
                                        alt={item.agent_name}
                                        className="rounded-full border-4 border-green-400 w-16 h-16 sm:w-20 sm:h-20 object-cover" />
                                </div>
                            </div>

                            <figure className="px-6 pt-10 mt-4">
                                <img
                                    src={item.property_image}
                                    alt={item.property_title}
                                    className="rounded-xl w-full h-48 object-cover" />
                            </figure>
                            <div className="p-6 text-gray-800">
                                <h2 className="text-lg md:text-xl font-semibold mb-2">{item.property_title}</h2>
                                <p><span className='font-bold'>Location:</span> {item.property_location}</p>
                                <p><span className='font-bold'>Agent Name:</span> {item.agent_name}</p>
                                <p><span className='font-bold'>Price Range:</span> ${item.price_range?.minimum_price} - ${item.price_range?.maximum_price}</p>
                                <p><span className='font-bold'>Verification Status:</span> <span className='text-red-500'>{item.verification_status}</span></p>
                                <div className="flex justify-between mt-4">
                                    <Link to={`/dashboard/updateProperty/${item._id}`}>
                                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Update</button>
                                    </Link>
                                    <button onClick={() => handleDelete(item._id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyAddedProperties;