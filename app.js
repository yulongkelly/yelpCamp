const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");

mongoose
  .connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB database connection established successfully");
  })
  .catch((err) => {
    console.log("Error: ", err.message);
  });

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.send("Hello from Yelp Camp");
});

app.get("/makeCampground", async (req, res) => {
  const camp = new Campground({ title: "My backyard", description: "cheap" });
  await camp.save();
  res.send(camp);
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
