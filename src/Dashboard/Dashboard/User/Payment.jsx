import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {

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
    } = useLoaderData();

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