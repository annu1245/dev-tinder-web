import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import Login from "./components/Login";
import appStore from "./store/appStore";
import { Provider } from "react-redux";
import PrivateRoutes from "./components/PrivateRoutes";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Feed from "./components/Feed";
import EditProfile from "./components/EditProfile";
import PendingConnectionRequests from "./components/PendingConnectionRequests";
import Test from "./components/Test";
import EditProfileForm from "./components/EditProfileForm";
import SentConnectionRequest from "./components/SentConnectionRequest";
import Connections from "./components/Connections";

function App() {
    return (
        <Provider store={appStore}>
            <BrowserRouter basename="/">
                <Routes>
                    <Route path='/test' element={<Test/>}/>
                    <Route path='/form' element={<EditProfileForm/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/" element={<PrivateRoutes />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<EditProfile />} />
                        <Route path='/feed' element={<Feed/>}/>
                        <Route path='/connections' element={<Connections/>}/>
                        <Route path='/requests' element={<PendingConnectionRequests/>}/>
                        <Route path='/sentrequests' element={<SentConnectionRequest/>}/>
                    </Route>
                    <Route path="*" element={<div>Not Found</div>} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
