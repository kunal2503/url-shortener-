import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios';
import Toast from '../components/Toast'; // Adjust the path as necessary

const TrackCount = () => {
const [input, setInput] = useState({
    searchUrl: "",
  });
  const [toast, setToast] = useState({ message: "", type: "" });
  const [data, setData] = useState(null);

  const handleInputChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };
  const baseUrl = "http://localhost:5173/";


  const handleSerch = async () => {
    // event.preventDefault();
    if (input.searchUrl.trim() === "") {
      setToast({ message: "Please enter a valid URL", type: "error" });
      return;
    }
    try{
      const response = await axios.get("http://localhost:3000/api/track/count", {
        params: { searchUrl: input.searchUrl }
      });
      setData(response.data.data);
      setToast({ message: "Information Extracted", type: "success" });
    } catch (error) {
      setToast({ message: error.response?.data?.message || "Internal server error", type: "error" });
    }
  }
    
  const handleToastClose = () => {
    setToast({ message: "", type: "" });
  }
  
  return (
    <>
    <div className='bg-gray-950 flex flex-col items-center  min-h-screen '>
      {toast.message && <Toast type={toast.type} message={toast.message} onClose={handleToastClose} />}
      <h1 className='text-indigo-400 font-bold text-3xl text-center mt-6'>Track URL Click Count</h1>
      <div className='flex flex-row m-5 gap-4  items-center justify-center'>
      <input type="text" name='searchUrl' value={input.searchUrl} onChange={handleInputChange} className='bg-gray-900 focus:outline-none border w-full text-white border-gray-600 rounded-sm px-6 py-2'/>
      <button onClick={handleSerch} className='bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-sm'><FaSearch/></button>
      </div>
      {data && (
        <div className='mt-10 w-full max-w-xl  bg-gray-900 shadow-lg p-6  rounded-xl text-white '>
          <span className=''>Created: </span>
          <p className='line-clamp-1 text-sm'>{new Date(data.createdAt).toLocaleString()}</p>
          <span className=''>ShortUrl: </span>
          <p className='line-clamp-1 text-sm'>{`${baseUrl}${data.shortUrl}`}</p>
        <span className=''>Original:</span>
        <p className='line-clamp-1 text-sm'> {data.originalUrl}</p>
        <span className=''>Click Count:</span>
        <p className='text-green-500 font-bold text-2xl'>{data.click || 0} </p>
        {/* <p>ShortUrl: {`${baseUrl}${data.shortUrl}`}</p> */}
      </div>
)}
     
    </div>
    </>
    
  )
}

export default TrackCount