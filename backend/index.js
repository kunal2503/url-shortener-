const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const urlRoutes = require("./routes/urlRoutes");

const app = express();

async function connect() {
  await mongoose.connect("mongodb://localhost:27017/UrlShortner");
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes 
app.use("/api",urlRoutes);

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
