import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/authSlice";
import { backendUrl } from "../utils/constants";
import validator from 'validator';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        const {email, password} = data;
        await axios.post(`${backendUrl}auth/login`, {email, password}, {withCredentials: true})
        .then(res => dispatch(addUser(res.data.data)))
        .catch(err => setError(err?.response?.data?.message))
    };
    return (
        <div className="flex justify-center mt-[5%]">
            <div className="card card-dash bg-base-300 w-96">
                <div className="card-body">
                    <h2 className="card-title m-auto text-2xl mb-2 text-pink-700">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="text-lg">Email: </label>
                            <input type="email" className="input input-bordered w-full my-2" {...register("email", {
                                required: "Email is required",
                                validate: (value) => validator.isEmail(value) || "Invalid Email address"
                            })} />
                            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                        </div>
                        <div className="mt-2">
                            <label className="text-lg">Password: </label>
                            <input type="password" className="input input-bordered w-full my-2" {...register("password", {
                                required: "Password is required",
                                validate: (value) => validator.isStrongPassword(value) || "Invalid Password"
                            })} />
                            {
                                errors.password && <span className="text-red-500">{errors.password.message}</span>
                            }
                        </div>
                        {error && <span className="text-red-500">{error}</span>}
                        <div className="card-actions justify-center my-4">
                            <input className="btn btn-secondary w-full hover:bg-base-300 text-lg" type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
