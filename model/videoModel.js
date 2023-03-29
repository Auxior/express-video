const mongoose = require("mongoose");
const baseModel = require("./baseModel");

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  vodvideoId: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.ObjectId,
    required: true,
    ref: "User",
  },
  cover: {
    type: String,
    required: false,
  },
  ...baseModel,
});

module.exports = videoSchema;
