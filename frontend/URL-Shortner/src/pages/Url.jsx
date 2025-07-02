import React from "react";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import Toast from "../components/Toast"; // Adjust the path as necessary

const Url = () => {
  const [inputUrl, setInputUrl] = useState({
    originalUrl: "",
  });
  const [shortUrl,setShortUrl] = useState("") 
  const [originalUrl, setOriginalUrl] = useState("");
  const [toast, setToast] = useState({message: "",type: ""});



  const handleInputChange = (event) =>{
    setInputUrl({...inputUrl, [event.target.name]: event.target.value});
  }


  const handleSubmit = async(event) =>{
    event.preventDefault();

    if(inputUrl.originalUrl.trim() === ""){
      setToast({message: "Please enter a valid URL", type: "error"});
      return;
    }

    try{
      const response = await axios.post("http://localhost:3000/api/shorten",inputUrl);

      setShortUrl(response.data.shortUrl);
      setInputUrl({ originalUrl: "" });
      setToast({message:response.data.message || "Url created", type: "success"});

    } catch(error){
      setToast({message:error.response.data.message || "Internal server error" , type: "error"});
    }
  }

  const handleToastClose = () => {
    setToast({message: "", type: ""});
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
        
        setOriginalUrl(response.data.url);
        window.location.href = response.data.url; // Redirect to the original URL
        setToast({message:response?.data?.message || "Redirecting...", type: "success"});
    } catch(error) {
      setToast({message: error.response?.data?.message || "Failed to redirect", type: "error"});
    }
}

  const handleCopy = () => {
    try{
      navigator.clipboard.writeText(shortUrl);
      setToast({message:"URL Copied !", type: "success"});
    } catch(error) {
      setToast({message:error?.response?.data.message||"Failed to copy:", type: "error"});
    }
  }
  return (
   <div className="bg-gray-950  flex items-center mt-10 flex-col gap-8 text-white min-h-screen px-4">
  {/* Header */}
  {toast.message && <Toast type={toast.type} message={toast.message} onClose={handleToastClose} />}


  <div className="text-center space-y-3">
    <h1 className="text-indigo-400 font-extrabold text-5xl tracking-wide">ShortLink</h1>
    <p className="font-semibold text-xl text-gray-300">Shorten your links in one click</p>
  </div>

  {/* Input Section */}
  <div className="flex flex-row sm:flex-row items-center gap-3 w-full max-w-md">
    <input
      type="text"
      name="originalUrl"
      value={inputUrl.originalUrl}
      onChange={handleInputChange}
      placeholder="Paste your URL here..."
      className="bg-gray-800 text-white placeholder-gray-400 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
    />
    <button
      onClick={handleSubmit}
      className="bg-indigo-600 hover:bg-indigo-700 transition px-5 py-3 rounded-lg text-white font-semibold flex items-center gap-2"
    >
      Shorten <FaArrowRight />
    </button>
  </div>

  {/* Short URL Display */}
  {shortUrl && (
    <div className="w-full max-w-md mt-6">
      <div className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 flex flex-row sm:flex-row items-center justify-between gap-3 hover:shadow-md transition">
        <a title="Open it" href={shortUrl} onClick={handelRedirectUrl}  className="text-indigo-300 break-words">{shortUrl}</a>
        
        <button
          onClick={handleCopy}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          Copy
        </button>
      </div>
    </div>
  )}
</div>

  );
};

export default Url;