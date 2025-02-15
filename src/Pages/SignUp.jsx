import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import useAxiosPublic from '../hooks/useAxiosPublic';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../providers/AuthProvider';

const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false);
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, googleSignIn, user } = useContext(AuthContext);
    const navigate = useNavigate();


    // const uid = user?.uid;
    // console.log("user er uid signup er time e", uid);

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    role: "User",
                    uid: result.user?.uid,
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        Swal.fire({
                            position: 'top',
                            icon: 'success',
                            title: 'User created successfully.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/');
                    })
            })
    }

    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                const uid = result.user?.uid;
                console.log("jokhon user create holo",loggedUser);
                console.log("user create uid",uid);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        console.log("jokhon create hoye update holo",data);
                        //create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            role: "User",
                            uid: uid,
                        }

                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database.');
                                    reset();
                                    Swal.fire({
                                        position: 'top',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })

                        console.log('user profile info updated')

                    })
                    .catch(error => console.log(error))
            })
    };



    return (
        <div className='min-h-screen flex justify-center items-center mb-10'>
            <Helmet>
                <title>Sign Up | EstateLink</title>
            </Helmet>
            <div className="card bg-green-100 w-full max-w-lg shrink-0 p-10">
                <h2 className='text-2xl font-semibold text-center text-black'>Register Your Account</h2>


                <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Name</span>
                        </label>
                        <input {...register("name", { required: true })} name='name' type="text" placeholder="name" className="input input-bordered bg-white" required />
                        {errors.name && <span className="text-red-600">Name is required</span>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                        {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Email</span>
                        </label>
                        <input {...register("email", { required: true })} name='email' type="email" placeholder="email" className="input input-bordered bg-white" required />
                        {errors.email && <span className="text-red-600">Email is required</span>}
                    </div>

                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text text-black">Password</span>
                        </label>
                        <input type={showPassword ? 'text' : 'password'}
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                            })}
                            name='password' placeholder="password" className="input input-bordered bg-white" required />
                        {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                        {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                        {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}

                        <button
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                            className='btn btn-xs absolute right-2 top-12'>
                            {
                                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }
                        </button>
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-neutral border-none bg-green-500 hover:bg-green-700 text-black">Register</button>
                    </div>
                </form>

                <div className="divider text-black">OR</div>

                <div className="flex flex-col items-center justify-center mb-3">
                    <p className='text-center font-semibold mb-2 text-black'>Continue with Google</p>

                    <button onClick={handleGoogleSignIn} className="text-4xl">
                        <FcGoogle />
                    </button>
                </div>


                <p className='text-center font-semibold text-black'>Already Have An Account? <Link className='text-red-500' to={"/login"}>Login</Link></p>

            </div>
        </div>
    );
};

export default SignUp;