import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { Helmet } from 'react-helmet-async';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProperty = () => {
    const { user } = useContext(AuthContext);

    const { register, handleSubmit, reset } = useForm();

    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        console.log(data);

        //image upload to imgbb and then get an url
        const imageFile = { image: data.property_image[0] };

        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log('with image url', res.data);
        if (res.data.success) {
            console.log('image sending', res.data.data.display_url);
            //now send the property data to the server withe the image url
            const property = {
                agent_name: data.agent_name,
                agent_email: data.agent_email,
                agent_image: data.agent_image,
                property_title: data.property_title,
                property_location: data.property_location,
                property_details: data.property_details,
                verification_status: data.verification_status,
                price_range: {
                    minimum_price: parseFloat(data.minimum_price),
                    maximum_price: parseFloat(data.maximum_price),
                },
                property_image: res.data.data.display_url
            }


            //
            const propertyRes = await axiosSecure.post('/properties', property);
            console.log(propertyRes.data);

            if (propertyRes.data.insertedId) {
                //show success popup
                reset();
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: `${data.property_title} is added to the properties.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen  p-6">
            <Helmet>
                <title>Add Property | EstateLink</title>
            </Helmet>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg bg-pink-100 p-8 rounded-lg shadow-lg space-y-6">
                <h2 className="text-3xl font-bold text-center text-black mb-10">Add New Property</h2>

                {/* Agent Name (Read-only) */}
                <div className="mb-4">
                    <label htmlFor="agent_name" className="block text-lg font-medium text-gray-700">
                        Your Name (As Agent)
                    </label>
                    <input
                        type="text"
                        defaultValue={user?.displayName || ""}
                        readOnly
                        placeholder="Name"
                        {...register('agent_name', { required: true })}
                        required
                        className="input input-bordered mt-2 bg-white w-full border-2 border-gray-300 rounded-lg" />
                </div>

                {/* Agent Email (Read-only) */}
                <div className="mb-4">
                    <label htmlFor="agent_email" className="block text-lg font-medium text-gray-700">
                        Your Email (As Agent)
                    </label>
                    <input
                        type="text"
                        defaultValue={user?.email || ""}
                        readOnly
                        placeholder="email"
                        {...register('agent_email', { required: true })}
                        required
                        className="input input-bordered mt-2 bg-white w-full border-2 border-gray-300 rounded-lg" />
                </div>

                {/* Agent Photo (Read-only) */}
                <div className="mb-4">
                    <label htmlFor="agent_image" className="block text-lg font-medium text-gray-700">
                        Your Image URL (As Agent)
                    </label>
                    <input
                        type="text"
                        defaultValue={user?.photoURL || ""}
                        readOnly
                        placeholder="photo"
                        {...register('agent_image', { required: true })}
                        required
                        className="input input-bordered mt-2 bg-white w-full border-2 border-gray-300 rounded-lg" />
                </div>

                {/* Property Title */}
                <div className="mb-4">
                    <label htmlFor="property_title" className="block text-lg font-medium text-gray-700">
                        Property Title
                    </label>
                    <input
                        type="text"
                        name="property_title"
                        {...register("property_title", { required: true })}
                        className="mt-2 bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                    />
                </div>

                {/* Property Location */}
                <div className="mb-4">
                    <label htmlFor="property_location" className="block text-lg font-medium text-gray-700">
                        Property Location
                    </label>
                    <input
                        type="text"
                        name="property_location"
                        {...register("property_location", { required: true })}
                        className="mt-2 bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                    />
                </div>


                {/* Property Status */}
                <div className="mb-4">
                    <label htmlFor="verification_status" className="block text-lg font-medium text-gray-700">
                        Property Status (Default)
                    </label>
                    <input
                        type="text"
                        name="verification_status"
                        {...register("verification_status", { required: true })}
                        defaultValue={"pending"}
                        readOnly
                        className="mt-2 bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-not-allowed text-black"
                    />
                </div>


                {/* Property Image */}
                <div className="mb-4">
                    <label htmlFor="property_image" className="block text-lg font-medium text-gray-700">
                        Property Image
                    </label>

                    <div className='form-control w-full my-6'>
                        <input
                            name='property_image'
                            {...register("property_image", { required: true })}
                            type="file"
                            className="file-input bg-white w-full border-2 border-gray-300 rounded-lg text-black" />
                    </div>
                </div>


                {/* Property Details */}
                <div className="mb-4">
                    <label htmlFor="property_details" className="block text-lg font-medium text-gray-700">
                        Property Details
                    </label>
                    <textarea
                        name="property_details"
                        {...register("property_details", { required: true })}
                        className="text-black textarea textarea-bordered mt-2 border-2 border-gray-300 h-24 bg-white w-full"
                        placeholder="Property Bio"></textarea>
                </div>

                {/* Price */}
                <div className="mb-4 flex gap-4">
                    {/* Minimum Price */}
                    <div className="mb-4">
                        <label htmlFor="minimum_price" className="block text-lg font-medium text-gray-700">
                            Property Price (Min)
                        </label>
                        <input
                            type="number"
                            name="minimum_price"
                            {...register("minimum_price", { required: true })}
                            className="mt-2 bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        />
                    </div>

                    {/* Maximum Price */}
                    <div className="mb-4">
                        <label htmlFor="maximum_price" className="block text-lg font-medium text-gray-700">
                            Property Price (Max)
                        </label>
                        <input
                            type="number"
                            name="maximum_price"
                            {...register("maximum_price", { required: true })}
                            className="mt-2 bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        />
                    </div>
                </div>


                <button
                    type="submit"
                    className="w-full font-bold py-3 rounded-lg items-center btn  bg-pink-500 text-black hover:text-pink-400 border-none"
                >
                    Add Property
                </button>
            </form>
        </div>
    );
};

export default AddProperty;