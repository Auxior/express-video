const express = require("express");
const router = express.Router();
const videoController = require("../controller/videoController");
const vodController = require("../controller/vodController");
const { verifyToken } = require("../util/jwt");
const { videoValidator } = require("../middleware/validator/videoValidator");

router
  .delete(
    "/comment/:videoId/:commentId",
    verifyToken(),
    videoController.deletecomment
  )
  .get("/commentlist/:videoId", videoController.commentlist)
  .post("/comment/:videoId", verifyToken(), videoController.comment)
  .get("/videolist", videoController.videolist)
  .get("/video/:videoId", verifyToken(false), videoController.video)
  .get("/getvod", verifyToken(), vodController.getvod)
  .post(
    "/createvideo",
    verifyToken(),
    videoValidator,
    videoController.createvideo
  );

module.exports = router;
