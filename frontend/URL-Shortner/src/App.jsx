import React from "react";
import {BrowserRouter ,  Route, Routes} from "react-router-dom"
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
    return(
       <BrowserRouter>
       {/* <AuthProvider> */}
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          {/* <ProtectedRoute> */}
          <Route path="/*" element={<MainLayout/>} />
          {/* </ProtectedRoute> */}
        </Routes>
       {/* </AuthProvider> */}
       </BrowserRouter>
    );
};

export default App;