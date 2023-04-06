const mongoose = require("mongoose");
const baseModel = require("./baseModel");

const videolikeSchema = new mongoose.Schema({
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
  // 喜欢 1 | 不喜欢 -1
  like: {
    type: Number,
    enum: [1, -1],
    required: true,
  },
  ...baseModel,
});

module.exports = videolikeSchema;
