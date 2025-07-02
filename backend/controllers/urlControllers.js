const Url = require("../modules/Url");
// const shortid = require("shortid");
const {nanoid} = require("nanoid");

// Function to generate a short URL
const generateShortUrl = () => {
  return shortid.generate();
};

const BASE_URL = "http://localhost:5173/";

// Controller to handle URL shortening
exports.shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;
//   console.log("Original url",originalUrl);
  if (!originalUrl) {
    return res.status(400).json({ message: "URL is required" });
  }
  try {
    // Check if the URL already exits in databse;
    const existingUrl = await Url.findOne({originalUrl : originalUrl});
    // console.log("Existing url",existingUrl);

    if(existingUrl) {
        return res.status(200).json({
            message : "URL already exists",
            shortUrl: `${BASE_URL}${existingUrl.shortUrl}`
        })
    } 

    const shortUrl = nanoid(6);
    console.log("Short url",shortUrl);
    const newUrl = new Url({
      originalUrl: originalUrl,
      shortUrl: shortUrl,
    });
    // console.log("New url",newUrl);
    await newUrl.save();

    res.status(201).json({
        message:"Url Created",
        shortUrl : `${BASE_URL}${shortUrl}`
    })

  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
};

exports.redirectUrl = async(req,res) =>{
  const {shortUrl} =  req.params;

    try{
      const url = await Url.findOne({shortUrl})
      
      if(url){
        url.click = url.click+=1;
        url.save();
        res.status(200).json({url: url.originalUrl});
      } else{
        res.json({message:"URL Not Found"});
      }
    } catch(error){
      console.log(error);
        return res.status(500).json({message : "Internal server error"});
    }
}

exports.history = async(req,res) =>{
    try{
      const data = await Url.find({});

      res.status(200).json({history: data});
    } catch(error){
      res.status(500).json({message : "Internal server error"});
    }
}

exports.trackCount = async(req,res) => {
  const url = req.originalUrl
  const convertUrl = new URLSearchParams(url.split("?")[1]);
  const searchUrl = convertUrl.get("searchUrl");
  if (!searchUrl) {
    return res.status(400).json({ message: "URL is required" });
  }

  const shortCode = searchUrl.split("/").pop();
  try {
    const urlData = await Url.findOne({ shortUrl: shortCode });
    if (!urlData) {
      return res.status(404).json({ message: "URL not found" });
    }
    res.status(200).json({ data: urlData });
  } catch (error) {
    console.error("Error fetching click count:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}