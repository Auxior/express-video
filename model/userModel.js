const mongoose = require("mongoose");
const baseModel = require("./baseModel");
const md5 = require("../util/md5");

const userSchema = new mongoose.Schema({
  // 用户名
  username: {
    type: String,
    required: true,
  },
  // 邮箱
  email: {
    type: String,
    required: true,
  },
  // 手机号
  phone: {
    type: String,
    required: true,
  },
  // 密码
  password: {
    type: String,
    required: true,
    set: (value) => md5(value),
    select: false,
  },
  // 头像
  avatar: {
    type: String,
    default: null,
  },
  // 频道封面
  cover: {
    type: String,
    default: null,
  },
  // 频道描述
  channelDes: {
    type: String,
    default: null,
  },
  // 粉丝数
  subscribeCount: {
    type: Number,
    default: 0,
  },
  ...baseModel,
});

module.exports = userSchema;
