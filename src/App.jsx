import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import Login from "./components/Login";
import appStore from "./store/appStore";
import { Provider } from "react-redux";
import PrivateRoutes from "./components/PrivateRoutes";
import Profile from "./components/Profile";
import Register from "./components/Register";

function App() {
    return (
        <Provider store={appStore}>
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/" element={<PrivateRoutes />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route path="*" element={<div>Not Found</div>} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
