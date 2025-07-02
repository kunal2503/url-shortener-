const express = require('express');
const router = express.Router();
const {shortenUrl,redirectUrl, history, trackCount} = require("../controllers/urlControllers")


router.post("/shorten",shortenUrl);
router.get("/:shortUrl",redirectUrl);
router.get("/url/history",history);
router.get("/track/count", trackCount)
module.exports = router;