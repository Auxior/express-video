const {
  Video,
  Videocomment,
  Videolike,
  Subscribe,
  Collect,
} = require("../model/index");
const { hotInc, topHots } = require("../model/redis/redishotsinc");

// 视频热度 观看 +1 点赞 +2 评论 +2 收藏 +3

// 视频入库
exports.createvideo = async (req, res) => {
  const body = req.body;
  body.user = req.user.userinfo._id;
  const videoModel = new Video(body);
  try {
    const dbBack = await videoModel.save();
    res.status(201).json({ dbBack });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// 视频详情
exports.video = async (req, res) => {
  const { videoId } = req.params;
  let videoInfo = await Video.findById(videoId).populate(
    "user",
    "_id username cover"
  );
  videoInfo = videoInfo.toJSON();
  videoInfo.islike = false;
  videoInfo.isDislike = false;
  videoInfo.isSubscribe = false;
  const userId = req.user.userinfo._id;
  if (await Videolike.findOne({ user: userId, video: videoId, like: 1 })) {
    videoInfo.islike = true;
  }
  if (await Videolike.findOne({ user: userId, video: videoId, like: -1 })) {
    videoInfo.isDislike = true;
  }
  if (await Subscribe.findOne({ user: userId, channel: videoInfo.user._id })) {
    videoInfo.isSubscribe = true;
  }
  await hotInc(videoId, 1);
  res.status(200).json({ videoInfo });
};

// 视频列表
exports.videolist = async (req, res) => {
  let { pageNum = 1, pageSize = 10 } = req.body;
  const videolist = await Video.find()
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .sort({ createAt: -1 })
    .populate("user", "_id username cover");
  const getvideoCount = await Video.countDocuments();
  res.status(200).json({ videolist, getvideoCount });
};

// 视频评论
exports.comment = async (req, res) => {
  const { videoId } = req.params;
  const videoInfo = await Video.findById(videoId);
  if (!videoInfo) {
    return res.status(404).json({ error: "视频不存在" });
  }
  const comment = await new Videocomment({
    content: req.body.content,
    video: videoId,
    user: req.user.userinfo._id,
  }).save();
  await hotInc(videoId, 2);
  videoInfo.commentCount++;
  await videoInfo.save();
  res.status(201).json(comment);
};

// 视频评论列表
exports.commentlist = async (req, res) => {
  const videoId = req.params.videoId;
  const { pageNum = 1, pageSize = 10 } = req.body;
  const comments = await Videocomment.find({ video: videoId })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .populate("user", "_id username avatar");
  const commentCount = await Videocomment.countDocuments({ video: videoId });
  res.status(200).json({ comments, commentCount });
};

// 删除评论
exports.deletecomment = async (req, res) => {
  const { videoId, commentId } = req.params;
  const videoInfo = await Video.findById(videoId);
  if (!videoInfo) {
    return res.status(404).json({ error: "视频不存在" });
  }
  const comment = await Videocomment.findById(commentId);
  if (!comment) {
    return res.status(404).json({ error: "评论不存在" });
  }
  if (!comment.user.equals(req.user.userinfo._id)) {
    return res.status(403).json({ error: "评论不可删除" });
  }
  await comment.deleteOne();
  videoInfo.commentCount--;
  await videoInfo.save();
  res.status(200).json({ error: "删除成功" });
};

// 喜欢视频
exports.likevideo = async (req, res) => {
  const videoId = req.params.videoId;
  const userId = req.user.userinfo._id;
  const video = await Video.findById(videoId);
  if (!video) {
    return res.status(404).json({ error: "视频不存在" });
  }
  const doc = await Videolike.findOne({
    user: userId,
    video: videoId,
  });
  let islike = true;
  if (doc && doc.like === 1) {
    await doc.deleteOne();
    islike = false;
  } else if (doc && doc.like === -1) {
    doc.like = 1;
    await doc.save();
    await hotInc(videoId, 2);
  } else {
    await new Videolike({
      user: userId,
      video: videoId,
      like: 1,
    }).save();
    await hotInc(videoId, 2);
  }
  video.likeCount = await Videolike.countDocuments({
    video: videoId,
    like: 1,
  });
  video.dislikeCount = await Videolike.countDocuments({
    video: videoId,
    like: -1,
  });
  await video.save();
  res.status(200).json({
    ...video.toJSON(),
    islike,
  });
};

// 不喜欢视频
exports.dislikevideo = async (req, res) => {
  const videoId = req.params.videoId;
  const userId = req.user.userinfo._id;
  const video = await Video.findById(videoId);
  if (!video) {
    return res.status(404).json({ error: "视频不存在" });
  }
  const doc = await Videolike.findOne({
    user: userId,
    video: videoId,
  });
  let isdislike = true;
  if (doc && doc.like === -1) {
    await doc.deleteOne();
  } else if (doc && doc.like === 1) {
    doc.like = -1;
    await doc.save();
    isdislike = false;
  } else {
    await new Videolike({
      user: userId,
      video: videoId,
      like: -1,
    }).save();
    isdislike = false;
  }
  video.likeCount = await Videolike.countDocuments({
    video: videoId,
    like: 1,
  });
  video.dislikeCount = await Videolike.countDocuments({
    video: videoId,
    like: -1,
  });
  await video.save();
  res.status(200).json({
    ...video.toJSON(),
    isdislike,
  });
};

// 喜欢视频列表
exports.likelist = async (req, res) => {
  const { pageNum = 1, pageSize = 10 } = req.body;
  const likes = await Videolike.find({
    like: 1,
    user: req.user.userinfo._id,
  })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .populate("video", "_id title vodvideoId user");
  const likeCount = await Videolike.countDocuments({
    like: 1,
    user: req.user.userinfo._id,
  });
  res.status(200).json({ likes, likeCount });
};

// 收藏视频
exports.collect = async (req, res) => {
  const videoId = req.params.videoId;
  const userId = req.user.userinfo._id;
  const video = await Video.findById(videoId);
  if (!video) {
    return res.status(404).json({ error: "视频不存在" });
  }
  const doc = await Collect.findOne({
    user: userId,
    video: videoId,
  });
  if (doc) {
    return res.status(403).json({ error: "视频已被收藏" });
  }
  const mycollect = await Collect({
    user: userId,
    video: videoId,
  }).save();
  if (mycollect) {
    await hotInc(videoId, 3);
  }
  res.status(201).json({ mycollect });
};

// 视频热度排行
exports.gethots = async (req, res) => {
  const topnum = req.params.topnum;
  const tops = await topHots(topnum);
  res.status(200).json({ tops });
};
