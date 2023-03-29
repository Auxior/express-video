const { Video } = require("../model/index");

exports.list = async (req, res) => {};

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
