import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {

    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [property, setProperty] = useState({});


    useEffect(() => {
        axiosSecure.get(`/user-offers-id/${id}`)
            .then(res => {
                setProperty(res.data);

            })
            .catch(error => {
                console.error("Error fetching data:", error);

            });
    }, [id, axiosSecure]);

    const {
        _id,
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
        buying_date,
    } = property;

    const myProperty = {
        _id,
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
        buying_date,
    };

    console.log(myProperty);



    return (

        <div className='container mx-auto p-4 mt-10'>
            <Helmet>
                <title>Payment | EstateLink</title>
            </Helmet>
            <Elements stripe={stripePromise}>
                <CheckoutForm
                    key={myProperty._id}
                    myProperty={myProperty}>

                </CheckoutForm>
            </Elements>
        </div>

    );
};

export default Payment;