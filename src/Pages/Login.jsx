import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../providers/AuthProvider';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { toast } from "react-toastify";
import useAxiosPublic from '../hooks/useAxiosPublic';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";


const Login = () => {

    const [error, setError] = useState({});
    const axiosPublic = useAxiosPublic();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [disabled, setDisabled] = useState(true);
    const { signIn, googleSignIn, setUser, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation;

    const from = location.state?.from?.pathname || "/";


    // useEffect(() => {
    //     loadCaptchaEnginge(6);
    // }, [])

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then((result) => {
                setUser(result.user);
                navigate(from, { replace: true });
                toast.success("Login successfully!");
            })
            .catch((err) => {
                console.log("Error", err.message);
                setError({ ...error, login: err.code });
                toast.error("Login failed. Please try again");
            })
    }

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
                            title: 'Login Successfully.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/');
                    })
            })
    }

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }
        else {
            setDisabled(true)
        }
    }



    return (
        <div className='min-h-screen flex justify-center items-center mb-10'>
            <Helmet>
                <title>Login | EstateLink</title>
            </Helmet>
            <div className="card bg-green-100 w-full max-w-lg shrink-0 p-10">
                <h2 className='text-2xl text-black font-semibold text-center'>Login Your Account</h2>

                <form onSubmit={handleLogin} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Email</span>
                        </label>

                        <input
                            name='email'
                            type="email"
                            placeholder="email"
                            className="input input-bordered bg-white"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text text-black">Password</span>
                        </label>
                        <input name='password' type={showPassword ? 'text' : 'password'} placeholder="password" className="input input-bordered bg-white" required />

                        <button
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                            className='btn btn-xs absolute right-2 top-12  bg-white '>
                            {
                                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }
                        </button>

                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-neutral border-none bg-green-500 hover:bg-green-700 text-black">Login</button>
                    </div>
                </form>

                <div className="divider text-black">OR</div>

                <div className="flex flex-col items-center justify-center mb-3">
                    <p className='text-center font-semibold mb-2 text-black'>Continue with Google</p>

                    <button onClick={handleGoogleSignIn} className="text-4xl">
                        <FcGoogle />
                    </button>
                </div>

                <p className='text-center font-semibold text-black'>Don't Have An Account? <Link className='text-red-500' to={"/signup"}>Register</Link></p>


            </div>
        </div>
    );
};

export default Login;