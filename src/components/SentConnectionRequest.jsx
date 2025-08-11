import React, { useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequestSend, filterRquestSend } from "../store/connectionsSlice";
import ConnectionCard from "./ConnectionCard";

const SentConnectionRequest = () => {
    const sentRequests = useSelector((store) => store.connections.requestSend);
    const dispatch = useDispatch();

    const fetchSentConnection = async () => {
        if (sentRequests.length > 0) return;
        try {
            const res = await axios.get(backendUrl + "/user/request/send", { withCredentials: true });
            dispatch(addRequestSend(res?.data?.data));
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchSentConnection();
    }, []);

    const handleCancel = async (requestId) => {
        try {
            await axios.delete(`${backendUrl}/request/${requestId}`, { withCredentials: true });
            dispatch(filterRquestSend(requestId));
        } catch (error) {
            console.log(error);
        }
    };

    return sentRequests.length > 0 ? (
        <div className="my-10 gap-5 flex flex-col items-center">
            {sentRequests.map((sentRequest) => (
                <ConnectionCard key={sentRequest._id} request={sentRequest.toUserId}>
                    <button className="btn btn-neutral" onClick={() => handleCancel(sentRequest._id)}>
                        Cancel
                    </button>
                </ConnectionCard>
            ))}
        </div>
    ) : (
        // empty request
        <h1>No data found</h1>
    );
};

export default SentConnectionRequest;
