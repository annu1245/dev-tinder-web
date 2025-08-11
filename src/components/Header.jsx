import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { backendUrl } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../store/authSlice";

const Header = () => {
    const auth = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleLogout = async() => {
        try {
            await axios.post(backendUrl + '/auth/logout', {}, {withCredentials: true});
            console.log("Logout Successfully")
            dispatch(removeUser())
            navigate('/login');
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="navbar bg-base-300 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">👩‍💻 DevTinder🔥</a>
            </div>
            {auth && (
                <div className="flex gap-2 items-center">
                    <h1>{auth.firstName}</h1>
                    <div className="dropdown dropdown-end mr-5">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src={auth.photoUrl} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to={"/profile"} className="justify-between">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link to={"/connections"}>Connections</Link>
                            </li>
                            <li>
                                <Link to={"/requests"}>Requests</Link>
                            </li>
                            <li>
                                <Link to={"/sentrequests"}>Sent Requests</Link>
                            </li>
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
