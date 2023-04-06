const express = require("express");
const router = express.Router();
const videoController = require("../controller/videoController");
const { verifyToken } = require("../util/jwt");
const { videoValidator } = require("../middleware/validator/videoValidator");

router
  .post(
    "/createvideo",
    verifyToken(),
    videoValidator,
    videoController.createvideo
  )
  .get("/video/:videoId", verifyToken(), videoController.video)
  .get("/videolist", videoController.videolist)
  .post("/comment/:videoId", verifyToken(), videoController.comment)
  .get("/commentlist/:videoId", videoController.commentlist)
  .delete(
    "/comment/:videoId/:commentId",
    verifyToken(),
    videoController.deletecomment
  )
  .get("/like/:videoId", verifyToken(), videoController.likevideo)
  .get("/dislike/:videoId", verifyToken(), videoController.dislikevideo)
  .get("/likelist", verifyToken(), videoController.likelist)
  .get("/collect/:videoId", verifyToken(), videoController.collect)
  .get("/gethots/:topnum", videoController.gethots);

module.exports = router;
