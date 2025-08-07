import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router";
import Header from "./Header";
import Home from "./Home";
import axios from "axios";
import { backendUrl } from "../utils/constants";
import { addUser } from "../store/authSlice";
import { useGetUserProfile } from "../hook/useGetUserProfile";

const PrivateRoutes = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useGetUserProfile();

    // const fetchUser = async () => {
    //     if (userAuth) return;
    //     try {
    //         const res = await axios.get(`${backendUrl}/profile/view`, { withCredentials: true });
    //         dispatch(addUser(res.data));
    //     } catch (error) {
    //         if (error.status === 401) {
    //             navigate("/login");
    //         }
    //         console.log(error);
    //     }
    // };

   

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default PrivateRoutes;
