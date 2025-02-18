import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const MakeOffer = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const [property, setProperty] = useState({});
    const [offerPrice, setOfferPrice] = useState('');
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.get(`/wishlist-id/${id}`)
            .then(res => setProperty(res.data))
            .catch(error => console.error("Error fetching property:", error));
    }, [id, axiosSecure]);


    const buyer_name = user?.displayName;
    const buyer_email = user?.email;
    const buying_date = new Date().toLocaleString();
    const status = "pending";
    const offer_amount = parseFloat(offerPrice);


    const {
        myPropertyId,
        agent_name,
        agent_email,
        agent_image,
        property_title,
        property_location,
        price_range,
        property_image
    } = property;

    console.log(myPropertyId);



    const offerData = {
        myPropertyId,
        agent_name,
        agent_email,
        agent_image,
        property_title,
        property_location,
        offer_amount,
        property_image,
        status,
        buyer_name,
        buyer_email,
        buying_date
    }


    const handleOffer = async (event) => {
        event.preventDefault();


        if (offerPrice < price_range.minimum_price || offerPrice > price_range.maximum_price) {
            Swal.fire({
                position: "top",
                icon: "error",
                title: `Offer price must be between ${price_range.minimum_price} and ${price_range.maximum_price}`,
                showConfirmButton: false,
                timer: 2000,
            });
            return;
        }

        try {

            const propertyRes = await axiosSecure.post('/offers', offerData);
            console.log('Property Response:', propertyRes.data);

            if (propertyRes.data.insertedId) {
                navigate("/dashboard/wishlist");
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "You successfully made an offer!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error("Error submitting offer:", error);
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Something went wrong. Please try again later.",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen  p-6">
            <Helmet>
                <title>Make Offer | EstateLink</title>
            </Helmet>
            <form onSubmit={handleOffer} className="w-full max-w-lg bg-pink-100 p-8 rounded-lg shadow-lg space-y-6">
                <h2 className="text-3xl font-bold text-center text-black mb-10">Make An Offer</h2>

                {/* Property Title (Read-only) */}
                <div className="mb-4">
                    <label htmlFor="property_title" className="block text-lg font-medium text-gray-700">
                        Property Title
                    </label>
                    <input
                        type="text"
                        name="property_title"
                        value={property_title}
                        readOnly
                        className="mt-2 w-full border-2 border-gray-300 rounded-lg px-4 py-2 bg-white cursor-not-allowed"
                    />
                </div>


                {/* Property Location (Read-only) */}
                <div className="mb-4">
                    <label htmlFor="property_location" className="block text-lg font-medium text-gray-700">
                        Property Location
                    </label>
                    <input
                        type="text"
                        name="property_location"
                        value={property_location}
                        readOnly
                        className="mt-2 w-full border-2 border-gray-300 rounded-lg px-4 py-2 bg-white cursor-not-allowed"
                    />
                </div>


                {/* Buyer Name (Read-only) */}
                <div className="mb-4">
                    <label htmlFor="buyer_name" className="block text-lg font-medium text-gray-700">
                        Buyer Name
                    </label>
                    <input
                        type="text"
                        name="buyer_name"
                        value={buyer_name}
                        readOnly
                        className="mt-2 w-full border-2 border-gray-300 rounded-lg px-4 py-2 bg-white cursor-not-allowed"
                    />
                </div>

                {/* Buyer Email (Read-only) */}
                <div className="mb-4">
                    <label htmlFor="buyer_email" className="block text-lg font-medium text-gray-700">
                        Buyer Email
                    </label>
                    <input
                        type="email"
                        name="buyer_email"
                        value={buyer_email}
                        readOnly
                        className="mt-2 w-full border-2 border-gray-300 bg-white rounded-lg px-4 py-2 cursor-not-allowed"
                    />
                </div>

                {/* Agent Name (Read-only) */}
                <div className="mb-4">
                    <label htmlFor="agent_name" className="block text-lg font-medium text-gray-700">
                        Agent Name
                    </label>
                    <input
                        type="text"
                        name="agent_name"
                        value={agent_name}
                        readOnly
                        className="mt-2 w-full border-2 border-gray-300 rounded-lg px-4 py-2 bg-white cursor-not-allowed"
                    />
                </div>

                {/* User Photo (Read-only) */}
                <div className="mb-4">
                    <label htmlFor="userEmail" className="block text-lg font-medium text-gray-700">
                        Buyer Image URL
                    </label>
                    <input
                        type="text"
                        name="userPhoto"
                        id="userEmail"
                        value={user?.photoURL || ""}
                        readOnly
                        className="mt-2 w-full border-2 border-gray-300 bg-white rounded-lg px-4 py-2 cursor-not-allowed"
                    />
                </div>


                {/* Offer Amount */}
                <div className="mb-4">
                    <label htmlFor="price" className="block text-lg font-medium text-gray-700">
                        Offer Amount
                    </label>
                    <input
                        type="text"
                        onChange={(e) => setOfferPrice(e.target.value)}
                        className="mt-2 bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>



                <button
                    type="submit"
                    className="w-full font-bold py-3 rounded-lg items-center btn  bg-pink-500 text-black hover:text-pink-400 border-none"
                >
                    Make Offer
                </button>
            </form>
        </div>
    );
};

export default MakeOffer;