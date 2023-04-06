const mongoose = require("mongoose");
const baseModel = require("./baseModel");

const videoSchema = new mongoose.Schema({
  // 视频标题
  title: {
    type: String,
    required: true,
  },
  // 视频描述
  description: {
    type: String,
    default: null,
  },
  // 视频 vod
  vodvideoId: {
    type: String,
    required: true,
  },
  // 视频发布者 id
  user: {
    type: mongoose.ObjectId,
    required: true,
    ref: "User",
  },
  // 视频发布者频道封面
  cover: {
    type: String,
    default: null,
  },
  // 视频评论数量
  commentCount: {
    type: Number,
    default: 0,
  },
  // 喜欢视频数量
  likeCount: {
    type: Number,
    default: 0,
  },
  // 不喜欢视频数量
  dislikeCount: {
    type: Number,
    default: 0,
  },
  ...baseModel,
});

module.exports = videoSchema;
