import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Toast from '../components/Toast';
import { FaCopy,FaExternalLinkAlt } from 'react-icons/fa';

const History = () => {
  const [toast, setToast] = useState({ message: "", type: "" });
  const [historys, setHistorys] = useState([]);
  const baseUrl = "http://localhost:5173/";

  useEffect(() => {
    getUrlData();
  }, []);

  const getUrlData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/url/history");
      setHistorys(response.data.history);
      setToast({ message: "URL History extracted", type: "success" });
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Internal server error",
        type: "error"
      });
    }
  };

  const handleClose = () => {
  setToast({ message: "", type: "" });
  };

  const handelRedirectUrl = async(event) => {
      event.preventDefault();
      const url = event.currentTarget.getAttribute("href");
      if (!url) {
        setToast({message: "Invalid URL", type: "error"});
        return;
      }
      const shortUrl = url.split("/").pop();
  
      try{
          const response = await  axios.get(`http://localhost:3000/api/${shortUrl}`);
          
          window.location.href = response.data.url; // Redirect to the original URL
          setToast({message:response?.data?.message || "Redirecting...", type: "success"});
      } catch(error) {
        setToast({message: error.response?.data?.message || "Failed to redirect", type: "error"});
      }
  }

  const handelCopy = (shortUrl) => {
    try{
      navigator.clipboard.writeText(`${baseUrl}${shortUrl}`)
    setToast({message:"URL Copied !", type: "success"});
    } catch(error) {
      setToast({message:error?.response?.data.message||"Failed to copy:", type: "error"});
    }
  }

  return (
  <>
    <div className='bg-gray-950 text-white min-h-screen p-4 flex flex-col items-center'>
      {toast.message && <Toast message={toast.message} type={toast.type} onClose={handleClose}/>}
      <h1 className='text-center text-2xl text-indigo-600 font-bold mb-4'>History</h1>
     
      {historys.length > 0 ? (
        historys.map((history,index) => (
          <div className='bg-gray-900 shadow   w-1/2 shadow-gray-700 transform duration-500 hover:scale-105 p-3  my-2 rounded flex flex-row justify-between items-center' key={index}>
            <div className='flex flex-col gap-2 overflow-hidden'>
            <p className='line-clamp-1 '>Created: {new Date(history.createdAt).toLocaleString()}</p>
            <p className="line-clamp-1" >Original: {history.originalUrl} </p>
            <div className='flex flex-row items-center gap-2'>
            <a href={history.shortUrl} onClick={handelRedirectUrl} className="line-clamp-1 text-green-400 hover:text-green-500 flex flex-row items-center gap-2" >ShortUrl: {`${baseUrl}${history.shortUrl}`}<FaExternalLinkAlt size={14}/></a>
            <button title='Copy URl' className='text-indigo-500 hover:text-indigo-300' onClick={() => handelCopy(history.shortUrl)} ><FaCopy /></button>
            </div>
            </div>
          </div>
        ))
    ) : (
        <p className='text-center text-gray-400'>No history available yet.</p>
      )}
      
    </div>
        </>
  );
};

export default History;
