const mongoose = require("mongoose");
const baseModel = require("./baseModel");

const videocommentSchema = new mongoose.Schema({
  // 评论内容
  content: {
    type: String,
    required: true,
  },
  // 视频 id
  video: {
    type: mongoose.ObjectId,
    required: true,
    ref: "Video",
  },
  // 用户 id
  user: {
    type: mongoose.ObjectId,
    required: true,
    ref: "User",
  },
  ...baseModel,
});

module.exports = videocommentSchema;
