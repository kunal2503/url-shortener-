require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const urlRoutes = require("./routes/urlRoutes");
const authRoutes = require("./routes/authRoutes");


const app = express();

async function connect() {
  await mongoose.connect("mongodb://localhost:27017/UrlShortner");
}

app.use(cors({
  origin: "http://localhost:5173", // Adjust this to your frontend URL
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes 
app.use("/api",urlRoutes);
app.use("/auth",authRoutes);

connect()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MOngoDB:", error);
  });

app.get("/", (req, res) => {
  res.send("Welcome to URL Shortener API");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
