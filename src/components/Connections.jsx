import React, { useEffect } from "react";
import { backendUrl } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/connectionsSlice";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections.userConnections);

    const fetchConnections = async () => {
        if (connections) return;
        try {
            const res = await axios.get(backendUrl + "/user/connections", { withCredentials: true });
            dispatch(addConnections(res.data.data));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    return (
        connections && (
            <>
                <div className="my-10 gap-5 flex flex-col items-center">
                    {connections.map((connection) => (
                        <ConnectionCard key={connection._id} request={connection.userDetails} isSentRequest={false}/>
                    ))}
                </div>
            </>
        )
    );
};

export default Connections;
