const fs = require("fs");
const { User, Subscribe } = require("../model/index");
const loadsh = require("loadsh");
const { createToken } = require("../util/jwt");
const { promisify } = require("util");
const rename = promisify(fs.rename);

// 用户注册
exports.register = async (req, res) => {
  const userModel = new User(req.body);
  await userModel.save();
  res.status(201).json({ message: "注册成功" });
};

// 用户登录
exports.login = async (req, res) => {
  const dbBack = await User.findOne(req.body);
  if (!dbBack) {
    res.status(402).json({ error: "邮箱或者密码不正确" });
  }
  if (dbBack != null) {
    const user = dbBack.toJSON();
    user.token = await createToken(dbBack);
    res.status(200).json({ user });
  }
};

// 用户信息修改
exports.update = async (req, res) => {
  const id = req.user.userinfo._id;
  const dbBack = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.status(202).json({ user: dbBack });
};

// 用户头像上传
exports.avatar = async (req, res) => {
  const fileArr = req.file.originalname.split(".");
  const fileType = fileArr[fileArr.length - 1];
  try {
    await rename(
      "./public/" + req.file.filename,
      "./public/" + req.file.filename + "." + fileType
    );
    res.status(201).json({ avatar: req.file.filename + "." + fileType });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// 关注频道
exports.subscribe = async (req, res) => {
  const userId = req.user.userinfo._id;
  const channelId = req.params.userId;
  if (userId === channelId) {
    return res.status(401).json({ error: "不能关注自己" });
  }
  const record = await Subscribe.findOne({
    user: userId,
    channel: channelId,
  });
  if (!record) {
    await new Subscribe({
      user: userId,
      channel: channelId,
    }).save();
    const user = await User.findById(channelId);
    user.subscribeCount++;
    await user.save();
    res.status(200).json({ message: "关注成功" });
  } else {
    res.status(401).json({ error: "已经关注此频道" });
  }
};

// 取消关注频道
exports.unsubscribe = async (req, res) => {
  const userId = req.user.userinfo._id;
  const channelId = req.params.userId;
  if (userId === channelId) {
    return res.status(401).json({ error: "不能取消关注自己" });
  }
  const record = await Subscribe.findOne({
    user: userId,
    channel: channelId,
  });
  if (record) {
    await record.deleteOne();
    const user = await User.findById(channelId);
    user.subscribeCount--;
    await user.save();
    res.status(200).json({ message: "取消关注成功" });
  } else {
    res.status(401).json({ error: "没有关注此频道" });
  }
};

// 获取粉丝列表
exports.getchannel = async (req, res) => {
  let channelList = await Subscribe.find({
    channel: req.user.userinfo._id,
  }).populate("user");
  channelList = channelList.map((item) => {
    return loadsh.pick(item.user, [
      "_id",
      "username",
      "avatar",
      "subscribeCount",
      "cover",
      "channelDes",
    ]);
  });
  res.status(200).json({ channelList });
};

// 获取关注列表
exports.getsubscribe = async (req, res) => {
  let subscribeList = await Subscribe.find({
    user: req.params.userId,
  }).populate("channel");
  subscribeList = subscribeList.map((item) => {
    return loadsh.pick(item.channel, [
      "_id",
      "username",
      "avatar",
      "subscribeCount",
      "cover",
      "channelDes",
    ]);
  });
  res.status(200).json({ subscribeList });
};

// 获取用户信息
exports.getuser = async (req, res) => {
  let isSubscribe = false;
  if (req.user) {
    const record = await Subscribe.findOne({
      channel: req.params.userId,
      user: req.user.userinfo._id,
    });
    if (record) {
      isSubscribe = true;
    }
  }
  const user = await User.findById(req.params.userId);
  res.status(200).json({
    ...loadsh.pick(user, [
      "_id",
      "username",
      "avatar",
      "subscribeCount",
      "cover",
      "channelDes",
    ]),
    isSubscribe,
  });
};
