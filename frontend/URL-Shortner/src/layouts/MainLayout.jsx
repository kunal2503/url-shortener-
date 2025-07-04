import React from "react";
import {Route,Routes} from "react-router-dom"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Url from "../pages/Url";
import History from "../pages/History";
import TrackCount from "../pages/TrackCount";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";

const MainLayout = () => {
    return (
         <div className="flex flex-col min-h-screen justify-between bg-gray-950">
            <Navbar/>
            
            <main className="">

            <Routes>
                {/* <AuthProvider> */}
                {/* <ProtectedRoute> */}

                <Route path="/" element={<Url/>}/>
                <Route path="/:shorturl" element={<Url/>}/>
                <Route path="/url/history" element={<History/>}/>
                <Route path="/track/count" element={<TrackCount/>}/>
                {/* </ProtectedRoute> */}
                
                {/* </AuthProvider> */}
            </Routes>
            
            </main>
            <Footer/>
        </div>
    );
}
export default MainLayout;