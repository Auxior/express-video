const express = require("express");
const router = express.Router();
const videoController = require("../controller/videoController");
const vodController = require("../controller/vodController");

router.get("/lists", videoController.list);
router.get("/getvod", vodController.getvod);

module.exports = router;
