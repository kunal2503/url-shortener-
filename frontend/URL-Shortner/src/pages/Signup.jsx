import React from "react";
import { useState } from "react";
import Toast from "../components/Toast";
import axios from "axios";
import { useNavigate } from "react-router-dom"


const Signup = () => {
    const [user,setUser] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [toast,setToast] = useState({
        message: "",
        type: ""
    });

    const navigate = useNavigate();

    const handleChanges = (event) =>{
        event.preventDefault();

        setUser({...user, [event.target.name] : event.target.value});
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const {username,email,password} = user;
        if(!username.trim() || !email.trim() || !password.trim()){
            setToast({
                message: "All fields are required",
                type: "error"
            });
            return;
        }
        try{
            const response = await axios.post("http://localhost:3000/auth/signup", user);
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("user",JSON.stringify(response.data.user))
            setToast({
                message:response?.data?.message || "New User account created",
                type: "success"
            });
            navigate("/")

        } catch(error){
            // console.log(error)
            setToast({message : error.response?.data?.message || "Internal server error", type: "error"});
        }

    }

    const toastClose = () => {
        setToast({
            message: "",
            type: ""
        });
    }
    return(
        <div className='flex justify-around items-center h-screen bg-gray-950'>
            {toast.message && <Toast message={toast.message} type={toast.type} setToast={setToast} onClose={toastClose} />}
        <div className='flex  flex-col  bg-gray-900 px-8 py-6 rounded-lg shadow-lg text-center w-96 h-96'>
        <h1 className='text-3xl font-bold text-white '>Signup</h1>
        <form className='mt-10'onSubmit={handleSubmit}> 
            <input type="text" onChange={handleChanges} value={user.username} name="username" placeholder='Enter Username' className='w-full px-4 py-2 mb-4 bg-gray-800 text-white rounded-md focus:outline-none border border-gray-500  focus:border-indigo-600' />
            <input type="email" onChange={handleChanges} value={user.email} name="email" placeholder='Enter a Email' className='w-full px-4 py-2 mb-4 bg-gray-800 text-white rounded-md focus:outline-none border border-gray-500  focus:border-indigo-600' />
            <input type="password" onChange={handleChanges} value={user.password} name="password" placeholder='Enter a Password' className='w-full px-4 py-2 mb-4 bg-gray-800 text-white rounded-md focus:outline-none border border-gray-500  focus:border-indigo-600' />
            <button type='submit'  className='w-full bg-indigo-500 mt-4 hover:bg-indigo-600 text-white px-4 py-2 rounded-md'>Signup</button>
            <p className="text-gray-400 mt-4 ">already have an account. <a href="/login " className="text-indigo-500 hover:underline">Login</a></p>
        </form>
        </div>
    </div>
    );
}

export default Signup;