import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import Login from "./components/Login";
import Layout from './components/Layout'

function App() {
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route path="*" element={<div>Not Found</div>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
