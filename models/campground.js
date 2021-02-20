const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
const opts = { toJSON: { virtuals: true } };

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const CampgroundSchema = new Schema(
  {
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        require: true,
      },
      coordinates: {
        type: [Number],
        require: true,
      },
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  opts
);

CampgroundSchema.virtual("properties.popUpMarkup").get(function () {
  return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
  <p>${this.description}</p>`;
});

CampgroundSchema.post("findOneAndDelete", async (campground) => {
  if (campground.reviews.length > 0) {
    await Review.remove({ _id: { $in: campground.reviews } });
  }
});
module.exports = mongoose.model("Campground", CampgroundSchema);
