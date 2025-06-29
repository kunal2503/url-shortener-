import React from "react";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";

const App = () => {
  const [inputUrl, setInputUrl] = useState({
    originalUrl: "",
  });

  const handleInputChange = (event) =>{
    setInputUrl({...inputUrl, [event.target.name]: event.target.value});
  }


  const handleSubmit = async(event) =>{
    event.preventDefault();
    console.log(inputUrl.originalUrl);

    if(inputUrl.originalUrl.trim() === ""){
      alert("Please enter a valid URL");
      return;
    }

    // Send the URL to the backend for shortening
    const response = await axios.post("http://localhost:3000/api/shorten",inputUrl);

    console.log(response.data);
    if(response.data.success){
      alert(`Shortened URL: ${response.data.shortUrl}`);
    } else {
      alert("Error shortening the URL");
    }

    setInputUrl({ originalUrl: "" });
  }


  

  return (
    <div className="bg-gray-900 flex items-center justify-center text-white min-h-screen">
      <div className="text-center flex flex-col items-center justify-center space-y-4 ">

        <div>
          <h1 className="text-indigo-400 font-bold text-4xl">ShortLink</h1>
          <p className="font-bold text-2xl">Short Your Links Easily</p>
        </div>

        <div className="flex items-center justify-center space-x-2 ">
          <input type="text" name="originalUrl" value={inputUrl.originalUrl} onChange={handleInputChange} className="bg-gray-800 rounded-sm focus:outline-none px-4 py-2 pr-12 border border-gray-500 focus:border-gray-600 " />
          <button className="px-5 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-300"  onClick={handleSubmit} ><FaArrowRight/></button>
        </div>
      </div>
    </div>
  );
};

export default App;
