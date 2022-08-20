const mongoose = require("mongoose");

const xploreSchema = mongoose.Schema({
  title: String,
  description: String,
  location: String,
  creator: String,
  owner: String,
  tags: [String],
  imageUrl: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
});

const XPlore = mongoose.model("xplore", xploreSchema);

module.exports = XPlore;
