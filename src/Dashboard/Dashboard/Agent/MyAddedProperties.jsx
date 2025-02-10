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
        <div>
            <h1 className="text-4xl font-bold mb-20 text-center">My Added Properties</h1>

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
                                    <p><span className='font-bold'>Price Range:</span> ${item.price_range?.minimum_price} to ${item.price_range?.maximum_price}</p>
                                    <p><span className='font-bold'>Verification Status:</span> <span className='text-red-300'>
                                        {item.verification_status}</span> </p>
                                    <div className="card-actions mt-3 justify-between">

                                        <Link to={`/dashboard/updateProperty/${item._id}`}>
                                            <button className="btn  bg-green-500 text-black hover:text-green-400 border-none">Update</button>
                                        </Link>


                                        <button onClick={() => handleDelete(item._id)} className="btn  bg-red-500 text-black hover:text-red-400 border-none">Delete</button>
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

export default MyAddedProperties;