import axios from "axios";
import React, { useEffect } from "react";
import { backendUrl } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
    const userFeed = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    const getFeed = async () => {
        if (userFeed) return;
        try {
            const res = await axios.get(backendUrl + "/user/feed", { withCredentials: true });
            console.log(res.data);
            dispatch(addFeed(res.data));
        } catch (error) {
            console.log("feed error: ", error);
        }
    };

    useEffect(() => {
        getFeed();
    }, []);

    return userFeed && (
        <div className="flex justify-center">
            <UserCard user={userFeed[0]} />
        </div>
    );
};

export default Feed;
