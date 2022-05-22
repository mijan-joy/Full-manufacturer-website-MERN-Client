import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    useSignInWithGoogle,
    useCreateUserWithEmailAndPassword,
    useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";
import { toast } from "react-toastify";

const Login = () => {
    const [toggler, setToggler] = useState("login");
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    //
    const [signInWithGoogle, googleUser, googleLoading, GoogleError] =
        useSignInWithGoogle(auth);

    //
    const [
        createUserWithEmailAndPassword,
        registerUser,
        registerLoading,
        registerError,
    ] = useCreateUserWithEmailAndPassword(auth);

    //
    const [signInWithEmailAndPassword, logInUser, logInLoading, logInError] =
        useSignInWithEmailAndPassword(auth);

    //
    const handleGoogleSignIn = () => {
        console.log("google sing in button clicked");
        signInWithGoogle();
    };

    //
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    //
    const onLogInSubmit = (data) => {
        signInWithEmailAndPassword(data.email, data.password);
    };

    //
    const onRegisterSubmit = (data) => {
        createUserWithEmailAndPassword(data.email, data.password);
    };

    useEffect(() => {
        if (googleUser || logInUser || registerUser) {
            navigate(from, { replace: true });
            toast.success("Signed In Successfully.");
        }
    }, [from, navigate, logInUser, registerUser, googleUser]);
    return (
        <div className="container mx-auto">
            <div className="max-w-[500px] mx-auto py-10 px-2">
                <div className="p-5 bg-white rounded-md border border-gray-700 ">
                    {toggler === "login" && (
                        <form onSubmit={handleSubmit(onLogInSubmit)}>
                            <div className="mb-5">
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-secondary"
                                >
                                    Email:
                                </label>
                                <input
                                    className="focus:outline-none focus:ring focus:ring-primary border text-sm rounded-md block w-full p-2.5  placeholder-secondary/75 text-black  border-secondary"
                                    type="email"
                                    placeholder="Enter email"
                                    autoComplete="off"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && (
                                    <span className="text-rose-600">
                                        Please enter your email
                                    </span>
                                )}
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-secondary"
                                >
                                    Password:
                                </label>
                                <input
                                    className="focus:outline-none focus:ring focus:ring-primary border text-sm rounded-md   block w-full p-2.5  placeholder-secondary/75  text-black  border-secondary"
                                    type="password"
                                    placeholder="password"
                                    {...register("password", {
                                        required: true,
                                    })}
                                />
                                {errors.password && (
                                    <span className="text-rose-600">
                                        Please enter your password
                                    </span>
                                )}
                            </div>
                            {/* <p className="text-rose-600 py-1">
                {error?.message.split("auth/")[1].split(")")[0]}
            </p> */}

                            <input
                                className="w-full bg-primary hover:bg-secondary hover:text-primary px-5 py-2 rounded-md text-secondary transition-all"
                                type="submit"
                                value="Log In"
                            />

                            <div className="mt-5">
                                <p>
                                    Not registered?{" "}
                                    <button
                                        className="underline text-emerald-400"
                                        onClick={() => {
                                            setToggler("register");
                                        }}
                                    >
                                        Click here to register...
                                    </button>{" "}
                                </p>
                            </div>
                            <div className="mt-5">
                                <p>
                                    Forgot Password?{" "}
                                    <Link
                                        className="underline text-emerald-400"
                                        to="/resetpassword"
                                    >
                                        Reset Now...
                                    </Link>{" "}
                                </p>
                            </div>
                        </form>
                    )}

                    {toggler === "register" && (
                        <form onSubmit={handleSubmit(onRegisterSubmit)}>
                            <div className="mb-5">
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-secondary"
                                >
                                    Your Name:
                                </label>
                                <input
                                    className="focus:outline-none focus:ring focus:ring-primary border text-sm rounded-md block w-full p-2.5  placeholder-secondary/75 text-black  border-secondary"
                                    type="text"
                                    placeholder="name"
                                    {...register("name", {
                                        minLength: 3,
                                        required: true,
                                    })}
                                />
                                {errors.name && (
                                    <span className="text-rose-600">
                                        Minimum 3 letters
                                    </span>
                                )}
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-secondary"
                                >
                                    Email:
                                </label>
                                <input
                                    className="focus:outline-none focus:ring focus:ring-primary border text-sm rounded-md block w-full p-2.5  placeholder-secondary/75 text-black  border-secondary"
                                    type="email"
                                    placeholder="Enter email"
                                    autoComplete="off"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && (
                                    <span className="text-rose-600">
                                        Please enter your email
                                    </span>
                                )}
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-secondary"
                                >
                                    Password:
                                </label>
                                <input
                                    className="focus:outline-none focus:ring focus:ring-primary border text-sm rounded-md   block w-full p-2.5  placeholder-secondary/75  text-black  border-secondary"
                                    type="password"
                                    placeholder="password"
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                    })}
                                />
                                {errors.password?.type === "required" && (
                                    <span className="text-rose-600">
                                        Please enter your password
                                    </span>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <span className="text-rose-600">
                                        At least 6 character.
                                    </span>
                                )}
                            </div>
                            {/* <p className="text-rose-600 py-1">
                {error?.message.split("auth/")[1].split(")")[0]}
            </p> */}

                            <input
                                className="w-full bg-primary hover:bg-secondary hover:text-primary px-5 py-2 rounded-md text-secondary transition-all"
                                type="submit"
                                value="Register"
                            />

                            <div className="mt-5">
                                <p>
                                    Already registered?{" "}
                                    <button
                                        className="underline text-emerald-400"
                                        onClick={() => {
                                            setToggler("login");
                                        }}
                                    >
                                        Click here to login...
                                    </button>{" "}
                                </p>
                            </div>
                            <div className="mt-5">
                                <p>
                                    Forgot Password?{" "}
                                    <Link
                                        className="underline text-emerald-400"
                                        to="/resetpassword"
                                    >
                                        Reset Now...
                                    </Link>{" "}
                                </p>
                            </div>
                        </form>
                    )}

                    <div class="divider py-3">OR</div>
                    <div className="flex justify-center">
                        <button
                            onClick={handleGoogleSignIn}
                            type="button"
                            class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                        >
                            {googleLoading ? (
                                <span className="w-10">
                                    <Loading></Loading>
                                </span>
                            ) : (
                                <svg
                                    class="w-4 h-4 mr-2 -ml-1"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fab"
                                    data-icon="google"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 488 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                                    ></path>
                                </svg>
                            )}
                            Sign in with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
