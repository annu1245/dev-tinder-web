import React, { useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../utils/constants";

const Profile = () => {
    const [userData, setUserData] = useState(null)
    const fetchProfile = async () => {
        try {
            const res = await axios.get(`${backendUrl}/profile/view`, { withCredentials: true });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div className="flex justify-center">
            <div className="card bg-base-100 w-80 shadow-sm mt-5">
                <figure className="h-70">
                    <img className="w-full" src="https://thumbs.dreamstime.com/b/beauty-profile-portrait-young-woman-wreath-flowers-her-hair-harmony-concept-beauty-profile-portrait-young-woman-144422034.jpg" alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Card Title</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
