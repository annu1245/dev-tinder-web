import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import Login from "./components/Login";
import Layout from "./components/Layout";
import appStore from "./store/appStore";
import { Provider } from "react-redux";

function App() {
    return (
        <Provider store={appStore}>
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                    </Route>
                    <Route path="*" element={<div>Not Found</div>} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
