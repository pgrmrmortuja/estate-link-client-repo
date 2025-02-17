import React from 'react';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const CheckoutForm = ({ myProperty }) => {

    console.log(myProperty.agent_name);



    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();


    const price = myProperty.offer_amount;

    useEffect(() => {
        if (price && price > 0) {
            axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod)
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: myProperty.buyer_name,
                    email: myProperty.buyer_email,
                }
            }
        })

        if (confirmError) {
            console.log('confirm error', confirmError);
            setError(confirmError.message);
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent?.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    transactionId: paymentIntent.id,
                    myPropertyId: myProperty.myPropertyId,
                    buyer_name: myProperty.buyer_name,
                    buyer_email: myProperty.buyer_email,
                    agent_name: myProperty.agent_name,
                    agent_email: myProperty.agent_email,
                    agent_image: myProperty.agent_image,
                    property_title: myProperty.property_title,
                    property_location: myProperty.property_location,
                    price: price,
                    date: new Date().toLocaleString(),
                    status: 'bought',
                    property_image: myProperty.property_image,

                }


                try {
                    const res = await axiosSecure.post("/payments", payment);

                    if (res.data?.success) {
                        Swal.fire({
                            position: "top",
                            icon: "success",
                            title: "Payment Successful! 🎉",
                            text: "Your property purchase is confirmed.",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        // navigate("/dashboard/paymentHistory");
                    }
                } catch (error) {
                    if (error.response?.status === 400) {
                        Swal.fire({
                            icon: "error",
                            title: "Payment Failed!",
                            text: "You have already paid for this property.",
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Something went wrong!",
                            text: "Please try again later.",
                        });
                    }
                }

            }
        }

    }




    return (
        <div>

            <h3 className="text-2xl font-bold mb-5">Payment</h3>

            {/* Buyer & Agent Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                {/* Property Details */}
                <div className="">
                    <h3 className="text-lg font-semibold">Property Details</h3>
                    <p className='font-medium'>{myProperty.property_title}</p>
                    <p><span className="font-medium">Location:</span> {myProperty.property_location}</p>
                    <p><span className="font-medium">Price:</span> ${price}</p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold">Buyer Information</h3>
                    <p><span className="font-medium">Name:</span> {myProperty.buyer_name}</p>
                    <p><span className="font-medium">Email:</span> {myProperty.buyer_email}</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Agent Information</h3>
                    <p><span className="font-medium">Name:</span> {myProperty.agent_name}</p>
                    <p><span className="font-medium">Email:</span> {myProperty.agent_email}</p>
                </div>
            </div>



            {/* form */}
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className="text-red-600">{error}</p>
                {transactionId && <p className="text-pink-600"> Your transaction id: {transactionId}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;