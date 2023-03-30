const { Video, Videocomment } = require("../model/index");

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
