import React, { useState } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import axios from "axios";
import { backendUrl } from "../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const handleRegister = async (data) => {
        const { firstName, lastName, email, password } = data;
        try {
            const res = await axios.post(`${backendUrl}/auth/signup`, { firstName, lastName, email, password }, { withCredentials: true });
            navigate('/login')
        } catch (error) {
            if (error.status === 409) {
                toast.error("User already exist, Please login");
            }
            console.log(error);
            setErrorMessage(error?.response?.data);
        }
    };

    return (
        <div className="flex justify-center mt-10">
            <ToastContainer />
            <div className="card card-dash bg-base-300 w-96">
                <div className="card-body">
                    <h2 className="card-title m-auto text-2xl text-pink-700">Register</h2>
                    <form onSubmit={handleSubmit(handleRegister)}>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-sm">First Name</legend>
                            <input
                                type="text"
                                className="input w-full"
                                placeholder="First Name"
                                {...register("firstName", {
                                    required: "firstname is required",
                                    validate: (value) => value.length >= 2 || "firstname is too sort",
                                })}
                            />
                            {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-sm">Last Name</legend>
                            <input
                                type="text"
                                className="input w-full"
                                placeholder="Last Name"
                                {...register("lastName", {
                                    required: "lastname is required",
                                    validate: (value) => value.length >= 2 || "lastname is too sort",
                                })}
                            />
                            {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-sm">Email</legend>
                            <input
                                type="email"
                                className="input w-full"
                                placeholder="Email"
                                {...register("email", {
                                    required: "Email Id is required",
                                    validate: (value) => validator.isEmail(value) || "Invalid email address",
                                })}
                            />
                            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-sm">Password</legend>
                            <input
                                type="text"
                                className="input w-full"
                                placeholder="Password"
                                {...register("password", {
                                    required: "Password is required",
                                    validate: (value) => validator.isStrongPassword(value) || "Password is weak",
                                })}
                            />
                            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                        </fieldset>
                        <div className="mt-2">
                        {errorMessage && <span className="text-red-500 font-bold">{errorMessage}</span>}
                        </div>
                        <div className="card-actions justify-center mt-5">
                            <button className="btn btn-secondary w-full hover:bg-base-300">Register</button>
                        </div>
                    </form>
                    <Link to="/login"><h1 className="text-pink-700 cursor-pointer font-bold">Already Exist? Please Login!!</h1></Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
