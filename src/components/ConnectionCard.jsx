import React from "react";
import { backendUrl } from '../utils/constants';
import axios from "axios";
import { useDispatch } from "react-redux";
import { filterRequestReceived } from "../store/connectionsSlice";

const ConnectionCard = ({ request, isSentRequest = true, requestId }) => {
    const user = request;
    if (!request) return;
    const dispatch = useDispatch();

    const handleAccept = async(status) => {
        console.log("status: ", status, requestId)
        try {
            const res = await axios.post(`${backendUrl}/request/review/${status}/${requestId}`, {}, { withCredentials: true })
            console.log("res:", res)
            dispatch(filterRequestReceived(requestId))
        } catch (error) {
            console.log(error)
        }
    }

    const handleReject = async(status) => {
        console.log("status: ", status, requestId)
        try {
            const res = await axios.post(`${backendUrl}/request/review/${status}/${requestId}`, {}, {withCredentials: true })
            dispatch(filterRequestReceived(requestId))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="card card-dash bg-base-300 w-96">
            <div className="card-body">
                <div className="flex justify-between">
                    <div className="flex items-center gap-5">
                        <div className="w-10 h-10 rounded">
                            <img className="w-full object-cover" alt="profile" src={user.photoUrl}></img>
                        </div>
                        <div>
                            <h2 className="card-title">{user.firstName}</h2>
                            <span>{user.age}</span>
                            <span>{user.age ? ", " + user.gender : user.gender}</span>
                        </div>
                    </div>
                    {isSentRequest && (
                        <div className="card-actions justify-end">
                            <button className="btn btn-secondary" onClick={() => handleAccept("accepted")}>Accept</button>
                            <button className="btn btn-neutral" onClick={() => handleReject("rejected")}>Reject</button>
                        </div>
                    )}
                </div>
                {
                    !isSentRequest ? <p className="ml-15">{user.about}</p> : <p>{user.about}</p>
                }
            </div>
        </div>
    );
};

export default ConnectionCard;
