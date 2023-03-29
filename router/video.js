const express = require("express");
const router = express.Router();
const videoController = require("../controller/videoController");
const vodController = require("../controller/vodController");
const { verifyToken } = require("../util/jwt");
const { videoValidator } = require("../middleware/validator/videoValidator");

router
  .get("/lists", videoController.list)
  .get("/getvod", verifyToken, vodController.getvod)
  .post(
    "/createvideo",
    verifyToken,
    videoValidator,
    videoController.createvideo
  );

module.exports = router;
