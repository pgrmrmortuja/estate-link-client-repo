import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const UpdateProperty = () => {
    const { id } = useParams();
    const [item, setItem] = useState({});
    const { user } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProperty = async () => {
            const response = await axiosSecure.get(`/property-id/${id}`);
            setItem(response.data);
        };

        fetchProperty();
    }, [id]);

    const {
        _id,
        agent_name,
        agent_email,
        agent_image,
        property_title,
        property_location,
        property_details,
        verification_status,
        price_range,
        property_image
    } = item;

    console.log(property_title);





    const onSubmit = async (data) => {
        console.log(data);
        // image upload to imgbb and then get an url
        let property_image_url = property_image;


        if (data.property_image && data.property_image?.[0]) {
            const imageFile = { image: data.property_image?.[0] };

            try {
                const res = await axiosPublic.post(image_hosting_api, imageFile, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                });

                if (res.data.success) {
                    property_image_url = res.data.data.display_url;
                }
            } catch (error) {
                console.error("Image upload failed:", error);
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: "Image upload failed!",
                    showConfirmButton: true,
                });
                return;
            }
        }

        // now send data to the server with the image url
        const property = {
            agent_name: data.agent_name,
            agent_email: data.agent_email,
            agent_image: data.agent_image,
            property_title: data.property_title || property_title,
            property_location: data.property_location || property_location,
            property_details: data.property_details || property_details,
            verification_status: data.verification_status,
            price_range: {
                minimum_price: parseFloat(data.minimum_price || price_range.minimum_price),
                maximum_price: parseFloat(data.maximum_price || price_range.maximum_price),
            },
            property_image: property_image_url,
        };

        try {
            const propertyRes = await axiosSecure.put(`/property-id/${_id}`, property);

            if (propertyRes.data.modifiedCount > 0 || propertyRes.data.acknowledged) {
                navigate("/dashboard/MyAddedProperties");
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: `${data?.property_title || property_title} is updated.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    position: "top",
                    icon: "warning",
                    title: "No changes were made!",
                    showConfirmButton: true,
                });
            }
        } catch (error) {
            console.error("Property update failed:", error);
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Property update failed!",
                showConfirmButton: true,
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen  p-6">
            <Helmet>
                <title>Updated Property | EstateLink</title>
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
                        defaultValue={property_title}
                        {...register("property_title")}
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
                        defaultValue={property_location}
                        {...register("property_location")}
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
                            {...register("property_image")}
                            type="file"
                            className="file-input bg-white w-full border-2 border-gray-300 rounded-lg text-black"
                        />
                    </div>
                </div>


                {/* Property Details */}
                <div className="mb-4">
                    <label htmlFor="property_details" className="block text-lg font-medium text-gray-700">
                        Property Details
                    </label>
                    <textarea
                        name="property_details"
                        defaultValue={property_details}
                        {...register("property_details")}
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
                            defaultValue={price_range?.minimum_price}
                            {...register("minimum_price")}
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
                            defaultValue={price_range?.maximum_price}
                            {...register("maximum_price")}
                            className="mt-2 bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        />
                    </div>
                </div>


                <button
                    type="submit"
                    className="w-full font-bold py-3 rounded-lg items-center btn  bg-pink-500 text-black hover:text-pink-400 border-none"
                >
                    Update Property
                </button>
            </form>
        </div>
    );
};

export default UpdateProperty;