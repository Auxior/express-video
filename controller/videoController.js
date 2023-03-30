const {
  Video,
  Videocomment,
  Videolike,
  Subscribe,
  CollectModel,
} = require("../model/index");

exports.collect = async (req, res) => {
  const videoId = req.params.videoId;
  const userId = req.user.userinfo._id;
  const video = await Video.findById(videoId);
  if (!video) {
    return res.status(404).json({ err: "视频不存在" });
  }
  var doc = await CollectModel.findOne({
    user: userId,
    video: videoId,
  });
  if (doc) {
    return res.status(403).json({ err: "视频已被收藏" });
  }
  const mycollect = await CollectModel({
    user: userId,
    video: videoId,
  }).save();

  res.status(201).json({ mycollect });
};

exports.likelist = async (req, res) => {
  const { pageNum = 1, pageSize = 10 } = req.body;
  var likes = await Videolike.find({
    like: 1,
    user: req.user.userinfo._id,
  })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .populate("video", "_id title vodvideoId user");

  var likeCount = await Videolike.countDocuments({
    like: 1,
    user: req.user.userinfo._id,
  });
  res.status(200).json({ likes, likeCount });
};

exports.dislikevideo = async (req, res) => {
  const videoId = req.params.videoId;
  const userId = req.user.userinfo._id;
  const video = await Video.findById(videoId);
  if (!video) {
    return res.status(404).json({ err: "视频不存在" });
  }
  var doc = await Videolike.findOne({
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

exports.likevideo = async (req, res) => {
  const videoId = req.params.videoId;
  const userId = req.user.userinfo._id;
  const video = await Video.findById(videoId);
  if (!video) {
    return res.status(404).json({ err: "视频不存在" });
  }
  var doc = await Videolike.findOne({
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
  } else {
    await new Videolike({
      user: userId,
      video: videoId,
      like: 1,
    }).save();
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

exports.deletecomment = async (req, res) => {
  const { videoId, commentId } = req.params;
  const videoInfo = await Video.findById(videoId);
  if (!videoInfo) {
    return res.status(404).json({ err: "视频不存在" });
  }
  const comment = await Videocomment.findById(commentId);
  if (!comment) {
    return res.status(404).json({ err: "评论不存在" });
  }
  if (!comment.user.equals(req.user.userinfo._id)) {
    return res.status(403).json({ err: "评论不可删除" });
  }
  await comment.deleteOne();
  videoInfo.commentCount--;
  await videoInfo.save();
  res.status(200).json({ err: "删除成功" });
};

exports.commentlist = async (req, res) => {
  const videoId = req.params.videoId;
  const { pageNum = 1, pageSize = 10 } = req.body;
  const comments = await Videocomment.find({ video: videoId })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .populate("user", "_id username image");
  const commentCount = await Videocomment.countDocuments({ video: videoId });
  res.status(200).json({ comments, commentCount });
};

exports.comment = async (req, res) => {
  const { videoId } = req.params;
  const videoInfo = await Video.findById(videoId);
  if (!videoInfo) {
    return res.status(404).json({ err: "视频不存在" });
  }
  const comment = await new Videocomment({
    content: req.body.content,
    video: videoId,
    user: req.user.userinfo._id,
  }).save();
  videoInfo.commentCount++;
  await videoInfo.save();
  res.status(201).json(comment);
};

exports.videolist = async (req, res) => {
  let { pageNum = 1, pageSize = 10 } = req.body;

  var videolist = await Video.find()
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .sort({ createAt: -1 })
    .populate("user", "_id username cover");
  const getvideoCount = await Video.countDocuments();

  res.status(200).json({ videolist, getvideoCount });
};

exports.video = async (req, res) => {
  const { videoId } = req.params;
  var videoInfo = await Video.findById(videoId).populate(
    "user",
    "_id username cover"
  );
  videoInfo = videoInfo.toJSON();
  videoInfo.islike = false;
  videoInfo.isDislike = false;
  videoInfo.isSubscribe = false;

  if (req.user.userinfo) {
    const userId = req.user.userinfo._id;
    if (await Videolike.findOne({ user: userId, video: videoId, like: 1 })) {
      videoInfo.islike = true;
    }
    if (await Videolike.findOne({ user: userId, video: videoId, like: -1 })) {
      videoInfo.isDislike = true;
    }
    if (
      await Subscribe.findOne({ user: userId, channel: videoInfo.user._id })
    ) {
      videoInfo.isSubscribe = true;
    }
  }
  res.status(200).json(videoInfo);
};

exports.createvideo = async (req, res) => {
  var body = req.body;
  body.user = req.user.userinfo._id;

  const videoModel = new Video(req.body);
  try {
    var dbback = await videoModel.save();
    res.status(201).json({ dbback });
  } catch (error) {
    res.status(500).json({ err: error });
  }
};
