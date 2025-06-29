const express = require('express');
const router = express.Router();
const {shortenUrl} = require("../controllers/urlControllers")


router.post("/shorten",shortenUrl);

module.exports = router;