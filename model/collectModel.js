const mongoose = require("mongoose");
const baseModel = require("./baseModel");

const collectSchema = new mongoose.Schema({
  // 用户 id
  user: {
    type: mongoose.ObjectId,
    required: true,
    ref: "User",
  },
  // 视频 id
  video: {
    type: mongoose.ObjectId,
    required: true,
    ref: "Video",
  },
  ...baseModel,
});

module.exports = collectSchema;
