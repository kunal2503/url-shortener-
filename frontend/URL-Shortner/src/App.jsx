import React from "react";
import {BrowserRouter ,  Route, Routes} from "react-router-dom"
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
    return(
       <BrowserRouter>
        <Routes>
          <Route path="/*" element={<MainLayout/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
       </BrowserRouter>
    );
};

export default App;