import React, { useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequestReceived, filterRequestReceived } from "../store/connectionsSlice";
import ConnectionCard from "./ConnectionCard";

const PendingConnectionRequests = () => {
    const requests = useSelector((store) => store.connections.requestRecevied);
    const dispatch = useDispatch();

    const fetchPendingRequests = async () => {
        if (requests.length > 0) return;
        try {
            const res = await axios.get(backendUrl + "/user/request/received", { withCredentials: true });
            console.log(res.data.data);
            dispatch(addRequestReceived(res?.data?.data));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPendingRequests();
    }, []);

    const handleAction = async (status, requestId) => {
        try {
            const res = await axios.post(`${backendUrl}/request/review/${status}/${requestId}`, {}, { withCredentials: true });
            dispatch(filterRequestReceived(requestId));
        } catch (error) {
            console.log(error);
        }
    };

    return requests.length > 0 ? (
        <div className="my-10 gap-5 flex flex-col items-center">
            {requests.map((request) => (
                <ConnectionCard key={request._id} request={request.fromUserId}>
                    <div className="card-actions justify-end">
                        <button className="btn btn-secondary" onClick={() => handleAction("accepted", request._id)}>
                            Accept
                        </button>
                        <button className="btn btn-neutral" onClick={() => handleAction("rejected", request._id)}>
                            Reject
                        </button>
                    </div>
                </ConnectionCard>
            ))}
        </div>
    ) : (
        <h1>No request found</h1>
    );
};

export default PendingConnectionRequests;
