const express = require('express');
const router = express.Router();
const {shortenUrl,redirectUrl} = require("../controllers/urlControllers")


router.post("/shorten",shortenUrl);
router.post("/:shortUrl",redirectUrl);

module.exports = router;