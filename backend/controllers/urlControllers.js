const Url = require("../modules/urlModel");
const shortid = require("shortid");
const nanoid = require("nanoid");


// Function to generate a short URL
const generateShortUrl = () => {
    return shortid.generate();
};


// Controller to handle URL shortening
exports.shortenUrl = async (req,res) =>{
    try{
        const {originalUrl }= req.body;
        if(!originalUrl) {
            return res.status(400).json({message : "URL id required"});
        }
        const shortUrl = nanoid(6);

        const newUrl = Url({
            originalUrl : originalUrl,
            shortUrl : shortUrl
        })
        console.log(newUrl);
        newUrl.save();

        

    } catch(error){
        console.log(error);
    }
};
