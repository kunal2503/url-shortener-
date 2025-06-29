const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortUrl : {
        type: String,
        required  : true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
} );

const UrlModel = mongoose.model("Url", urlSchema);

module.exports = UrlModel;
