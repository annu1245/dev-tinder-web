import { useEffect } from 'react';
import { useNavigate } from "react-router";
import { backendUrl } from "../utils/constants";
import axios from "axios";
import { addUser } from "../store/authSlice";
import { useSelector, useDispatch} from "react-redux";

const useGetUserProfile = (refreshFlag = false) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userAuth = useSelector((store) => store.auth);

  const fetchUser = async () => {
        if (userAuth) return;
        try {
            const res = await axios.get(`${backendUrl}/profile/view`, { withCredentials: true });
            dispatch(addUser(res.data));
        } catch (error) {
            if (error.status === 401) {
                navigate("/login");
            }
            console.log(error);
        }
    };
    
   useEffect(() => {
        fetchUser();
    }, [userAuth, refreshFlag]);
}


export { useGetUserProfile };