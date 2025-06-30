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
    const shortUrl =  req.params;
    try{
        console.log(shortUrl);
    } catch(error){
        return res.status(500).json({message : "Internal server error"});
    }
}
