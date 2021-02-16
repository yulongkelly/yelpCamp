const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampgroundScheme = new Schema({
  title: String,
  price: String,
  description: String,
  location: String,
});

module.exports = mongoose.model("Campground", CampgroundScheme);
