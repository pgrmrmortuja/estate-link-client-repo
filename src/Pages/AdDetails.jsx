import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import Review from './Review';
import useAxiosSecure from '../hooks/useAxiosSecure';

const AdDetails = () => {
    // const {property} = useLoaderData();

    const { user } = useContext(AuthContext);

    const axiosSecure = useAxiosSecure();

    const userEmail = user?.email;

    const {
        _id,
        agent_name,
        agent_email,
        agent_image,
        property_title,
        property_location,
        property_details,
        price_range,
        property_image
    } = useLoaderData();

    const myProperty = {
        myPropertyId: _id,
        agent_name,
        agent_email,
        agent_image,
        property_title,
        property_location,
        property_details,
        price_range,
        property_image,
        userEmail
    };

    const handleWishlist = async event => {
        event.preventDefault();

        try {
            // Check if the property already exists in the wishlist
            const checkRes = await axiosSecure.get(`/wishlists/check/${_id}?userEmail=${userEmail}`);
            if (checkRes.data.exists) {
                // If it exists, show a warning popup
                Swal.fire({
                    position: "top",
                    icon: "warning",
                    title: `${property_title} is already in your wishlist.`,
                    showConfirmButton: false,
                    timer: 1500
                });
                return;
            }

            // If it doesn't exist, add to the wishlist
            const propertyRes = await axiosSecure.post('/wishlists', myProperty);

            if (propertyRes.data.insertedId) {
                // Show success popup
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: `${property_title} has been added to your wishlist.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Something went wrong. Please try again later.",
                showConfirmButton: false,
                timer: 1500
            });
        }

    }


    return (
        <div className='container mx-auto p-4'>
            <h2 className="text-center text-3xl font-bold mb-5">Property Details</h2>
            <div className="hero bg-base-200 border-2 border-green-500 p-5 sm:p-10 rounded-lg">
                <div className="hero-content flex flex-col md:flex-row items-center gap-5">
                    <img
                        src={property_image}
                        alt={property_title}
                        className="w-full max-w-xs md:max-w-sm rounded-lg shadow-lg"
                    />
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-semibold">{property_title}</h1>
                        <p className="text-lg mt-2">
                            <strong>Location:</strong> {property_location}
                        </p>
                        <p className="text-lg mt-2">
                            <strong>Price Range:</strong> ${price_range?.minimum_price} to ${price_range?.maximum_price}
                        </p>
                        <p className="text-lg mt-2">
                            <strong>Agent:</strong> {agent_name}
                        </p>
                        <p className="text-lg mt-2">
                            <strong>Agent Email:</strong> {agent_email}
                        </p>
                        <p className="text-lg mt-2">
                            <strong>Description:</strong> {property_details}
                        </p>


                        <button
                            onClick={handleWishlist}
                            className="btn bg-green-500 hover:bg-green-600 text-white mt-4"
                        >
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>

            <Review
            myProperty = {myProperty}
            
            >

            </Review>
        </div>
    );
};

export default AdDetails;